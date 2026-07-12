// Subtle Islamic geometric pattern (8-point star / khatam) used as a low-opacity
// texture layer inside emerald & midnight color blocks. Decorative only.
export default function GeometricTexture({ className = '', opacity = 0.06, color = '#ffffff' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id="sk-khatam" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <g fill="none" stroke={color} strokeWidth="1.1">
            {/* interlaced 8-point star */}
            <path d="M36 6 L45 27 L66 36 L45 45 L36 66 L27 45 L6 36 L27 27 Z" />
            <rect x="18" y="18" width="36" height="36" transform="rotate(45 36 36)" />
            <circle cx="36" cy="36" r="7" />
            <path d="M0 36 L14 36 M58 36 L72 36 M36 0 L36 14 M36 58 L36 72" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sk-khatam)" />
    </svg>
  );
}
