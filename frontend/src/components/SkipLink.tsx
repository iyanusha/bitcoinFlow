import { useCallback } from 'react';

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export function SkipLink({ targetId = 'main-content', label = 'Skip to main content' }: SkipLinkProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      aria-label={label}
      onClick={handleClick}
    >
      {label}
    </a>
  );
}
