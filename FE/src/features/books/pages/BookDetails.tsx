import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { getBookId } from "../booksSlice";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { book, isLoading, error } = useAppSelector((state) => state.book);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getBookId(Number(id)));
    }
  }, [dispatch, id]);

  //   const handleAddToCart = () =>{
  //     if(book){
  //         dispatch(addToCarth({book,quantity}))
  //     }
  //   };

  const incrementQuantity = () => {
    if (book && quantity < book.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (book && quantity < book.stock) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <button
          onClick={() => navigate("/books")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Books
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!book) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">No book data available</p>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button className="flex items-center text-gray-600 hover:text-gray-90 mb-6 transition-colors">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Books
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* CARD */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* IMAGE */}
          <div className="flex items-center justify-center bg-gray-100 rounded-xl p-4">
            <img
              src="https://placehold.co/400x500"
              alt="Book cover"
              className="max-h-[500px] object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center space-y-6">
            {/* RIGHT CONTENT */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {book?.book_name || "Loading..."}
              </h1>
              <div className="flex items-center space-x-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-gray-500 text-sm ml-2">
                  (4.8) · 156 reviews
                </span>
              </div>

              {/* PRICE */}
              <div className="border-t border-b border-gray-200 py-4">
                <span className="text-4xl font-bold">
                  ${book?.price ? Number(book.price).toFixed(2) : "0.00"}
                </span>
              </div>

              {/* STOCK */}
              <div className="flex items-center space-x-2 mt-5">
                {book && book.stock > 0 ? (
                  <>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-medium">
                      In Stock ({book.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 font-medium">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* QUANTITY SELECT */}
              <div className="flex items-center space-x-4 mt-5">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-medium border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    disabled={book && quantity >= book.stock}
                  >
                    +
                  </button>
                </div>
              </div>

                {/* ADD TO CART */}
               <div className="flex space-x-4 mt-5">
                <button
                  // onClick={handleAddToCart}
                  disabled={!book || book.stock === 0}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold
                    hover:bg-gray-500 transition-colors duration-300 disabled:bg-gray-400 
                    disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* DESCRIPTION */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {book?.description || 
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
