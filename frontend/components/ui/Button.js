import Link from 'next/link';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  dark: 'btn-dark',
  ghost: 'btn-ghost',
  white: 'btn-white',
  outlineWhite: 'btn-outline-white',
  indigo: 'btn-indigo',
};

const SIZES = {
  md: '',
  sm: '!px-5 !py-2.5 !text-[14px]',
  lg: '!px-9 !py-4 !text-[16px]',
};

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  arrow = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || ''} ${className}`.trim();
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
