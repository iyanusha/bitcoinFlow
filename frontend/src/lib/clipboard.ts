/**
 * Check if the Clipboard API is available in the current context.
 * Returns false in insecure contexts (HTTP) or when permissions are denied.
 */
export function isClipboardAvailable(): boolean {
  return typeof navigator !== 'undefined' &&
    typeof navigator.clipboard !== 'undefined' &&
    typeof navigator.clipboard.writeText === 'function';
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (isClipboardAvailable()) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy approach
    }
  }

  // Legacy fallback for insecure contexts or older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  textArea.style.left = '-9999px';
  textArea.setAttribute('readonly', '');
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    return true;
  } catch {
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
}
