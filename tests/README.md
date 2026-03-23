# BitcoinFlow Test Suite

## Contract Tests (Clarity)

Located in `tests/`:

- `flow-vault.test.ts` — Main contract test suite covering deposits, withdrawals, cooldown, exchange rate, vault status, delegation, emergency withdraw, and user share calculations
- `error-codes.test.ts` — Error code mapping validation
- `read-only.test.ts` — Read-only function return type verification
- `helpers.ts` — Reusable test helper functions

## Frontend Tests (React/TypeScript)

Located in `frontend/src/`:

### Library Tests (`lib/__tests__/`)
- `validation.test.ts` — validateAmount, validateDeposit, validateWithdraw, validateDecimalPrecision, sanitizeNumericInput, isPositiveInteger, isValidStxAddress, validateStxAddress, combineValidators
- `formatters.test.ts` — formatSTX, formatBTC, formatSBTC, formatCompact, formatPercentage, formatBlocks, formatExchangeRate, formatAddress, formatTxId, formatUSD, formatTimeSince, formatDate
- `errorUtils.test.ts` — getContractErrorMessage, parseTransactionError
- `constants.test.ts` — All exported constant values
- `stacks.test.ts` — Contract constants and explorer URL functions
- `clipboard.test.ts` — copyToClipboard with API and fallback
- `logger.test.ts` — Logger methods and prefix formatting

### Component Tests (`components/__tests__/`)
- `Toast.test.tsx` — Rendering, CSS, dismiss, explorer link, ARIA
- `ToastContainer.test.tsx` — Empty state, multiple toasts, accessibility
- `CopyButton.test.tsx` — Label, click feedback, CSS class
- `ExplorerLink.test.tsx` — TX/address links, labels, security attributes
- `ErrorBoundary.test.tsx` — Normal/error rendering, fallback, try again
- `Spinner.test.tsx` — ARIA, sizing, CSS class
- `SkeletonCard.test.tsx` — Lines, CSS class, custom class
- `SkipLink.test.tsx` — Default/custom target, CSS class
- `VisuallyHidden.test.tsx` — sr-only class, span wrapper
- `LoadingScreen.test.tsx` — Message, spinner, layout
- `ErrorMessage.test.tsx` — Types, ARIA roles, dismiss
- `ConfirmDialog.test.tsx` — Open/closed, labels, callbacks
- `ButtonWithLoading.test.tsx` — Loading state, disabled, aria-busy
- `ValidatedInput.test.tsx` — Validation, blur, aria-invalid
- `AmountInput.test.tsx` — Label, unit, MAX, sanitization
- `TransactionHistory.test.tsx` — Empty, list, count, badges, links

### Test Infrastructure
- `__tests__/setup.ts` — Global vitest setup with cleanup
- `__tests__/test-helpers.ts` — Mock factories for TransactionRecord, VaultStats, UserPosition, ToastMessage, CooldownInfo
- `__tests__/test-helpers.test.ts` — Tests for the test helpers themselves
- `__tests__/types.test.ts` — TypeScript type shape validation

## Running Tests

```bash
# Contract tests
clarinet test

# Frontend tests
cd frontend && npm test

# Watch mode
cd frontend && npm run test:watch

# Coverage
cd frontend && npm run test:coverage
```
