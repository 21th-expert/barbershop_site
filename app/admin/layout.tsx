'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Scissors, Calendar, Image, Settings, LogOut, Menu, Wrench } from 'lucide-react';

const navItems = [
  { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { label: 'Services',     href: '/admin/services',     icon: Wrench },
  { label: 'Gallery',      href: '/admin/gallery',      icon: Image },
  { label: 'Settings',     href: '/admin/settings',     icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem('admin_authed');
    if (!ok && pathname !== '/admin') {
      router.replace('/admin');
      setAuthed(false);
    } else {
      setAuthed(!!ok);
    }
  }, [pathname, router]);

  function logout() {
    sessionStorage.removeItem('admin_authed');
    router.replace('/admin');
  }

  if (pathname === '/admin') return <>{children}</>;
  if (authed === null) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <span className="text-slate-400 text-sm">Loading…</span>
    </div>
  );
  if (!authed) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-slate-200 flex flex-col shadow-sm transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-100 text-blue-600 font-heading font-bold">
          <Scissors size={18} /> Admin Panel
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-lg ${
                pathname.startsWith(href)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-5 py-4 text-sm text-slate-400 hover:text-red-500 border-t border-slate-100 transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 md:ml-56 flex flex-col">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shadow-sm">
          <button className="md:hidden text-slate-600" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <span className="text-slate-400 text-sm font-medium">{navItems.find((n) => pathname.startsWith(n.href))?.label}</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
