import { getTxExplorerUrl, getAddressExplorerUrl } from '../lib/stacks';
import { formatTxId, formatAddress } from '../lib/formatters';

interface ExplorerLinkProps {
  type: 'tx' | 'address';
  value: string;
  label?: string;
}

export function ExplorerLink({ type, value, label }: ExplorerLinkProps) {
  const url = type === 'tx' ? getTxExplorerUrl(value) : getAddressExplorerUrl(value);
  const displayText = label ?? (type === 'tx' ? formatTxId(value) : formatAddress(value));

  const ariaLabel = type === 'tx'
    ? `View transaction ${value.slice(0, 10)} in block explorer (opens in new tab)`
    : `View address ${value.slice(0, 10)} in block explorer (opens in new tab)`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="explorer-link"
      title={value}
      aria-label={ariaLabel}
    >
      {displayText}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
