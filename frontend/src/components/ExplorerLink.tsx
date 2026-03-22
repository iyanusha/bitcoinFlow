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

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="explorer-link"
      title={value}
    >
      {displayText}
    </a>
  );
}
