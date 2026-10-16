import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  Sprout,
  ShoppingBag,
  Package,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PurchaseModal from "./PurchaseModal";

const PlantCardDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const {
    data: plant,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/plants/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Growing your plant details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !plant) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <Sprout size={48} className="text-green-500" />

        <h2 className="mt-5 text-2xl font-semibold text-gray-800">
          Plant not found
        </h2>

        <p className="mt-2 text-gray-500">
          We couldn't find this plant. It may have been removed or is no longer
          available.
        </p>

        <Link
          to="/plants"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <ArrowLeft size={17} />
          Browse Plants
        </Link>
      </div>
    );
  }

  const outOfStock = Number(plant.quantity) <= 0;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link
          to="/"
          className="transition-colors hover:text-green-700"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          to="/plants"
          className="transition-colors hover:text-green-700"
        >
          Plants
        </Link>

        <span>/</span>

        <span className="font-medium text-green-700">
          {plant.name}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="grid overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm lg:grid-cols-2">
        {/* Plant Image */}
        <div className="relative min-h-[350px] overflow-hidden bg-green-50 sm:min-h-[500px] lg:min-h-[650px]">
          <img
            src={plant.image}
            alt={plant.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

          {/* Featured Label */}
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-sm font-medium text-green-700 shadow-sm backdrop-blur-md">
            <Leaf size={16} />
            {plant.isFeatured ? "Featured Plant" : "Nature's Collection"}
          </div>

          {/* Image Bottom Label */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-200">
              Bring Nature Home
            </p>

            <h2 className="mt-2 text-3xl font-semibold drop-shadow-lg sm:text-4xl">
              {plant.name}
            </h2>
          </div>
        </div>

        {/* Plant Information */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          {/* Category and Difficulty */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
              {plant.category}
            </span>

            {plant.difficulty && (
              <span className="rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600">
                {plant.difficulty} Care
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-800 sm:text-4xl lg:text-5xl">
            {plant.name}
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            {plant.description ||
              "Bring a touch of nature into your space with this beautiful plant."}
          </p>

          {/* Price */}
          <div className="mt-8 rounded-2xl border border-green-100 bg-green-50/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green-700">
              Our Price
            </p>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-green-800">
                ৳{plant.price}
              </span>

              <span className="text-sm text-gray-500">
                BDT
              </span>
            </div>
          </div>

          {/* Stock Information */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                outOfStock
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {outOfStock ? (
                <AlertCircle size={21} />
              ) : (
                <Package size={21} />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {outOfStock ? "Currently unavailable" : "Available in stock"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {outOfStock
                  ? "Please check back later."
                  : `${plant.quantity} plants available`}
              </p>
            </div>

            {!outOfStock && (
              <CheckCircle2
                size={20}
                className="ml-auto text-green-600"
              />
            )}
          </div>

          {/* Purchase Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={outOfStock}
            className={`group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border px-6 py-4 text-sm font-semibold transition-all duration-300 ${
              outOfStock
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-green-600 bg-green-600 text-white shadow-lg shadow-green-700/15 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
            }`}
          >
            <ShoppingBag size={19} />

            <span>
              {outOfStock ? "Out of Stock" : "Purchase This Plant"}
            </span>

            {!outOfStock && (
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>

          {/* Logged-in User */}
          {user && (
            <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-6">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-green-100"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Sprout size={20} />
                </div>
              )}

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Purchasing as
                </p>

                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.displayName || user.email}
                </p>
              </div>
            </div>
          )}

          {/* Continue Browsing */}
          <Link
            to="/plants"
            className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-green-700"
          >
            <ArrowLeft size={16} />
            Continue browsing plants
          </Link>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        refetch={refetch}
        plant={plant}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </section>
  );
};

export default PlantCardDetails;