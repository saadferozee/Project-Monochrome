import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10 text-center max-w-2xl">
        <div className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-12">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />

          <h1 className="text-8xl font-bold mb-4 tracking-wider">
            [404]
          </h1>
          
          <h2 className="text-2xl font-bold mb-4 tracking-wider">
            PAGE_NOT_FOUND
          </h2>
          
          <p className="text-zinc-500 mb-8 text-lg">
            {'>'} The page you are looking for does not exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-zinc-200 transition-colors"
            >
              [RETURN_HOME]
            </Link>
            
            <Link
              href="/services"
              className="inline-block border border-white text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              [VIEW_SERVICES]
            </Link>
          </div>
        </div>

        <p className="mt-8 text-zinc-600 text-sm">
          ERROR_CODE: 404_NOT_FOUND
        </p>
      </div>
    </div>
  );
};

export default NotFound;
