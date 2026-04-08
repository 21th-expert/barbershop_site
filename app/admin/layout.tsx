'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Scissors, Calendar, Image, Settings, LogOut, Menu, X, Wrench } from 'lucide-react';

const navItems = [
  { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { label: 'Services',     href: '/admin/services',     icon: Wrench },
  { label: 'Gallery',      href: '/admin/gallery',      icon: Image },
  { label: 'Settings',     href: '/admin/settings',     icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem('admin_authed');
    if (!ok && pathname !== '/admin') router.replace('/admin');
    else if (ok) setAuthed(true);
  }, [pathname, router]);

  function logout() {
    sessionStorage.removeItem('admin_authed');
    router.replace('/admin');
  }

  if (!authed && pathname !== '/admin') return null;
  if (pathname === '/admin') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-brand-black">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-brand-gray border-r border-brand-black flex flex-col transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-brand-black text-brand-gold font-heading font-bold">
          <Scissors size={18} /> Admin Panel
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded ${
                pathname.startsWith(href) ? 'bg-brand-gold/10 text-brand-gold' : 'text-brand-light/60 hover:text-brand-gold hover:bg-brand-gold/5'
              }`}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-5 py-4 text-sm text-brand-light/40 hover:text-red-400 border-t border-brand-black transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 md:ml-56 flex flex-col">
        <header className="h-14 border-b border-brand-gray flex items-center px-4 gap-3">
          <button className="md:hidden text-brand-cream" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <span className="text-brand-light/50 text-sm">{navItems.find((n) => pathname.startsWith(n.href))?.label}</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
