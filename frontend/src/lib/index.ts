// Barrel exports for lib utilities
export { callReadOnly, callReadOnlyInt, callReadOnlyBool } from './contract';
export type { ReadOnlyCallOptions } from './contract';
export {
  getContractError,
  extractErrorCode,
  classifyContractError,
  handleContractError,
  isKnownErrorCode,
} from './contractErrors';
export type { ContractErrorCode } from './contractErrors';
export {
  parseClarityInt,
  parseClarityBool,
  microToDecimal,
  parseClarityOptional,
  isClarityError,
  stxToMicro,
  btcToSats,
} from './contractParsers';
export { parseContractEvent, filterEvents } from './contractEvents';
export {
  getCached,
  setCached,
  buildCacheKey,
  clearContractCache,
  getCacheSize,
} from './contractCache';
export {
  senderTransfersExactly,
  senderTransfersAtMost,
  contractSendsExactly,
  contractSendsAtMost,
} from './postConditions';
export {
  validateDepositAmount,
  validateWithdrawalAmount,
  validateDecimals,
} from './balanceValidation';
export { withRetry, isRetryableError } from './retry';
export type { RetryOptions } from './retry';
export { transactionsToCSV, downloadCSV, exportTransactions } from './transactionExport';
export { searchTransactions, highlightMatch } from './transactionSearch';
export {
  sortTransactions,
  toggleDirection,
  DEFAULT_SORT,
} from './transactionSort';
export type { SortField, SortDirection, SortConfig } from './transactionSort';
export {
  getPresetDateRange,
  isWithinDateRange,
  DATE_RANGE_LABELS,
} from './dateRanges';
export type { DateRangePreset, DateRange } from './dateRanges';
export {
  isNotificationSupported,
  requestNotificationPermission,
  hasNotificationPermission,
  showTransactionNotification,
} from './transactionNotifications';
export {
  hexToRgb,
  relativeLuminance,
  contrastRatio,
  meetsAA,
  meetsAAA,
  getContrastLevel,
} from './colorContrast';
export type { ContrastLevel } from './colorContrast';
export { auditAccessibility } from './a11yAudit';
export type { A11yIssue } from './a11yAudit';
export { announceToScreenReader } from './a11y';
export {
  validateLength,
  validateRange,
  validateRequired,
  validatePattern,
  validateNotEqual,
  validateWhitelist,
  validateWhen,
  validateConfirmMatch,
  validateMaxDecimals,
} from './validation';
export {
  stripHtml,
  escapeHtml,
  normalizeWhitespace,
  stripControlChars,
  sanitizeText,
  sanitizeNumber,
  truncate,
} from './inputSanitizer';
export {
  formDataToObject,
  hasFormChanges,
  getChangedFields,
  formValuesToQueryString,
  queryStringToFormValues,
} from './formHelpers';
export { VALIDATION_MESSAGES } from './validationMessages';
export type { ValidationMessageKey } from './validationMessages';
export {
  validateAsync,
  createAsyncValidator,
  debounceAsyncValidator,
} from './asyncValidation';
export { deepEqual, shallowEqual } from './deepEqual';
export {
  measureSync,
  measureAsync,
  getPerformanceEntries,
  getEntriesByName,
  getAverageDuration,
  clearPerformanceEntries,
  markStart,
} from './performanceMonitor';
export type { PerformanceEntry } from './performanceMonitor';
export { throttle, rafThrottle } from './throttle';
export { memoize, memoizeWithTTL } from './memoize';
export { batchUpdates, scheduleIdle, cancelIdle } from './batchUpdates';
export { ObjectPool } from './objectPool';
