export default function StatBlock({ value, label, tone = 'emerald' }) {
  const color = tone === 'ink' ? 'text-ink' : 'text-emerald';
  return (
    <div className="text-center">
      <div className={`font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none ${color}`}>{value}</div>
      <div className="mt-2 text-[13.5px] font-medium text-muted">{label}</div>
    </div>
  );
}
