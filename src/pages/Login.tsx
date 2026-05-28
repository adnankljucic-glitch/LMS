import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Users, BookOpen, Award } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl flex gap-8">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-abhaya">HILIO</h1>
              <p className="text-slate-400 text-sm -mt-1">Healthcare Learning Platform</p>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight font-abhaya">
            Transform<br />Healthcare<br />Training
          </h2>
          
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Empower your healthcare workforce with AI-driven learning, compliance
            tracking, and immersive VR training experiences.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <span>Compliance Tracking & CME Credits</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <span>AI-Powered Personalized Learning Paths</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <span>VR Training Integration</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-orange-400" />
              </div>
              <span>Certification Management</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-96">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2 font-abhaya">Welcome back</h3>
            <p className="text-slate-400 mb-8">Sign in to continue your learning journey</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@hospital.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-900/50" />
                  Remember me
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-center text-slate-400 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Contact your administrator
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}