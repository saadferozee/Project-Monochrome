import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10">
        <Header />

        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border border-white/40 bg-black/50 backdrop-blur-sm p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-wider">
                {'>'} PRIVACY POLICY
              </h1>

              <div className="space-y-8 text-zinc-400">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">1. INFORMATION WE COLLECT</h2>
                  <p className="leading-relaxed mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Project details and requirements</li>
                    <li>Payment information</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">2. HOW WE USE YOUR INFORMATION</h2>
                  <p className="leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">3. INFORMATION SHARING</h2>
                  <p className="leading-relaxed">
                    We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, such as payment processing and data analysis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">4. DATA SECURITY</h2>
                  <p className="leading-relaxed">
                    We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">5. COOKIES</h2>
                  <p className="leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">6. YOUR RIGHTS</h2>
                  <p className="leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Request transfer of your information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">7. CHANGES TO THIS POLICY</h2>
                  <p className="leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">8. CONTACT US</h2>
                  <p className="leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mt-4 text-white">
                    Email: privacy@monochromeweb.com
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

export default PrivacyPage;
