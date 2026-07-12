import Link from 'next/link';

// Flat bordered card. hover=true adds the emerald-border lift.
export default function Card({ href, hover = true, className = '', children, ...rest }) {
  const cls = `card-flat ${hover ? 'sk-card' : ''} ${className}`.trim();
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
