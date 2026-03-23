import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from './hooks/useTheme'
import { useWallet } from './hooks/useWallet'
import { useVaultStats } from './hooks/useVaultStats'
import { useUserPosition } from './hooks/useUserPosition'
import { useExchangeRate } from './hooks/useExchangeRate'
import { useTransactionHistory } from './hooks/useTransactionHistory'
import { useToast } from './hooks/useToast'
import { useTransactionStatus } from './hooks/useTransactionStatus'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { useKeyboard } from './hooks/useKeyboard'
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { openContractCall } from '@stacks/connect'
import { uintCV, PostConditionMode } from '@stacks/transactions'
import { CONTRACT_ADDRESS, CONTRACT_NAME, network, getAddressExplorerUrl, getContractExplorerUrl } from './lib/stacks'
import { validateDeposit, validateWithdraw, validateDecimalPrecision, sanitizeNumericInput, combineValidators } from './lib/validation'
import { parseTransactionError } from './lib/errorUtils'
import { formatSTX, formatCompact, formatBlocks, formatAddress } from './lib/formatters'
import { MICROSTX_PER_STX, SATS_PER_BTC, TX_POLL_INTERVAL_MS } from './lib/constants'
import { logger } from './lib/logger'
import { ARIA_DESCRIPTIONS, LANDMARK_LABELS } from './lib/a11y'
import { SkipLink } from './components/SkipLink'
import { ToastContainer } from './components/ToastContainer'
import { TransactionHistory } from './components/TransactionHistory'
import { ErrorBoundary } from './components/ErrorBoundary'
import { KeyboardShortcutHelp } from './components/KeyboardShortcutHelp'
import { preconnectHiroApi } from './lib/resourceHints'
import { reportWebVitals } from './lib/webVitals'
import './App.css'

// Preconnect to Hiro API on module load for faster first request
preconnectHiroApi();

// Report web vitals in development
if (import.meta.env.DEV) {
  reportWebVitals((metric) => {
    logger.debug('Web Vital', { name: metric.name, value: Math.round(metric.value), rating: metric.rating });
  });
}

function App() {
  const { isConnected, connect, disconnect, getAddress } = useWallet()
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const { stats: vaultStats, loading: statsLoading, refresh: refreshStats } = useVaultStats(getAddress())
  const { position, cooldown, loading: positionLoading, refresh: refreshPosition } = useUserPosition(getAddress())
  const exchangeRate = useExchangeRate()
  const { transactions, addTransaction, updateStatus, clearHistory } = useTransactionHistory()
  const { toasts, removeToast, success: toastSuccess, error: toastError, info: toastInfo } = useToast()
  const { checkStatus } = useTransactionStatus()
  const isOnline = useOnlineStatus()
  const { isDark: darkMode, toggle: toggleTheme } = useTheme()
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [depositTouched, setDepositTouched] = useState(false)
  const [withdrawTouched, setWithdrawTouched] = useState(false)

  // Memoize formatted values to avoid recalculating on every render
  const formattedDeposits = useMemo(() => formatSTX(vaultStats.totalDeposits), [vaultStats.totalDeposits])
  const formattedRewards = useMemo(() => formatSTX(vaultStats.totalRewards), [vaultStats.totalRewards])
  const formattedBalance = useMemo(() => formatSTX(vaultStats.stxBalance), [vaultStats.stxBalance])
  const formattedUserTokens = useMemo(() => formatCompact(vaultStats.userBalance / MICROSTX_PER_STX), [vaultStats.userBalance])
  const userFlowBalance = useMemo(() => userFlowBalance, [position])

  const pollPendingTransactions = useCallback(async () => {
    const pending = transactions.filter(tx => tx.status === 'pending');
    for (const tx of pending) {
      const status = await checkStatus(tx.txId);
      if (status !== 'pending') {
        updateStatus(tx.txId, status);
        if (status === 'confirmed') {
          toastInfo(`Transaction confirmed: ${tx.type}`);
        } else if (status === 'failed') {
          toastError(`Transaction failed: ${tx.type}`);
        }
      }
    }
  }, [transactions, checkStatus, updateStatus, toastInfo, toastError]);

  useEffect(() => {
    const hasPending = transactions.some(tx => tx.status === 'pending');
    if (!hasPending) return;
    const interval = setInterval(pollPendingTransactions, TX_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [transactions, pollPendingTransactions]);

  const handleDeposit = async () => {
    if (!isConnected || !depositAmount) return
    logger.info('Initiating deposit', { amount: depositAmount })

    const precisionCheck = validateDecimalPrecision(depositAmount)
    if (!precisionCheck.isValid) {
      setError(precisionCheck.error)
      return
    }

    const validation = validateDeposit(depositAmount)
    if (!validation.isValid) {
      logger.warn('Deposit validation failed', { amount: depositAmount, error: validation.error })
      setError(validation.error)
      return
    }

    setIsDepositing(true)
    setError(null)

    try {
    await openContractCall({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'deposit',
      functionArgs: [uintCV(Math.round(parseFloat(depositAmount) * SATS_PER_BTC))],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        const txId = data.txId;
        addTransaction({ txId, type: 'deposit', amount: Math.round(parseFloat(depositAmount) * SATS_PER_BTC) })
        toastSuccess(`Deposit of ${depositAmount} sBTC submitted`, txId)
        setDepositAmount('')
        setDepositTouched(false)
        setError(null)
        setIsDepositing(false)
        refreshStats()
        refreshPosition()
      },
      onCancel: () => {
        setIsDepositing(false)
      },
    });
    } catch (err) {
      toastError(parseTransactionError(err))
      setError(parseTransactionError(err));
      setIsDepositing(false)
    }
  }

  const handleWithdraw = async () => {
    if (!isConnected || !withdrawAmount) return
    logger.info('Initiating withdrawal', { amount: withdrawAmount })

    const withdrawPrecision = validateDecimalPrecision(withdrawAmount)
    if (!withdrawPrecision.isValid) {
      setError(withdrawPrecision.error)
      return
    }

    if (!cooldown.isExpired) {
      setError(`Withdrawal cooldown active — ${formatBlocks(cooldown.blocksRemaining)} remaining`)
      return
    }

    const userBalance = userFlowBalance
    const validation = validateWithdraw(withdrawAmount, userBalance)
    if (!validation.isValid) {
      setError(validation.error)
      return
    }

    setIsWithdrawing(true)
    setError(null)

    try {
    await openContractCall({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'withdraw',
      functionArgs: [uintCV(Math.round(parseFloat(withdrawAmount) * SATS_PER_BTC))],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        const txId = data.txId;
        addTransaction({ txId, type: 'withdraw', amount: Math.round(parseFloat(withdrawAmount) * SATS_PER_BTC) })
        toastSuccess(`Withdrawal of ${withdrawAmount} FLOW submitted`, txId)
        setWithdrawAmount('')
        setWithdrawTouched(false)
        setError(null)
        setIsWithdrawing(false)
        refreshStats()
        refreshPosition()
      },
      onCancel: () => {
        setIsWithdrawing(false)
      },
    });
    } catch (err) {
      toastError(parseTransactionError(err))
      setError(parseTransactionError(err));
      setIsWithdrawing(false)
    }
  }

  const pendingCount = transactions.filter(tx => tx.status === 'pending').length;
  useDocumentTitle(pendingCount > 0 ? `(${pendingCount}) BitcoinFlow` : 'BitcoinFlow');
  useKeyboard('Escape', () => setError(null), !!error);
  useKeyboardShortcut({ key: '?' }, () => setShowShortcuts(prev => !prev));

  return (
    <div className="app">
      <KeyboardShortcutHelp open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <SkipLink targetId="main-content" />
      <header className="app-header" role="banner" aria-label={LANDMARK_LABELS.header}>
        <div className="header-top">
          <h1>BitcoinFlow</h1>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={darkMode}
          >
            <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
          </button>
        </div>
        <p>Smart sBTC Stacking Vault</p>
        <div className="header-badges">
          <span className={`network-badge ${import.meta.env.VITE_NETWORK === 'mainnet' ? 'network-badge-mainnet' : 'network-badge-testnet'}`}>
            {import.meta.env.VITE_NETWORK === 'mainnet' ? 'Mainnet' : 'Testnet'}
          </span>
          {pendingCount > 0 && (
            <span className="pending-badge" aria-label={`${pendingCount} pending transaction${pendingCount > 1 ? 's' : ''}`}>
              {pendingCount} pending
            </span>
          )}
        </div>

        {!isConnected ? (
          <button className="connect-btn" onClick={connect} aria-label={ARIA_DESCRIPTIONS.walletConnection}>
            Connect Stacks Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>Connected: {getAddress() && (
              <a href={getAddressExplorerUrl(getAddress()!)} target="_blank" rel="noopener noreferrer" className="wallet-address-link">
                {formatAddress(getAddress()!)}
              </a>
            )}</p>
            <button className="disconnect-btn" onClick={disconnect} aria-label="Disconnect Stacks wallet">
              Disconnect
            </button>
          </div>
        )}
      </header>

      {error && (
        <div className="error-banner" role="alert" aria-live="assertive">
          <p>{error}</p>
          <button className="dismiss-btn" onClick={() => setError(null)} aria-label="Dismiss error message">Dismiss</button>
        </div>
      )}

      {!isOnline && (
        <div className="offline-banner" role="alert">
          <strong>You are offline</strong> — Some features may not work until your connection is restored.
        </div>
      )}

      {vaultStats.isPaused && (
        <div className="paused-banner" role="status">
          <strong>Vault Paused</strong> — Deposits and withdrawals are temporarily disabled.
        </div>
      )}

      {isConnected && (<ErrorBoundary>
        <main id="main-content" className="main-content" tabIndex={-1}>
          <div className="vault-stats">
            <div className="stats-header">
              <h2>Vault Statistics</h2>
              {statsLoading && <span className="loading-dot" role="status" aria-label="Loading vault statistics"><span aria-hidden="true">●</span></span>}
              <button className="refresh-btn" onClick={refreshStats} disabled={statsLoading} aria-label="Refresh vault statistics">
                <span aria-hidden="true">↻</span>
              </button>
              <a href={getContractExplorerUrl()} target="_blank" rel="noopener noreferrer" className="stats-contract-link">
                View Contract
              </a>
            </div>
            <div className="stats-grid" role="region" aria-label="Vault statistics" aria-roledescription={ARIA_DESCRIPTIONS.vaultStats} aria-live="polite">
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`Total Deposits: ${formattedDeposits} STX`}>
                <h3>Total Deposits</h3>
                <p>{formattedDeposits} STX</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`Total Rewards: ${formattedRewards} STX`}>
                <h3>Total Rewards</h3>
                <p>{formattedRewards} STX</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`STX Balance: ${formattedBalance} STX`}>
                <h3>STX Balance</h3>
                <p>{formattedBalance} STX</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`Your Flow Tokens: ${formattedUserTokens} FLOW`}>
                <h3>Your Flow Tokens</h3>
                <p>{formattedUserTokens} FLOW</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`Exchange Rate: ${exchangeRate.formattedRate} sBTC per FLOW`}>
                <h3>Exchange Rate</h3>
                <p>{exchangeRate.formattedRate} sBTC/FLOW</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`Deposit Count: ${vaultStats.depositCount}`}>
                <h3>Deposits</h3>
                <p>{vaultStats.depositCount}</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`} aria-label={`Withdrawal Count: ${vaultStats.withdrawCount}`}>
                <h3>Withdrawals</h3>
                <p>{vaultStats.withdrawCount}</p>
              </div>
            </div>
          </div>

          {position && (
            <div className="user-position" role="region" aria-label="Your position" aria-description={ARIA_DESCRIPTIONS.userPosition}>
              <div className="stats-header">
                <h2>Your Position</h2>
                {positionLoading && <span className="loading-dot" role="status" aria-label="Loading your position"><span aria-hidden="true">●</span></span>}
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Deposited</h3>
                  <p>{formatSTX(position.depositedAmount)} sBTC</p>
                </div>
                <div className="stat-card">
                  <h3>FLOW Balance</h3>
                  <p>{formatCompact(position.flowTokenBalance / MICROSTX_PER_STX)} FLOW</p>
                </div>
                <div className="stat-card">
                  <h3>Vault Share</h3>
                  <p>{(position.sharePct / 100).toFixed(2)}%</p>
                </div>
                <div className="stat-card">
                  <h3>Cooldown</h3>
                  <p>{cooldown.isExpired ? 'Ready' : `${formatBlocks(cooldown.blocksRemaining)} remaining`}</p>
                </div>
              </div>
            </div>
          )}

          <div className="actions" role="region" aria-label="Vault actions">
            <div className="action-card" role="form" aria-label="Deposit sBTC" aria-description={ARIA_DESCRIPTIONS.depositForm}>
              <h3>Deposit sBTC</h3>
              <label htmlFor="deposit-amount" className="sr-only">Deposit amount in sBTC</label>
              <input
                id="deposit-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.0000"
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(sanitizeNumericInput(e.target.value))
                  if (error) setError(null)
                }}
                onBlur={() => setDepositTouched(true)}
                autoComplete="off"
                className={depositTouched && depositAmount ? (validateDeposit(depositAmount).isValid ? 'input-valid' : 'input-error') : ''}
                aria-invalid={depositTouched && depositAmount ? !validateDeposit(depositAmount).isValid : undefined}
                aria-describedby={`deposit-help${depositTouched && depositAmount && !validateDeposit(depositAmount).isValid ? ' deposit-error' : ''}`}
              />
              <div className="input-row">
                <small id="deposit-help">Minimum: 0.0001 sBTC</small>
              </div>
              {depositTouched && depositAmount && !validateDeposit(depositAmount).isValid && (
                <p id="deposit-error" className="form-error-message" role="alert">{validateDeposit(depositAmount).error}</p>
              )}
              <button
                onClick={handleDeposit}
                disabled={!depositAmount || isDepositing || vaultStats.isPaused || !isOnline}
                aria-busy={isDepositing}
                aria-describedby="deposit-help"
              >
                {isDepositing ? 'Processing deposit...' : !isOnline ? 'Offline — connect to deposit' : vaultStats.isPaused ? 'Vault Paused' : 'Deposit & Get Flow Tokens'}
              </button>
            </div>

            <div className="action-card" role="form" aria-label="Withdraw sBTC" aria-description={ARIA_DESCRIPTIONS.withdrawForm}>
              <h3>Withdraw sBTC</h3>
              <label htmlFor="withdraw-amount" className="sr-only">Withdrawal amount in FLOW tokens</label>
              <input
                id="withdraw-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.0000"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(sanitizeNumericInput(e.target.value))
                  if (error) setError(null)
                }}
                onBlur={() => setWithdrawTouched(true)}
                autoComplete="off"
                className={withdrawTouched && withdrawAmount ? (validateWithdraw(withdrawAmount, userFlowBalance).isValid ? 'input-valid' : 'input-error') : ''}
                aria-invalid={withdrawTouched && withdrawAmount ? !validateWithdraw(withdrawAmount, userFlowBalance).isValid : undefined}
                aria-describedby="withdraw-help"
              />
              <div className="input-row">
                <small id="withdraw-help">Burns FLOW tokens and returns sBTC</small>
                {position && (
                  <button
                    type="button"
                    className="max-btn"
                    onClick={() => {
                      const maxAmount = (position.flowTokenBalance / MICROSTX_PER_STX).toString();
                      setWithdrawAmount(maxAmount);
                      setWithdrawTouched(true);
                    }}
                    aria-label={`Set maximum withdrawal: ${formatCompact(position.flowTokenBalance / MICROSTX_PER_STX)} FLOW`}
                  >
                    Max
                  </button>
                )}
              </div>
              {withdrawTouched && withdrawAmount && !validateWithdraw(withdrawAmount, userFlowBalance).isValid && (
                <p id="withdraw-error" className="form-error-message" role="alert">{validateWithdraw(withdrawAmount, userFlowBalance).error}</p>
              )}
              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || isWithdrawing || vaultStats.isPaused || !isOnline}
                aria-busy={isWithdrawing}
                aria-describedby="withdraw-help"
              >
                {isWithdrawing ? 'Processing withdrawal...' : !isOnline ? 'Offline — connect to withdraw' : vaultStats.isPaused ? 'Vault Paused' : 'Burn Flow & Withdraw'}
              </button>
            </div>
          </div>

          <TransactionHistory transactions={transactions} onClear={clearHistory} />

          <section className="info-section" role="region" aria-labelledby="how-it-works">
            <h3 id="how-it-works">How BitcoinFlow Works</h3>
            <ol aria-label="Steps to use BitcoinFlow">
              <li>Deposit sBTC to get liquid Flow tokens (1:1 ratio)</li>
              <li>Your sBTC is auto-stacked to earn STX rewards</li>
              <li>Rewards are automatically compounded</li>
              <li>Withdraw anytime by burning Flow tokens</li>
            </ol>
          </section>
        </main>
      </ErrorBoundary>)}

      <footer className="app-footer" role="contentinfo" aria-label={LANDMARK_LABELS.footer}>
        <p>BitcoinFlow — Built on Stacks</p>
        <nav className="footer-links" aria-label="External links">
          <a href="https://www.stacks.co" target="_blank" rel="noopener noreferrer" aria-label="Stacks blockchain (opens in new tab)">Stacks</a>
          <span aria-hidden="true"> | </span>
          <a href="https://explorer.hiro.so" target="_blank" rel="noopener noreferrer" aria-label="Hiro block explorer (opens in new tab)">Explorer</a>
          <span aria-hidden="true"> | </span>
          <a href={getAddressExplorerUrl(`${CONTRACT_ADDRESS}.${CONTRACT_NAME}`)} target="_blank" rel="noopener noreferrer" aria-label="View flow vault contract (opens in new tab)">Contract</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
