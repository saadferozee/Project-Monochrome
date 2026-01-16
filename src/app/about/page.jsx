'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          {/* Hero Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wider break-words">
              {'>'} ABOUT US
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
              We are a team of passionate developers, designers, and security experts dedicated to building the future of web technology.
            </p>
          </div>

          {/* Why We're Different */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 tracking-wider break-words">
              {'>'} WHY WE ARE DIFFERENT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[01]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">FUTURISTIC_APPROACH</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  We don't just follow trends—we create them. Our minimalist, terminal-inspired design philosophy sets us apart in a world of cluttered interfaces.
                </p>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[02]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">SECURITY_FIRST</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Every line of code is written with security in mind. We conduct thorough audits and penetration testing to ensure your data stays protected.
                </p>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[03]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">PERFORMANCE_OBSESSED</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Speed matters. We optimize every pixel and every byte to deliver lightning-fast experiences that keep your users engaged.
                </p>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[04]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">24/7_SUPPORT</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  We're always here when you need us. Our dedicated support team works around the clock to ensure your success.
                </p>
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <div className="border border-white bg-black/50 p-6 sm:p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-wider break-words">
                {'>'} OUR MISSION
              </h2>
              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-4 sm:mb-6">
                To empower businesses with cutting-edge web solutions that combine minimalist design, maximum security, and unparalleled performance.
              </p>
              <p className="text-base sm:text-lg text-zinc-500 leading-relaxed">
                We believe in the power of simplicity. In a world of complexity, we strip away the unnecessary to reveal what truly matters—clean code, fast performance, and exceptional user experiences.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 tracking-wider break-words">
              {'>'} OUR VALUES
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="border border-white bg-black/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <span className="text-3xl sm:text-4xl">[✓]</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">TRANSPARENCY</h3>
                  <p className="text-zinc-400 text-sm sm:text-base">
                    We believe in open communication. No hidden fees, no surprises—just honest, straightforward service.
                  </p>
                </div>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <span className="text-3xl sm:text-4xl">[✓]</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">INNOVATION</h3>
                  <p className="text-zinc-400 text-sm sm:text-base">
                    We constantly push boundaries, exploring new technologies and methodologies to deliver cutting-edge solutions.
                  </p>
                </div>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <span className="text-3xl sm:text-4xl">[✓]</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">EXCELLENCE</h3>
                  <p className="text-zinc-400 text-sm sm:text-base">
                    Good enough isn't good enough. We strive for perfection in every project, no matter the size.
                  </p>
                </div>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <span className="text-3xl sm:text-4xl">[✓]</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">COLLABORATION</h3>
                  <p className="text-zinc-400 text-sm sm:text-base">
                    Your success is our success. We work closely with you every step of the way to ensure your vision becomes reality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Stats */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 tracking-wider break-words">
              {'>'} BY THE NUMBERS
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="border border-white bg-black/50 p-6 sm:p-8 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">15+</div>
                <div className="text-zinc-500 text-xs sm:text-sm">TEAM_MEMBERS</div>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">150+</div>
                <div className="text-zinc-500 text-xs sm:text-sm">PROJECTS</div>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">200+</div>
                <div className="text-zinc-500 text-xs sm:text-sm">CLIENTS</div>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">5+</div>
                <div className="text-zinc-500 text-xs sm:text-sm">YEARS</div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border border-white bg-black/50 p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-wider break-words">
              {'>'} READY TO WORK TOGETHER?
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's build something amazing. Get in touch with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wider hover:bg-zinc-200 transition-colors"
              >
                [CONTACT_US]
              </a>
              <a
                href="/services"
                className="inline-block border border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                [VIEW_SERVICES]
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
