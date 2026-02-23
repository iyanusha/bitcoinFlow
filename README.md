# BitcoinFlow

A liquid staking vault for sBTC on the Stacks blockchain. Deposit sBTC, receive Flow tokens, and earn auto-compounded STX rewards — all secured by Bitcoin.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Smart Contract](#smart-contract)
  - [Functions](#functions)
  - [Error Codes](#error-codes)
- [Frontend](#frontend)
  - [Core Components](#core-components)
  - [Hooks](#hooks)
  - [Utilities](#utilities)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Smart Contract Development](#smart-contract-development)
  - [Frontend Development](#frontend-development)
  - [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

BitcoinFlow enables users to deposit sBTC into a liquid staking vault and receive Flow tokens at a 1:1 ratio. The vault auto-stacks deposited sBTC to earn STX rewards, which are periodically compounded. Users can withdraw their sBTC at any time by burning their Flow tokens.

### Key Features

- **Liquid Staking** — Deposit sBTC and receive transferable Flow tokens representing your position.
- **Auto-Compounding** — STX stacking rewards are automatically compounded into the vault.
- **Instant Withdrawals** — Burn Flow tokens to withdraw sBTC at any time.
- **Delegation Stacking** — Vault aggregates deposits and delegates to a stacking pool for optimal yields.
- **Emergency Controls** — Admin can pause the vault and trigger emergency withdrawals if needed.
- **Vault Analytics** — Real-time dashboard showing deposits, rewards, and vault health.

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                  React Frontend                   │
│       (Vite + React 19 + TypeScript)             │
│                                                   │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────┐ │
│  │ AmountInput  │  │ Wallet   │  │  Dashboard  │ │
│  │ ValidatedIn  │  │ Connect  │  │  Analytics  │ │
│  │ ErrorBound   │  │ useWallet│  │  Portfolio  │ │
│  └──────┬──────┘  └────┬─────┘  └──────┬──────┘ │
│         │              │               │          │
│         └──────────────┼───────────────┘          │
│                        │                          │
│              @stacks/connect v8                   │
│              @stacks/transactions                 │
└────────────────────────┼──────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │  Stacks Blockchain  │
              │                     │
              │  ┌───────────────┐  │
              │  │  flow-vault   │  │
              │  │  (Clarity 3)  │  │
              │  │               │  │
              │  │ • deposit     │  │
              │  │ • withdraw    │  │
              │  │ • compound    │  │
              │  │ • delegate    │  │
              │  └───────────────┘  │
              │                     │
              │   Secured by BTC    │
              └─────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Smart Contract** | Clarity | 3.0 (Epoch 3.0) |
| **Contract Testing** | Clarinet SDK + Vitest | 3.0.2 / 3.1.3 |
| **Frontend Framework** | React | 19 |
| **Build Tool** | Vite | 7.1.2 |
| **Language** | TypeScript | 5.8.3 |
| **Wallet Integration** | @stacks/connect | 8.1.9 |
| **Network** | @stacks/network | 7.2.0 |
| **Transactions** | @stacks/transactions | 7.2.0 |
| **Linting** | ESLint | 9.33.0 |

---

## Smart Contract

The `flow-vault.clar` contract is the core of BitcoinFlow. It manages deposits, withdrawals, stacking delegation, and reward compounding.

### Fungible Token

- **`flow-token`** — Issued 1:1 when sBTC is deposited. Burned on withdrawal.

### Functions

#### Public (Write) Functions

| Function | Parameters | Description |
|----------|-----------|-------------|
| `deposit` | `amount: uint` | Deposit sBTC into the vault. Mints equivalent Flow tokens. |
| `withdraw` | `amount: uint` | Burn Flow tokens and withdraw sBTC. |
| `delegate-stacking` | `pool-address: principal` | Set the stacking delegation pool (owner only). |
| `stack-aggregated-stx` | `amount: uint` | Stack aggregated STX from the vault (owner only). |
| `compound-rewards` | — | Compound accumulated STX rewards (owner only). |
| `pause-vault` | — | Pause all vault operations (owner only). |
| `unpause-vault` | — | Resume vault operations (owner only). |
| `emergency-withdraw` | `user: principal` | Force-withdraw a user's position (owner only). |

#### Read-Only Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `get-user-deposit` | `uint` | User's deposited sBTC amount. |
| `get-user-flow-balance` | `uint` | User's Flow token balance. |
| `get-total-deposits` | `uint` | Total sBTC held in the vault. |
| `get-total-rewards` | `uint` | Total accumulated STX rewards. |
| `get-delegation-pool` | `principal` | Current stacking pool address. |
| `get-vault-status` | `tuple` | Full vault state: deposits, rewards, balance, pause status, block height. |

### Error Codes

| Code | Constant | Meaning |
|------|----------|---------|
| `u100` | `ERR-NOT-AUTHORIZED` | Caller is not the contract owner. |
| `u101` | `ERR-INSUFFICIENT-BALANCE` | Insufficient balance for the operation. |
| `u102` | `ERR-INVALID-AMOUNT` | Invalid or zero amount provided. |
| `u103` | `ERR-STACKING-ERROR` | Stacking delegation failed. |
| `u104` | `ERR-SBTC-TRANSFER-FAILED` | sBTC transfer could not be completed. |
| `u105` | `ERR-VAULT-PAUSED` | Vault is currently paused. |

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `STACKING-THRESHOLD` | `u10000000` | Minimum 10 STX required for stacking. |
| `SBTC-TOKEN-CONTRACT` | `SP000...sbtc-token` | sBTC token contract on testnet. |

---

## Frontend

### Core Components

| Component | Description |
|-----------|-------------|
| `AmountInput` | Numeric input with unit display and MAX button. |
| `ValidatedInput` | Form input with real-time validation feedback. |
| `ButtonWithLoading` | Button with loading spinner state. |
| `ErrorBoundary` | Catches React render errors gracefully. |
| `ErrorMessage` | Standardized error display. |
| `LoadingScreen` | Full-page loading state with skeleton. |
| `SkeletonCard` | Placeholder card while data loads. |
| `Spinner` | Animated loading spinner. |
| `VisuallyHidden` | Screen-reader-only text for accessibility. |
| `SkipLink` | Keyboard navigation skip-to-content link. |

### Feature Modules

- **Vault Dashboard** — Real-time deposits, rewards, and vault health metrics.
- **Deposit / Withdraw** — Forms with validation for vault interactions.
- **Portfolio View** — User position overview with reward tracking.
- **Transaction History** — Deposit and withdrawal history with status tracking.
- **Vault Analytics** — Charts and metrics for vault performance.
- **Yield Calculator** — Projected APY and reward estimations.
- **STX Converter** — Real-time sBTC/STX conversion calculator.
- **Fee Estimator** — Transaction fee predictions before signing.
- **Network Status** — Live Stacks network health indicator.
- **Admin Panel** — Vault pause, compounding, and emergency controls.

### Hooks

| Hook | Purpose |
|------|---------|
| `useWallet` | Stacks wallet connection and address management. |
| `useAsync` | Generic async operation with loading/error states. |
| `useFormValidation` | Form field validation with error messages. |
| `useMediaQuery` | Responsive breakpoint detection. |
| `useKeyboard` | Keyboard shortcut management. |
| `useFocusTrap` | Modal focus trapping for accessibility. |

### Utilities

| Module | Purpose |
|--------|---------|
| `lib/validation.ts` | Amount validation, address format checks, input sanitization. |
| `lib/formatters.ts` | `formatSTX()`, `formatBTC()`, `formatCompact()`, `formatUSD()`. |
| `lib/stacks.ts` | Network configuration, contract address, explorer URLs. |
| `lib/constants.ts` | Conversion factors, error messages, deposit constraints. |
| `lib/errorUtils.ts` | Error parsing and user-friendly message generation. |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- **Clarinet** (for smart contract development) — [Install Clarinet](https://docs.hiro.so/clarinet/getting-started)
- **Stacks Wallet** — [Leather Wallet](https://leather.io/) recommended

### Smart Contract Development

```bash
# Clone the repository
git clone https://github.com/iyanusha/bitcoinFlow.git
cd bitcoinFlow

# Install contract test dependencies
npm install

# Run contract tests
npm test

# Run tests with coverage report
npm run test:report

# Watch mode (re-run on changes)
npm run test:watch
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc -b

# Lint
npm run lint
```

### Environment Variables

Create a `.env` file in `frontend/`:

```env
# Network: "testnet" (default) or "mainnet"
VITE_NETWORK=testnet

# Contract deployer address
VITE_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
```

---

## Testing

The project uses **Vitest** with the **Clarinet SDK** for smart contract testing.

```bash
# Run all tests
npm test

# Run with coverage and cost analysis
npm run test:report

# Watch mode
npm run test:watch
```

### Test Coverage

- Deposit with valid amounts
- Rejection of zero/invalid amounts
- User balance tracking after deposit
- Withdrawal up to deposited amount
- Over-withdrawal protection
- Vault pause authorization (owner only)
- Paused vault operation rejection
- Vault status retrieval

---

## Project Structure

```
bitcoinFlow/
├── contracts/
│   └── flow-vault.clar           # Clarity smart contract
├── tests/
│   └── flow-vault.test.ts        # Contract test suite
├── settings/
│   └── Devnet.toml               # Clarinet devnet config
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Root application component
│   │   ├── main.tsx              # React entry point
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utilities, config, helpers
│   │   ├── types/                # TypeScript type definitions
│   │   ├── index.css             # Global styles
│   │   └── App.css               # App-level styles
│   ├── vite.config.ts            # Vite configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json              # Frontend dependencies
├── Clarinet.toml                 # Clarinet project config
├── vitest.config.js              # Vitest configuration
├── package.json                  # Root dependencies (testing)
└── README.md
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes with clear messages.
4. Push to your fork and open a Pull Request.

Please ensure:
- All contract tests pass (`npm test`).
- Frontend builds without errors (`cd frontend && npm run build`).
- TypeScript has no type errors (`npx tsc -b`).

---

## License

MIT
