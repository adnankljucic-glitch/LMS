import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Calendar, ClipboardCheck,
  MessageSquare, Map, Menu, X, LogOut, Bell, ChevronDown,
} from 'lucide-react';
import { DEMO_USER } from '../data/mockData';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/onboarding', icon: Map, label: '90-Day Plan' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/assessments', icon: ClipboardCheck, label: 'Assessments' },
  { to: '/ai-tutor', icon: MessageSquare, label: 'AI Tutor' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-danske-gray overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 bg-danske-navy text-white transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-danske-cyan rounded flex items-center justify-center font-bold text-danske-navy text-sm">
            DB
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">Danske Bank</div>
            <div className="text-white/50 text-xs">Learning Centre</div>
          </div>
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User chip */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-danske-cyan flex items-center justify-center text-danske-navy font-bold text-sm flex-shrink-0">
              {DEMO_USER.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{DEMO_USER.name}</div>
              <div className="text-white/50 text-xs truncate">{DEMO_USER.role}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-danske-cyan text-danske-navy'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 lg:px-8 py-4 bg-white border-b border-danske-border flex-shrink-0">
          <button
            className="lg:hidden text-danske-muted hover:text-danske-text"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="relative text-danske-muted hover:text-danske-text">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
