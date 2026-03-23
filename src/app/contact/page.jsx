'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const ContactPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: user?.name || '', email: user?.email || '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (err) {
      alert('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen font-mono">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider">
            {'>'} CONTACT US
          </h1>
          <p className="opacity-60 text-base sm:text-lg">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="border border-black/20 dark:border-white/20 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-wider">
              {'>'} SEND MESSAGE
            </h2>

            {success && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-black/20 dark:border-white/20 text-sm">
                <span className="font-bold">[SUCCESS]</span> Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60">{'>'} NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-sm focus:border-black dark:focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="Your name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60">{'>'} EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-sm focus:border-black dark:focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60">{'>'} SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-sm focus:border-black dark:focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="Project Inquiry"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-2 opacity-60">{'>'} MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-black/20 dark:border-white/20 px-3 sm:px-4 py-2 sm:py-3 text-sm focus:border-black dark:focus:border-white focus:outline-none transition-colors font-mono resize-none"
                  placeholder="Tell us about your project..."
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-2 sm:py-3 px-4 sm:px-6 font-bold text-sm tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '[SENDING...]' : '[SEND_MESSAGE]'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="border border-black/20 dark:border-white/20 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">{'>'} EMAIL</h3>
              <p className="opacity-60 mb-2 text-sm">General Inquiries:</p>
              <a href="mailto:contact@monochromeweb.com" className="hover:opacity-70 transition-opacity text-sm break-all">
                contact@monochromeweb.com
              </a>
              <p className="opacity-60 mt-3 sm:mt-4 mb-2 text-sm">Support:</p>
              <a href="mailto:support@monochromeweb.com" className="hover:opacity-70 transition-opacity text-sm break-all">
                support@monochromeweb.com
              </a>
            </div>

            <div className="border border-black/20 dark:border-white/20 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">{'>'} PHONE</h3>
              <p className="opacity-60 mb-2 text-sm">Main Office:</p>
              <a href="tel:+8801234567890" className="hover:opacity-70 transition-opacity text-sm">+880 12345 67890</a>
              <p className="opacity-60 mt-3 sm:mt-4 mb-2 text-sm">Support Line:</p>
              <a href="tel:+8801234567890" className="hover:opacity-70 transition-opacity text-sm">+880 12345 67890</a>
            </div>

            <div className="border border-black/20 dark:border-white/20 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">{'>'} OFFICE_HOURS</h3>
              <div className="space-y-2 opacity-60 text-sm">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="opacity-100 mt-3">24/7 Support Available</p>
              </div>
            </div>

            <div className="border border-black/20 dark:border-white/20 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">{'>'} LOCATION</h3>
              <p className="opacity-60 text-sm">
                123 Tech Street<br />
                Silicon Valley, CA 94000<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
