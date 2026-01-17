'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const quickLogin = async (email, password) => {
    setFormData({ email, password });
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold mb-2 tracking-wider">
              <span className="text-white">[</span>
              <span className="text-white">MONOCHROME</span>
              <span className="text-white">]</span>
            </h1>
          </Link>
          <p className="text-sm tracking-widest">WEB SOLUTIONS</p>
        </div>

        {/* Login Box */}
        <div className="border border-white/20 bg-black/50 backdrop-blur-sm p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1 tracking-wide">ACCESS_TERMINAL</h2>
            <p className="text-sm">{'>'} Enter credentials to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 border border-red-500 bg-red-500/10 text-red-500 text-sm">
              <span className="font-bold">[ERROR]</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm mb-2">
                {'>'} EMAIL_ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:border-white focus:outline-none transition-colors font-mono"
                placeholder="user@domain.com"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm mb-2">
                {'>'} PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 px-4 py-3 pr-12 text-white focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 px-6 font-bold tracking-wider hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? '[AUTHENTICATING...]' : '[AUTHENTICATE]'}
              </span>
              <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>

            {/* Quick Login Buttons */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs mb-3 text-center">
                {'>'} QUICK_LOGIN
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => quickLogin('admin@monochrome.com', 'Admin@123')}
                  disabled={loading}
                  className="border border-white/20 text-white py-2 px-4 text-sm font-bold tracking-wider hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  [ADMIN]
                </button>
                
                <button
                  type="button"
                  onClick={() => quickLogin('user@testing.com', 'User@123')}
                  disabled={loading}
                  className="border border-white/20 text-white py-2 px-4 text-sm font-bold tracking-wider hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  [USER]
                </button>
              </div>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center text-sm">
            <p>
              {'>'} New user?{' '}
              <Link href="/register" className="text-white hover:underline">
                Create account
              </Link>
            </p>
            <p className="mt-2">
              {'>'} Return to{' '}
              <Link href="/" className="text-white hover:underline">
                main terminal
              </Link>
            </p>
          </div>
        </div>

        {/* Test Credentials Info */}
        <div className="mt-6 p-4 border border-white/20 bg-white/10 text-xs">
          <p className="mb-2">{'>'} TEST_CREDENTIALS:</p>
          <p>Admin: admin@monochrome.com / admin123</p>
          <p>User: user@test.com / test123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
