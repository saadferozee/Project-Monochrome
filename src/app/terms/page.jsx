import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10">
        <Header />

        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border border-white/40 bg-black/50 backdrop-blur-sm p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-wider">
                {'>'} TERMS OF SERVICE
              </h1>

              <div className="space-y-8 text-zinc-400">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">1. ACCEPTANCE OF TERMS</h2>
                  <p className="leading-relaxed">
                    By accessing and using Monochrome Web Solutions services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">2. USE LICENSE</h2>
                  <p className="leading-relaxed mb-4">
                    Permission is granted to temporarily access the services provided by Monochrome Web Solutions for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="leading-relaxed">
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose</li>
                    <li>Attempt to decompile or reverse engineer any software</li>
                    <li>Remove any copyright or other proprietary notations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">3. DISCLAIMER</h2>
                  <p className="leading-relaxed">
                    The materials on Monochrome Web Solutions are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">4. LIMITATIONS</h2>
                  <p className="leading-relaxed">
                    In no event shall Monochrome Web Solutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">5. ACCURACY OF MATERIALS</h2>
                  <p className="leading-relaxed">
                    The materials appearing on Monochrome Web Solutions could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our platform are accurate, complete, or current.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">6. MODIFICATIONS</h2>
                  <p className="leading-relaxed">
                    Monochrome Web Solutions may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">7. CONTACT</h2>
                  <p className="leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="mt-4 text-white">
                    Email: contact@monochromeweb.com
                  </p>
                </section>

                <div className="pt-8 border-t border-white/20 text-sm">
                  <p>Last updated: January 2026</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TermsPage;
