import { useState, useEffect, useCallback } from 'react'
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
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { openContractCall } from '@stacks/connect'
import { uintCV, PostConditionMode } from '@stacks/transactions'
import { CONTRACT_ADDRESS, CONTRACT_NAME, network, getAddressExplorerUrl, getContractExplorerUrl } from './lib/stacks'
import { validateDeposit, validateWithdraw, validateDecimalPrecision, sanitizeNumericInput } from './lib/validation'
import { parseTransactionError } from './lib/errorUtils'
import { formatSTX, formatCompact, formatBlocks, formatAddress } from './lib/formatters'
import { MICROSTX_PER_STX, SATS_PER_BTC, TX_POLL_INTERVAL_MS } from './lib/constants'
import { logger } from './lib/logger'
import { ARIA_DESCRIPTIONS, LANDMARK_LABELS } from './lib/a11y'
import { SkipLink } from './components/SkipLink'
import { ToastContainer } from './components/ToastContainer'
import { TransactionHistory } from './components/TransactionHistory'
import { ErrorBoundary } from './components/ErrorBoundary'
import './App.css'

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

    const userBalance = position ? position.flowTokenBalance / MICROSTX_PER_STX : 0
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

  return (
    <div className="app">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <SkipLink targetId="main-content" />
      <header className="app-header" role="banner" aria-label={LANDMARK_LABELS.header}>
        <div className="header-top">
          <h1>BitcoinFlow</h1>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀' : '☾'}
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
          <button className="connect-btn" onClick={connect}>
            Connect Stacks Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>Connected: {getAddress() && (
              <a href={getAddressExplorerUrl(getAddress()!)} target="_blank" rel="noopener noreferrer" className="wallet-address-link">
                {formatAddress(getAddress()!)}
              </a>
            )}</p>
            <button className="disconnect-btn" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        )}
      </header>

      {error && (
        <div className="error-banner" role="alert">
          <p>{error}</p>
          <button className="dismiss-btn" onClick={() => setError(null)}>Dismiss</button>
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
        <main id="main-content" className="main-content">
          <div className="vault-stats">
            <div className="stats-header">
              <h2>Vault Statistics</h2>
              {statsLoading && <span className="loading-dot" aria-label="Loading stats">●</span>}
              <button className="refresh-btn" onClick={refreshStats} disabled={statsLoading} aria-label="Refresh stats">
                ↻
              </button>
              <a href={getContractExplorerUrl()} target="_blank" rel="noopener noreferrer" className="stats-contract-link">
                View Contract
              </a>
            </div>
            <div className="stats-grid" role="region" aria-label="Vault statistics" aria-roledescription={ARIA_DESCRIPTIONS.vaultStats} aria-live="polite">
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>Total Deposits</h3>
                <p>{formatSTX(vaultStats.totalDeposits)} STX</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>Total Rewards</h3>
                <p>{formatSTX(vaultStats.totalRewards)} STX</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>STX Balance</h3>
                <p>{formatSTX(vaultStats.stxBalance)} STX</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>Your Flow Tokens</h3>
                <p>{formatCompact(vaultStats.userBalance / MICROSTX_PER_STX)} FLOW</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>Exchange Rate</h3>
                <p>{exchangeRate.formattedRate} sBTC/FLOW</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>Deposits</h3>
                <p>{vaultStats.depositCount}</p>
              </div>
              <div className={`stat-card${statsLoading ? ' loading' : ''}`}>
                <h3>Withdrawals</h3>
                <p>{vaultStats.withdrawCount}</p>
              </div>
            </div>
          </div>

          {position && (
            <div className="user-position">
              <div className="stats-header">
                <h2>Your Position</h2>
                {positionLoading && <span className="loading-dot" aria-label="Loading position">●</span>}
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
                autoComplete="off"
                aria-describedby="deposit-help"
              />
              <small id="deposit-help">Minimum: 0.0001 sBTC</small>
              <button
                onClick={handleDeposit}
                disabled={!depositAmount || isDepositing || vaultStats.isPaused || !isOnline}
                aria-busy={isDepositing}
              >
                {isDepositing ? 'Processing deposit...' : !isOnline ? 'Offline — connect to deposit' : vaultStats.isPaused ? 'Vault Paused' : 'Deposit & Get Flow Tokens'}
              </button>
            </div>

            <div className="action-card" role="form" aria-label="Withdraw sBTC">
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
                autoComplete="off"
                aria-describedby="withdraw-help"
              />
              <small id="withdraw-help">Burns FLOW tokens and returns sBTC</small>
              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || isWithdrawing || vaultStats.isPaused || !isOnline}
                aria-busy={isWithdrawing}
              >
                {isWithdrawing ? 'Processing withdrawal...' : !isOnline ? 'Offline — connect to withdraw' : vaultStats.isPaused ? 'Vault Paused' : 'Burn Flow & Withdraw'}
              </button>
            </div>
          </div>

          <TransactionHistory transactions={transactions} onClear={clearHistory} />

          <section className="info-section" aria-labelledby="how-it-works">
            <h3 id="how-it-works">How BitcoinFlow Works</h3>
            <ul>
              <li>Deposit sBTC to get liquid Flow tokens (1:1 ratio)</li>
              <li>Your sBTC is auto-stacked to earn STX rewards</li>
              <li>Rewards are automatically compounded</li>
              <li>Withdraw anytime by burning Flow tokens</li>
            </ul>
          </section>
        </main>
      </ErrorBoundary>)}

      <footer className="app-footer" role="contentinfo" aria-label={LANDMARK_LABELS.footer}>
        <p>BitcoinFlow — Built on Stacks</p>
        <nav className="footer-links" aria-label="External links">
          <a href="https://www.stacks.co" target="_blank" rel="noopener noreferrer">Stacks</a>
          {' | '}
          <a href="https://explorer.hiro.so" target="_blank" rel="noopener noreferrer">Explorer</a>
          {' | '}
          <a href={getAddressExplorerUrl(`${CONTRACT_ADDRESS}.${CONTRACT_NAME}`)} target="_blank" rel="noopener noreferrer">Contract</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
