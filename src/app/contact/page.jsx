'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
              {'>'} CONTACT US
            </h1>
            <p className="text-zinc-500 text-base sm:text-lg">
              Get in touch with our team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 tracking-wider break-words">
                {'>'} SEND MESSAGE
              </h2>

              {success && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-green-500 bg-green-500/10 text-green-500 text-sm sm:text-base">
                  <span className="font-bold">[SUCCESS]</span> Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                    {'>'} NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                    {'>'} EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                    {'>'} SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono"
                    placeholder="Project Inquiry"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm mb-2 text-zinc-400">
                    {'>'} MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-black border border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-white focus:outline-none transition-colors font-mono resize-none"
                    placeholder="Tell us about your project..."
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-2 sm:py-3 px-4 sm:px-6 font-bold text-sm sm:text-base tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '[SENDING...]' : '[SEND_MESSAGE]'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">
                  {'>'} EMAIL
                </h3>
                <p className="text-zinc-400 mb-2 text-sm sm:text-base">General Inquiries:</p>
                <a href="mailto:contact@monochromeweb.com" className="text-white hover:text-zinc-300 transition-colors text-sm sm:text-base break-all">
                  contact@monochromeweb.com
                </a>
                <p className="text-zinc-400 mt-3 sm:mt-4 mb-2 text-sm sm:text-base">Support:</p>
                <a href="mailto:support@monochromeweb.com" className="text-white hover:text-zinc-300 transition-colors text-sm sm:text-base break-all">
                  support@monochromeweb.com
                </a>
              </div>

              <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">
                  {'>'} PHONE
                </h3>
                <p className="text-zinc-400 mb-2 text-sm sm:text-base">Main Office:</p>
                <a href="tel:+8801234567890" className="text-white hover:text-zinc-300 transition-colors text-sm sm:text-base">
                  +880 12345 67890
                </a>
                <p className="text-zinc-400 mt-3 sm:mt-4 mb-2 text-sm sm:text-base">Support Line:</p>
                <a href="tel:+8801234567890" className="text-white hover:text-zinc-300 transition-colors text-sm sm:text-base">
                  +880 12345 67890
                </a>
              </div>

              <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">
                  {'>'} OFFICE_HOURS
                </h3>
                <div className="space-y-2 text-zinc-400 text-sm sm:text-base">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-white mt-3 sm:mt-4">24/7 Support Available</p>
                </div>
              </div>

              <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">
                  {'>'} LOCATION
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base">
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
    </div>
  );
};

export default ContactPage;
