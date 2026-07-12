import Link from 'next/link';

// Soft-filled rounded chip for subject tags etc.
export default function Pill({ href, className = '', children, ...rest }) {
  const cls = `pill ${className}`.trim();
  if (href) {
    return (
      <Link href={href} className={`${cls} sk-btn`} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
