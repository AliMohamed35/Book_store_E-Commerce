import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser } from "../features/auth/authSlice";
import { TOKEN_KEY } from "../utils/constants";
import { MdEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBook, FaShoppingBag, FaTrash } from "react-icons/fa";
import type { Order } from "../features/orders/types";
import { deleteOrder, getMyOrders } from "../features/orders/ordersSlice";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem(TOKEN_KEY);

  const { user } = useAppSelector((state) => state.auth);
  const { orders, error, isLoading } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<{ id: number }>(token);
      dispatch(getUser(decoded.id));
      dispatch(getMyOrders());
    }
  }, [dispatch, token]);

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      toast.success("Order deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.error(error || "Failed to delete order", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "ON_THE_WAY":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "ON_THE_WAY":
        return "On The Way";
      case "DELIVERED":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <section className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src="https://placehold.co/150x150"
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-orange-500 shadow-lg object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                {user?.name || "Username"}
              </h1>
              <div className="space-y-3">
                <p className="flex items-center justify-center sm:justify-start gap-3 text-gray-600">
                  <MdEmail className="text-orange-500 text-xl" />
                  <span>{user?.email || "email@example.com"}</span>
                </p>
                <p className="flex items-center justify-center sm:justify-start gap-3 text-gray-600">
                  <FaRegAddressCard className="text-orange-500 text-xl" />
                  <span>{user?.address || "No address provided"}</span>
                </p>
                <p className="flex items-center justify-center sm:justify-start gap-3 text-gray-600">
                  <FaPhoneAlt className="text-orange-500 text-xl" />
                  <span>{user?.phone_number || "No phone number"}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaShoppingBag className="text-orange-500 text-2xl" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Orders
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-xl">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : orders?.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No orders yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Start shopping to see your orders here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {orders?.map((o: Order) => (
                <div
                  key={o.id}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">
                        Order #{o.id}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(o.status)}`}
                      >
                        {getStatusText(o.status)}
                      </span>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-4 space-y-3">
                    {/* Book Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaBook className="text-orange-500 text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {o.book?.book_name || `Book ID: ${o.book_id}`}
                        </h3>
                        {o.book?.description && (
                          <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                            {o.book.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-400 uppercase">Qty</p>
                          <p className="font-bold text-gray-800">
                            {o.quantity}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 uppercase">
                            Total
                          </p>
                          <p className="font-bold text-orange-600">
                            ${o.price_at_purchase}
                          </p>
                        </div>
                      </div>
                      <button
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Remove order"
                        onClick={() => handleDeleteOrder(o.id!)}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Summary */}
          {orders && orders.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600">
                  Total Orders:{" "}
                  <span className="font-bold text-gray-800">
                    {orders.length}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Total:{" "}
                  <span className="text-orange-600">
                    $
                    {orders
                      .reduce((sum, o) => sum + o.price_at_purchase, 0)
                      .toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
