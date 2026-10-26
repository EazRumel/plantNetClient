import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Leaf,
  ShoppingBag,
  Sprout,
  Check,
} from "lucide-react";
import Swal from "sweetalert2";
import { Notyf } from "notyf";

import useAuth from "../hooks/useAuth";
import userAxiosSecure from "../hooks/userAxiosSecure";
import useCart from "../hooks/useCart";
import SetAddToCart from "./SetAddToCart";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen,setIsOpen] = useState(false);

    const closeModal = ()=>{
      setIsOpen(false);
    }

  const [carts, refetch] = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  const axiosSecure = userAxiosSecure();
  const { user } = useAuth();

  const { name, image, category, difficulty, price, _id } = plant;

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
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
  });

  const handleAddToCart = async (event) => {
    event.preventDefault();

    if (!user?.email) {
      const result = await Swal.fire({
        title: "You're not logged in",
        text: "Please log in to add plants to your cart.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#15803d",
        cancelButtonColor: "#9ca3af",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Maybe Later",
        borderRadius: "16px",
      });

      if (result.isConfirmed) {
        navigate("/login", {
          state: { from: location },
        });
      }

      return;
    }

    



    const cartItem = {
      cartId: _id,
      price,
      name,
      email: user.email,
      image,
      category,
    };

    try {
      setAddingToCart(true);

      const response = await axiosSecure.post("/carts", cartItem);

      if (response.data.insertedId) {
        notyf.success(`${name} added to your cart!`);
        refetch();
      } else {
        notyf.error("Could not add this plant to your cart.");
      }
    } catch (error) {
      notyf.error("Failed to add to cart.");
      console.error("Add to cart error:", error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/10">
      {/* Plant Image */}
      <div className="relative h-64 overflow-hidden bg-green-50 sm:h-72">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-green-800 shadow-sm backdrop-blur-md">
            <Leaf size={13} />
            {category}
          </span>
        </div>

        {/* Plant name badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {name}
          </h2>
        </div>

        {/* Decorative icon */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-green-700 shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:rotate-12">
          <Sprout size={20} />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Difficulty */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gray-400">
              Care Level
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-700">
                <Sprout size={15} />
              </span>
              {difficulty || "Not specified"}
            </p>
          </div>

          <div className="text-right">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gray-400">
              Price
            </p>

            <p className="text-2xl font-extrabold tracking-tight text-green-800">
              {Number(price).toLocaleString("en-BD")} $
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-5 h-px bg-gradient-to-r from-green-100 via-gray-100 to-transparent" />

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          {/* Details Button */}
          <Link
            to={`/plant/${_id}`}
            className="group/details relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl border border-green-700 px-3 py-2.5 text-sm font-semibold text-green-800 transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 origin-top scale-y-0 bg-green-700 transition-transform duration-300 ease-out group-hover/details:scale-y-100" />

            <span className="relative z-10 flex items-center gap-2">
              Details
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5"
              />
            </span>
          </Link>

          {/* Add to Cart Button */}
          <button
            type="button"
            // onClick={handleAddToCart}
            onClick={()=>setIsOpen(true)}
            disabled={addingToCart}
            className="group/cart relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-green-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-green-800 hover:shadow-lg hover:shadow-green-800/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-green-900 transition-transform duration-300 ease-out group-hover/cart:scale-y-100" />

            <span className="relative z-10 flex items-center gap-2">
              {addingToCart ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Adding
                </>
              ) : (
                <>
                  <ShoppingBag
                    size={16}
                    className="transition-transform duration-300 group-hover/cart:-rotate-6"
                  />
                  Add to Cart
                </>
              )}
            </span>
             <SetAddToCart
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        plant={plant}
        ></SetAddToCart>
          </button>
        </div>
       
      </div>
    </article>
  );
};

export default PlantCard;