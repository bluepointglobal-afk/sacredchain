// Step markers (1/2/3). tone: 'gold' | 'emerald'
export default function NumberBadge({ n, tone = 'gold', className = '' }) {
  const styles = tone === 'emerald' ? 'bg-emerald text-white' : 'bg-gold text-ink';
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-[22px] font-bold ${styles} ${className}`}>
      {n}
    </div>
  );
}
