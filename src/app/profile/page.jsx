'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [editMode, setEditMode] = useState({
    name: false,
    contact: false,
    password: false
  });

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    // Get user from cookie
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(c => c.trim().startsWith('user='));
    
    if (!userCookie) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        contact: userData.contact || ''
      }));
    } catch (e) {
      console.error('Error parsing user cookie:', e);
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      setSuccess('Name updated successfully!');
      setEditMode({ ...editMode, name: false });
      setLoading(false);
      
      // Update cookie
      const updatedUser = { ...user, name: formData.name };
      document.cookie = `user=${JSON.stringify(updatedUser)}; path=/; max-age=2592000`;
      setUser(updatedUser);
      
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      setSuccess('Contact updated successfully!');
      setEditMode({ ...editMode, contact: false });
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess('Password updated successfully!');
      setEditMode({ ...editMode, password: false });
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-2xl animate-pulse">[LOADING...]</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
              {'>'} PROFILE SETTINGS
            </h1>
            <p className="text-zinc-500 text-base sm:text-lg">
              Manage your account information
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-green-500 bg-green-500/10 text-green-500 text-sm sm:text-base">
              <span className="font-bold">[SUCCESS]</span> {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm sm:text-base">
              <span className="font-bold">[ERROR]</span> {error}
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            {/* Name Section */}
            <div className="border border-white bg-black/50 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wider">
                  {'>'} NAME
                </h2>
                {!editMode.name && (
                  <button
                    onClick={() => setEditMode({ ...editMode, name: true })}
                    className="border border-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    [EDIT]
                  </button>
                )}
              </div>

              {editMode.name ? (
                <form onSubmit={handleUpdateName} className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                    disabled={loading}
                  />
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-white text-black px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {loading ? '[SAVING...]' : '[SAVE]'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode({ ...editMode, name: false });
                        setFormData({ ...formData, name: user.name });
                      }}
                      className="border border-white px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold hover:bg-white hover:text-black transition-colors"
                      disabled={loading}
                    >
                      [CANCEL]
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-lg sm:text-xl text-zinc-400">{user.name}</p>
              )}
            </div>

            {/* Contact Section */}
            <div className="border border-white bg-black/50 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wider">
                  {'>'} CONTACT
                </h2>
                {!editMode.contact && (
                  <button
                    onClick={() => setEditMode({ ...editMode, contact: true })}
                    className="border border-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    [EDIT]
                  </button>
                )}
              </div>

              {editMode.contact ? (
                <form onSubmit={handleUpdateContact} className="space-y-3 sm:space-y-4">
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+880 12345 67890"
                    className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                    disabled={loading}
                  />
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-white text-black px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {loading ? '[SAVING...]' : '[SAVE]'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode({ ...editMode, contact: false });
                        setFormData({ ...formData, contact: user.contact || '' });
                      }}
                      className="border border-white px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold hover:bg-white hover:text-black transition-colors"
                      disabled={loading}
                    >
                      [CANCEL]
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-lg sm:text-xl text-zinc-400">
                  {formData.contact || 'No contact number added'}
                </p>
              )}
            </div>

            {/* Email Section (Read-only) */}
            <div className="border border-white bg-black/50 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-wider">
                {'>'} EMAIL
              </h2>
              <p className="text-lg sm:text-xl text-zinc-400 break-all">{user.email}</p>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2">Email cannot be changed</p>
            </div>

            {/* Password Section */}
            <div className="border border-white bg-black/50 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wider">
                  {'>'} PASSWORD
                </h2>
                {!editMode.password && (
                  <button
                    onClick={() => setEditMode({ ...editMode, password: true })}
                    className="border border-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    [CHANGE]
                  </button>
                )}
              </div>

              {editMode.password ? (
                <form onSubmit={handleUpdatePassword} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                      {'>'} CURRENT_PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-sm sm:text-base"
                      >
                        {showPassword.current ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                      {'>'} NEW_PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                        className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-sm sm:text-base"
                      >
                        {showPassword.new ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                      {'>'} CONFIRM_NEW_PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                        className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-sm sm:text-base"
                      >
                        {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-white text-black px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {loading ? '[UPDATING...]' : '[UPDATE]'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode({ ...editMode, password: false });
                        setFormData({
                          ...formData,
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                      className="border border-white px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold hover:bg-white hover:text-black transition-colors"
                      disabled={loading}
                    >
                      [CANCEL]
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-lg sm:text-xl text-zinc-400">••••••••</p>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
