import { useState } from 'react'
import { useWallet } from './hooks/useWallet'
import { openContractCall } from '@stacks/connect'
import { uintCV, PostConditionMode } from '@stacks/transactions'
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from './lib/stacks'
import './App.css'

function App() {
  const { isConnected, connect, disconnect, getAddress } = useWallet()
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [vaultStats] = useState({
    totalDeposits: 0,
    totalRewards: 0,
    userBalance: 0
  })

  const handleDeposit = async () => {
    if (!isConnected || !depositAmount) return

    await openContractCall({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'deposit',
      functionArgs: [uintCV(parseInt(depositAmount) * 100000000)],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        console.log('Deposit tx:', data.txId)
        setDepositAmount('')
      },
    })
  }

  const handleWithdraw = async () => {
    if (!isConnected || !withdrawAmount) return

    await openContractCall({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'withdraw',
      functionArgs: [uintCV(parseInt(withdrawAmount) * 100000000)],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        console.log('Withdraw tx:', data.txId)
        setWithdrawAmount('')
      },
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>BitcoinFlow</h1>
        <p>Smart sBTC Stacking Vault</p>

        {!isConnected ? (
          <button className="connect-btn" onClick={connect}>
            Connect Stacks Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>Connected: {getAddress()?.slice(0, 8)}...{getAddress()?.slice(-4)}</p>
            <button className="disconnect-btn" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        )}
      </header>

      {isConnected && (
        <main className="main-content">
          <div className="vault-stats">
            <h2>Vault Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Deposits</h3>
                <p>{vaultStats.totalDeposits} sBTC</p>
              </div>
              <div className="stat-card">
                <h3>Total Rewards</h3>
                <p>{vaultStats.totalRewards} STX</p>
              </div>
              <div className="stat-card">
                <h3>Your Flow Tokens</h3>
                <p>{vaultStats.userBalance} FLOW</p>
              </div>
            </div>
          </div>

          <div className="actions">
            <div className="action-card">
              <h3>Deposit sBTC</h3>
              <input
                type="number"
                placeholder="Amount to deposit"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <button onClick={handleDeposit} disabled={!depositAmount}>
                Deposit & Get Flow Tokens
              </button>
            </div>

            <div className="action-card">
              <h3>Withdraw sBTC</h3>
              <input
                type="number"
                placeholder="Flow tokens to burn"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <button onClick={handleWithdraw} disabled={!withdrawAmount}>
                Burn Flow & Withdraw
              </button>
            </div>
          </div>

          <div className="info-section">
            <h3>How BitcoinFlow Works</h3>
            <ul>
              <li>Deposit sBTC to get liquid Flow tokens (1:1 ratio)</li>
              <li>Your sBTC is auto-stacked to earn STX rewards</li>
              <li>Rewards are automatically compounded</li>
              <li>Withdraw anytime by burning Flow tokens</li>
            </ul>
          </div>
        </main>
      )}
    </div>
  )
}

export default App
