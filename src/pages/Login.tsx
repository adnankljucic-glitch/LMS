import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, BookOpen, TrendingUp, Award, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('demo@demo.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setIsLoading(false);
    navigate('/dashboard');
  };

  const features = [
    { icon: Shield, label: 'Mandatory Compliance Certifications', sub: 'AML, GDPR, MiFID II and more' },
    { icon: BookOpen, label: 'Structured 90-Day Onboarding', sub: 'Week-by-week learning journey' },
    { icon: TrendingUp, label: 'Progress Tracking', sub: 'Real-time dashboards and milestones' },
    { icon: Award, label: 'AI Tutor', sub: 'Instant answers on banking regulations' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[480px] bg-danske-navy text-white p-12 flex-shrink-0">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-danske-cyan rounded flex items-center justify-center font-bold text-danske-navy">
            DB
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Danske Bank</div>
            <div className="text-white/50 text-xs">Learning Centre</div>
          </div>
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-4">
          Empower your<br />
          <span className="text-danske-cyan">financial career.</span>
        </h1>
        <p className="text-white/60 text-lg mb-12 leading-relaxed">
          Structured learning, mandatory certifications, and expert AI support — everything you need to excel at Danske Bank.
        </p>

        <div className="space-y-6">
          {features.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-danske-cyan" />
              </div>
              <div>
                <div className="font-medium text-sm">{label}</div>
                <div className="text-white/50 text-xs mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-12 border-t border-white/10">
          <p className="text-white/30 text-xs leading-relaxed">
            Danske Bank A/S · Holmens Kanal 2-12, 1092 Copenhagen K · CVR-nr. 61126228
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-danske-gray px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 bg-danske-navy rounded flex items-center justify-center font-bold text-white">DB</div>
            <div>
              <div className="font-bold text-lg text-danske-navy">Danske Bank</div>
              <div className="text-danske-muted text-xs">Learning Centre</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-danske-text mb-1">Welcome back</h2>
          <p className="text-danske-muted mb-8">Auto-certify employees & stay audit-ready across GDPR, Cybersecurity, and industry rules. Stay compliant, reduce risk, and track progress with our Learning Lifecycle Platform. Automate Learning Flows. Scale Learning Faster.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-danske-text mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-danske-border rounded-lg text-danske-text placeholder-danske-muted focus:outline-none focus:ring-2 focus:ring-danske-cyan focus:border-transparent text-sm"
                placeholder="you@danskebank.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-danske-text mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-white border border-danske-border rounded-lg text-danske-text placeholder-danske-muted focus:outline-none focus:ring-2 focus:ring-danske-cyan focus:border-transparent text-sm"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-danske-muted hover:text-danske-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-danske-muted cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-danske-border accent-danske-cyan" />
                Remember me
              </label>
              <a href="#" className="text-danske-cyan hover:text-danske-cyanDark font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-danske-navy text-white rounded-lg font-semibold hover:bg-danske-navyLight transition-colors disabled:opacity-60 text-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-danske-cyan/10 border border-danske-cyan/20 rounded-lg">
            <p className="text-xs text-danske-navy font-medium mb-1">Demo credentials</p>
            <p className="text-xs text-danske-muted">Email: demo@demo.com · Password: any value</p>
          </div>

          <p className="mt-8 text-center text-xs text-danske-muted">
            Need access?{' '}
            <a href="#" className="text-danske-cyan hover:text-danske-cyanDark font-medium">Contact IT Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
