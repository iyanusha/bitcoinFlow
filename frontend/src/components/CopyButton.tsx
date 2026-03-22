import { useState } from 'react';
import { copyToClipboard } from '../lib/clipboard';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      className="copy-btn"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : label}
      aria-pressed={copied}
      title={copied ? 'Copied!' : label}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
