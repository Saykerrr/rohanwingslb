function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function InstagramSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Instagram className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
          Follow Us
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase mb-4">
          @RohanWingsLebanon
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Join our community of riders. Share your adventures, get tips & exclusive deals.
        </p>
        <a
          href="https://instagram.com/rohanwingslebanon"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-red-600/30"
        >
          <Instagram className="w-5 h-5" />
          Follow on Instagram
        </a>

        {/* Placeholder grid */}
        <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Instagram className="w-8 h-8 text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
