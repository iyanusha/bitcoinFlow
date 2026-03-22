import type { ReactNode } from 'react';

interface AccessibleIconProps {
  /** The icon element (emoji, SVG, etc.) */
  children: ReactNode;
  /** Accessible label describing the icon */
  label: string;
  /** Whether the icon is purely decorative */
  decorative?: boolean;
  /** Additional CSS class */
  className?: string;
}

export function AccessibleIcon({
  children,
  label,
  decorative = false,
  className = '',
}: AccessibleIconProps) {
  if (decorative) {
    return (
      <span role="presentation" aria-hidden="true" className={className}>
        {children}
      </span>
    );
  }

  return (
    <span role="img" aria-label={label} className={className}>
      {children}
    </span>
  );
}
