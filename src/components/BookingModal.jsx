'use client';

import { useState, useEffect } from 'react';

const BookingModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    budget: '',
    timeline: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData(prev => ({
          ...prev,
          name: parsedUser.name || '',
          email: parsedUser.email || ''
        }));
      }
    }
  }, [isOpen]);
  const budgetOptions = [
    '< $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not sure'
  ];

  const timelineOptions = [
    'ASAP',
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '3+ months',
    'Flexible'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = localStorage.getItem('user');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if user is logged in
      if (userData) {
        const user = JSON.parse(userData);
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          serviceId: service._id,
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectDescription: '',
          budget: '',
          timeline: ''
        });
        
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-black border border-black dark:border-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors z-10"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 tracking-wider text-black dark:text-white">
              BOOK SERVICE
            </h2>
            <p className="opacity-60 text-sm sm:text-base">
              {service?.name}
            </p>
            <div className="h-px w-24 bg-black/20 dark:bg-white/20 mt-4" />
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 border border-green-500 bg-green-500/10 text-green-600 dark:text-green-400">
              <span className="font-bold">[SUCCESS]</span> Booking submitted successfully! We&apos;ll contact you soon.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 border border-red-500 bg-red-500/10 text-red-600 dark:text-red-400">
              <span className="font-bold">[ERROR]</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                {'>'} FULL NAME *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                readOnly={!!user}
                className={`w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors ${
                  user ? 'cursor-not-allowed opacity-70' : ''
                }`}
                placeholder="Enter your name"
                disabled={loading}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                  {'>'} EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly={!!user}
                  className={`w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors ${
                    user ? 'cursor-not-allowed opacity-70' : ''
                  }`}
                  placeholder="john@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                  {'>'} PHONE *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                  placeholder="+880 12345 67890"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                {'>'} COMPANY (Optional)
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                placeholder="Your Company Name"
                disabled={loading}
              />
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                {'>'} PROJECT DESCRIPTION *
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
                disabled={loading}
              />
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                  {'>'} BUDGET *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                  disabled={loading}
                >
                  <option value="">Select budget</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option} className="bg-white dark:bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60 tracking-wider">
                  {'>'} TIMELINE *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-4 py-3 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                  disabled={loading}
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option} className="bg-white dark:bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black px-6 py-4 font-bold tracking-wider hover:bg-black/80 dark:hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '[SUBMITTING...]' : '[SUBMIT BOOKING]'}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-4 border border-black dark:border-white text-black dark:text-white font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                disabled={loading}
              >
                [CANCEL]
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
