import { Link } from "react-router-dom";
import { FaBook, FaHeart, FaGhost, FaChild, FaGraduationCap, FaMagic, FaHistory, FaAtom } from "react-icons/fa";

const Categories = () => {
  const categories = [
    {
      title: "Text Books",
      description: "Academic & Learning Resources",
      icon: FaGraduationCap,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Thriller",
      description: "Suspense & Mystery",
      icon: FaGhost,
      bgColor: "bg-gradient-to-br from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
    },
    {
      title: "Romance",
      description: "Love & Passion",
      icon: FaHeart,
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
      hoverColor: "hover:from-pink-600 hover:to-pink-700",
    },
    {
      title: "Kids Books",
      description: "Children & Young Adults",
      icon: FaChild,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      title: "Fantasy",
      description: "Magic & Adventure",
      icon: FaMagic,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      title: "History",
      description: "Historical & Biographies",
      icon: FaHistory,
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-500",
      hoverColor: "hover:from-yellow-600 hover:to-orange-600",
    },
    {
      title: "Science",
      description: "Science & Technology",
      icon: FaAtom,
      bgColor: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      hoverColor: "hover:from-cyan-600 hover:to-cyan-700",
    },
    {
      title: "Fiction",
      description: "Classic & Modern Fiction",
      icon: FaBook,
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Browse By Category</span>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800 mt-2 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for with our carefully organized collection of books across various genres.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                to="/books"
                key={index}
                className={`${category.bgColor} ${category.hoverColor} p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                    <IconComponent className="text-white text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
