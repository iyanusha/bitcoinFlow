import { useState } from 'react'
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [vaultStats] = useState({
    totalDeposits: 0,
    totalRewards: 0,
    userBalance: 0
  })

  const connectWallet = () => {
    // Simplified wallet connection for demo
    setIsConnected(true)
    setWalletAddress('ST1EXAMPLE...TESTNET')
  }

  const handleDeposit = async () => {
    if (!isConnected || !depositAmount) return
    
    // Simplified deposit logic - in real implementation would call contract
    alert(`Depositing ${depositAmount} sBTC to vault...`)
    console.log('Deposit function called with amount:', depositAmount)
    setDepositAmount('')
  }

  const handleWithdraw = async () => {
    if (!isConnected || !withdrawAmount) return
    
    // Simplified withdraw logic - in real implementation would call contract
    alert(`Withdrawing ${withdrawAmount} Flow tokens from vault...`)
    console.log('Withdraw function called with amount:', withdrawAmount)
    setWithdrawAmount('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌊 BitcoinFlow</h1>
        <p>Smart sBTC Stacking Vault</p>
        
        {!isConnected ? (
          <button className="connect-btn" onClick={connectWallet}>
            Connect Stacks Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>Connected: {walletAddress}</p>
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
