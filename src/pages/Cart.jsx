import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookmarkX,
  ShoppingBag,
  ArrowRight,
  Leaf,
  ShoppingBasket,
  Trash2,
  Sprout,
} from "lucide-react";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
import userAxiosSecure from "../hooks/userAxiosSecure";
import { Notyf } from "notyf";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = userAxiosSecure();
  const [deletingId, setDeletingId] = useState(null);

  const notyf = useMemo(
    () =>
      new Notyf({
        duration: 2500,
        position: {
          x: "right",
          y: "top",
        },
        types: [
          {
            type: "success",
            background: "#15803d",
            icon: false,
          },
          {
            type: "error",
            background: "#dc2626",
            icon: false,
          },
        ],
      }),
    []
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const handleDelete = async (id) => {
    const deletedItem = cart.find((item) => item._id === id);

    const result = await Swal.fire({
      title: "Remove this plant?",
      text: `${deletedItem?.name || "This plant"} will be removed from your cart.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Keep it",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);

      const response = await axiosSecure.delete(`/carts/${id}`);

      if (response.data.deletedCount > 0) {
        notyf.success(`${deletedItem?.name || "Plant"} removed from cart`);
        await refetch();
      } else {
        notyf.error("This item could not be removed.");
      }
    } catch (error) {
      console.error("Cart deletion error:", error);
      notyf.error("Failed to remove the plant.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/70 via-white to-white pb-16 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
            <Leaf size={16} />
            Your Green Collection
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Your Shopping <span className="text-green-700">Cart</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Your favorite plants are waiting for a new home. Review your
            selection and get ready to bring some greenery into your life.
          </p>
        </div>

        {/* Cart Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800">
              <ShoppingBasket size={26} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Items in your cart
              </p>
              <h2 className="mt-1 text-3xl font-extrabold text-gray-900">
                {cart.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-100 text-green-800">
              <ShoppingBag size={26} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total cart value
              </p>
              <h2 className="mt-1 text-3xl font-extrabold text-green-800">
                {totalPrice.toLocaleString("en-BD")}$
              </h2>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="rounded-3xl border border-green-100 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-700">
              <Sprout size={46} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your cart is waiting to grow!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              You haven't added any plants yet. Explore our collection and
              find the perfect green companion for your space.
            </p>

            <Link
              to="/plants"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-800/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl"
            >
              <Leaf size={18} />
              Explore Plants
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
            {/* Table Header */}
            <div className="flex flex-col gap-2 border-b border-green-100 bg-green-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Selected Plants
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review the plants in your collection.
                </p>
              </div>

              <span className="w-fit rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-green-800 ring-1 ring-green-100">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-white text-xs uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-5 font-semibold">#</th>
                    <th className="px-6 py-5 font-semibold">Plant</th>
                    <th className="px-6 py-5 font-semibold">Category</th>
                    <th className="px-6 py-5 font-semibold">Price</th>
                    <th className="px-6 py-5 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {cart.map((item, index) => (
                    <tr
                      key={item._id}
                      className="group transition-colors duration-200 hover:bg-green-50/50"
                    >
                      <td className="px-6 py-5 text-sm font-medium text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Plant Preview */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-green-100 bg-green-50">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>

                          <div>
                            <p className="font-bold text-gray-900 transition-colors group-hover:text-green-800">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Plant ID: {item.cartId}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800 ring-1 ring-green-100">
                          <Leaf size={13} />
                          {item.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-900">
                          {Number(item.price).toLocaleString("en-BD")}$
                        </span>
                      </td>

                      {/* Delete */}
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          aria-label={`Remove ${item.name} from cart`}
                          title="Remove from cart"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-white text-red-500 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === item._id ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                          ) : (
                            <BookmarkX size={19} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Footer */}
            <div className="flex flex-col gap-5 border-t border-green-100 bg-gray-50/70 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <Link
                to="/plants"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-green-800 transition-colors hover:text-green-600"
              >
                <ArrowRight
                  size={17}
                  className="rotate-180 transition-transform group-hover:-translate-x-1"
                />
                Continue Shopping
              </Link>

              <div className="flex items-center justify-between gap-8 sm:justify-end">
                <div>
                  <p className="text-sm text-gray-500">Total price</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {cart.length} {cart.length === 1 ? "plant" : "plants"}{" "}
                    selected
                  </p>
                </div>

                <p className="text-2xl font-extrabold tracking-tight text-green-800 sm:text-3xl">
                  ৳{totalPrice.toLocaleString("en-BD")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;