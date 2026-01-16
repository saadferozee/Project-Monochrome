'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const validatePassword = (password) => {
    return {
      hasMinLength: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const isPasswordValid = (strength) => {
    return Object.values(strength).every(value => value === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid(passwordStrength)) {
      setError('Password does not meet all requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message || 'Registration failed');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Update password strength in real-time
    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
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
          <p className="text-zinc-500 text-sm tracking-widest">WEB SOLUTIONS</p>
        </div>

        {/* Register Box */}
        <div className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1 tracking-wide">CREATE_ACCOUNT</h2>
            <p className="text-zinc-500 text-sm">{'>'} Register new user credentials</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 border border-red-500 bg-red-500/10 text-red-500 text-sm">
              <span className="font-bold">[ERROR]</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm mb-2 text-zinc-400">
                {'>'} FULL_NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:border-white focus:outline-none transition-colors font-mono"
                placeholder="Enter your name here"
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm mb-2 text-zinc-400">
                {'>'} EMAIL_ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white focus:border-white focus:outline-none transition-colors font-mono"
                placeholder="user@example.com"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm mb-2 text-zinc-400">
                {'>'} PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-zinc-700 px-4 py-3 pr-12 text-white focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
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
              
              {/* Password Strength Indicators */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={passwordStrength.hasMinLength ? 'text-green-500' : 'text-zinc-600'}>
                      {passwordStrength.hasMinLength ? '[✓]' : '[✗]'}
                    </span>
                    <span className={passwordStrength.hasMinLength ? 'text-zinc-400' : 'text-zinc-600'}>
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={passwordStrength.hasUpperCase ? 'text-green-500' : 'text-zinc-600'}>
                      {passwordStrength.hasUpperCase ? '[✓]' : '[✗]'}
                    </span>
                    <span className={passwordStrength.hasUpperCase ? 'text-zinc-400' : 'text-zinc-600'}>
                      One uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={passwordStrength.hasLowerCase ? 'text-green-500' : 'text-zinc-600'}>
                      {passwordStrength.hasLowerCase ? '[✓]' : '[✗]'}
                    </span>
                    <span className={passwordStrength.hasLowerCase ? 'text-zinc-400' : 'text-zinc-600'}>
                      One lowercase letter (a-z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={passwordStrength.hasNumber ? 'text-green-500' : 'text-zinc-600'}>
                      {passwordStrength.hasNumber ? '[✓]' : '[✗]'}
                    </span>
                    <span className={passwordStrength.hasNumber ? 'text-zinc-400' : 'text-zinc-600'}>
                      One number (0-9)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-zinc-600'}>
                      {passwordStrength.hasSpecialChar ? '[✓]' : '[✗]'}
                    </span>
                    <span className={passwordStrength.hasSpecialChar ? 'text-zinc-400' : 'text-zinc-600'}>
                      One special character (!@#$%^&*)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm mb-2 text-zinc-400">
                {'>'} CONFIRM_PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-zinc-700 px-4 py-3 pr-12 text-white focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
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
              {formData.confirmPassword && (
                <p className={`text-xs mt-2 ${
                  formData.password === formData.confirmPassword 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {formData.password === formData.confirmPassword 
                    ? '[✓] Passwords match' 
                    : '[✗] Passwords do not match'}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 px-6 font-bold tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? '[CREATING_ACCOUNT...]' : '[CREATE_ACCOUNT]'}
              </span>
              <div className="absolute inset-0 bg-zinc-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center text-sm text-zinc-500">
            <p>
              {'>'} Already have an account?{' '}
              <Link href="/login" className="text-white hover:underline">
                Login here
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
      </div>
    </div>
  );
};

export default RegisterPage;
