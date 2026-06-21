'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from './icons';
import { useAuth } from '@/lib/auth';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { href: '/dashboard?page=mybundles', label: 'My Bundles', icon: 'book' },
  { href: '/dashboard?page=schedule', label: 'Schedule', icon: 'calendar' },
  { href: '/dashboard?page=materials', label: 'Materials', icon: 'list' },
];

const NAV2 = [
  { href: '/progress', label: 'Progress', icon: 'compass' },
  { href: '/journal', label: 'Reflection journal', icon: 'bookOpen' },
  { href: '/ai', label: 'AI companion', icon: 'sparkles' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const Item = ({ href, label, icon }) => {
    const active = pathname === href.split('?')[0] && (href === '/dashboard' ? !href.includes('page=') : true);
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-[11px] px-3.5 py-2.5 text-[14.5px] font-medium ${
          pathname === href.split('?')[0] ? 'bg-brand-tint font-semibold text-brand' : 'text-[#525A50] hover:bg-[#F6F7F3]'
        }`}
      >
        <Icon name={icon} size={18} /> {label}
      </Link>
    );
  };

  return (
    <aside className="hidden w-[248px] flex-shrink-0 flex-col border-r border-line bg-white p-4 lg:flex">
      <Link href="/" className="mb-6 flex items-center gap-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand-bright to-brand-deep text-white"><Icon name="bookOpen" size={18} strokeWidth={1.7} /></div>
        <span className="text-[16px] font-extrabold text-ink">Sacred Knowledge</span>
      </Link>

      <nav className="space-y-1">{NAV.map((n) => <Item key={n.href} {...n} />)}</nav>
      <div className="my-4 border-t border-line" />
      <nav className="space-y-1">{NAV2.map((n) => <Item key={n.href} {...n} />)}</nav>
      <div className="my-4 border-t border-line" />
      <nav className="space-y-1">
        <Item href="/explore" label="Find teachers" icon="search" />
        <Item href="/account" label="Account" icon="user" />
        {user?.role === 'teacher' && <Item href="/teacher" label="Teacher studio" icon="bookOpen" />}
        {user?.role === 'admin' && <Item href="/admin" label="Admin console" icon="shield" />}
        <button
          onClick={async () => { await logout(); router.push('/'); }}
          className="flex w-full items-center gap-3 rounded-[11px] px-3.5 py-2.5 text-[14.5px] font-medium text-[#525A50] hover:bg-[#F6F7F3]"
        >
          <Icon name="logout" size={18} /> Log out
        </button>
      </nav>
    </aside>
  );
}
