import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAllBooks } from "../booksSlice";
import { addOrder } from "../../orders/ordersSlice";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

const BooksPage = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector((state) => state.book);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (!searchQuery.trim()) return books;
    
    const query = searchQuery.toLowerCase().trim();
    return books.filter((book) => 
      book.book_name.toLowerCase().includes(query) ||
      book.description?.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

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

  return (
    <>
      {/* BOOKS */}
      <section className="max-w-7xl mx-auto mt-16 px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Our Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of books across all genres
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by title or description..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 outline-none shadow-sm" 
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-gray-600 mt-3">
              Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} matching "{searchQuery}"
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Book Cover Placeholder */}
                <div className="h-48 bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-6xl">📚</span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {b.book_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {b.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      ${b.price}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${b.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {b.stock > 0 ? `${b.stock} in stock` : "Out of stock"}
                    </span>
                  </div>

                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={b.stock === 0}
                    onClick={() => handleAddToCart(b.id, b.book_name)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No books in database */}
        {books?.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📖</span>
            <p className="text-gray-600 text-lg">
              No books available at the moment
            </p>
          </div>
        )}

        {/* No search results */}
        {filteredBooks.length === 0 && books && books.length > 0 && !isLoading && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-gray-600 text-lg mb-2">
              No books found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default BooksPage;
