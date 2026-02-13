import { Link } from "react-router-dom";
import { FaBook, FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-[500px] sm:min-h-[550px] lg:min-h-[650px] bg-cover bg-center bg-no-repeat relative flex items-center" style={{ backgroundImage: "url('/library.jpg')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-2 mb-6">
              <FaBook className="text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">New Arrivals Every Week</span>
            </div>
            
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight">
              Discover Your Next <span className="text-orange-500">Favorite Book</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Explore thousands of books across every genre. From timeless classics to the latest bestsellers, 
              find your perfect read and embark on new adventures.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for books, authors..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
                <FaSearch />
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/books"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-center shadow-lg shadow-orange-500/30 hover:scale-105"
              >
                Explore Collection
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">10K+</p>
              <p className="text-gray-300">Books Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">50+</p>
              <p className="text-gray-300">Categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">5K+</p>
              <p className="text-gray-300">Happy Readers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">24/7</p>
              <p className="text-gray-300">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
