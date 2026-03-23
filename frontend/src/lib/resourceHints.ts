type HintType = 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';

/**
 * Add a resource hint link to the document head.
 */
export function addResourceHint(
  href: string,
  type: HintType,
  options?: { as?: string; crossOrigin?: string },
): () => void {
  const link = document.createElement('link');
  link.rel = type;
  link.href = href;
  if (options?.as) link.setAttribute('as', options.as);
  if (options?.crossOrigin) link.crossOrigin = options.crossOrigin;
  document.head.appendChild(link);

  return () => {
    if (link.parentNode) link.parentNode.removeChild(link);
  };
}

/**
 * Preconnect to a domain for faster subsequent requests.
 */
export function preconnect(domain: string): () => void {
  return addResourceHint(domain, 'preconnect', { crossOrigin: '' });
}

/**
 * Prefetch a resource for future navigation.
 */
export function prefetch(url: string, asType?: string): () => void {
  return addResourceHint(url, 'prefetch', asType ? { as: asType } : undefined);
}

/**
 * Preload a critical resource.
 */
export function preload(url: string, asType: string): () => void {
  return addResourceHint(url, 'preload', { as: asType });
}

/**
 * Preconnect to the Hiro API for faster Stacks network requests.
 */
export function preconnectHiroApi(): () => void {
  return preconnect('https://api.hiro.so');
}
