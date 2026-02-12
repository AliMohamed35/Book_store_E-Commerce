import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllBooks } from "../features/books/booksSlice";
import { addOrder } from "../features/orders/ordersSlice";
import { toast } from "react-toastify";
import { FaFire, FaShoppingCart, FaStar } from "react-icons/fa";

const Deals = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleAddToCart = async (bookId: number, bookName: string) => {
    try {
      await dispatch(addOrder([{ bookId, quantity: 1 }])).unwrap();
      toast.success(`"${bookName}" added to cart!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.error(error || "Failed to add to cart", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Get first 4 books as featured deals
  const featuredBooks = books?.slice(0, 4) || [];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 rounded-full px-4 py-2 mb-4">
            <FaFire className="animate-pulse" />
            <span className="font-semibold text-sm">Limited Time Offer</span>
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800 mb-4">
            Deals of the Week
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our specially curated selection of books at amazing prices. 
            These deals won't last forever!
          </p>
        </div>

        {/* Deals Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
              >
                {/* Deal Badge */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BEST DEAL
                  </div>
                )}
                
                {/* Book Cover */}
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-6xl group-hover:scale-110 transition-transform duration-300">📚</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">(4.8)</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {book.book_name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600">
                        ${book.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${(book.price * 1.3).toFixed(2)}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${book.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {book.stock > 0 ? `${book.stock} left` : "Sold out"}
                    </span>
                  </div>

                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group-hover:scale-105"
                    disabled={book.stock === 0}
                    onClick={() => handleAddToCart(book.id, book.book_name)}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors"
          >
            View All Books
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-2xl sm:text-3xl mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Get the latest updates on new releases, special offers, and exclusive deals delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;
