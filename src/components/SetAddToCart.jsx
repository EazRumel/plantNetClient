import { Fragment, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

const SetAddToCart = ({
  isOpen,
  setIsOpen,
  closeModal,
  plant,
}) => {
  const { user } = useAuth();

  const {
    name,
    category,
    price,
    quantity: availableStock,
    image,
    _id,
  } = plant;
  console.log("Plant is: ",plant);

  const [totalQuantity, setTotalQuantity] = useState(1);
  const [purchaseInfo, setPurchaseInfo] = useState({
    address: "",
  });

  // Reset the quantity and address when opening the modal
  useEffect(() => {
    if (isOpen) {
      setTotalQuantity(1);
      setPurchaseInfo({ address: "" });
    }
  }, [isOpen, _id]);

  const stock = Math.max(0, Number(availableStock) || 0);
  const unitPrice = Number(price) || 0;

  // Calculate total price dynamically
  const totalPrice = unitPrice * totalQuantity;

  // Increase quantity
  const increaseQuantity = () => {
    setTotalQuantity((previous) =>
      Math.min(previous + 1, stock)
    );
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setTotalQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  // Handle manual input
  const handleQuantity = (value) => {
    if (value === "") {
      setTotalQuantity("");
      return;
    }

    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return;

    setTotalQuantity(
      Math.min(
        stock,
        Math.max(1, Math.floor(parsedValue))
      )
    );
  };

  // Prevent invalid quantity when submitting
  const validQuantity =
    Number.isInteger(totalQuantity) &&
    totalQuantity >= 1 &&
    totalQuantity <= stock;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-4 scale-95 opacity-0"
              enterTo="translate-y-0 scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0 scale-100 opacity-100"
              leaveTo="translate-y-3 scale-95 opacity-0"
            >
              <DialogPanel className="w-full max-w-md overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl">

                {/* Header */}
                <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 px-6 py-6 text-white">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-3 text-xs font-semibold tracking-widest text-green-100">
                        TREE PLANET
                      </p>

                      <DialogTitle className="text-2xl font-bold">
                        Add to Your Cart
                      </DialogTitle>

                      <p className="mt-2 text-sm text-green-50">
                        Choose how many plants you'd like.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      aria-label="Close modal"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xl transition hover:bg-white/20"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-5 p-5 sm:p-6">

                  {/* Plant details */}
                  <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50/70 p-4">
                    <img
                      src={image}
                      alt={name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900">
                        {name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {category}
                      </p>

                      <p className="mt-2 font-bold text-green-800">
                        ৳{unitPrice.toLocaleString("en-BD")}
                        <span className="text-xs font-normal text-gray-500">
                          {" "}/ plant
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Available stock */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Available stock
                    </span>

                    <span className="font-semibold text-green-800">
                      {stock} plants
                    </span>
                  </div>

                  {/* Quantity selector */}
                  <div className="space-y-3">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      How many plants do you want?
                    </label>

                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-green-100 bg-white p-3">

                      {/* Decrease button */}
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={
                          !validQuantity || totalQuantity <= 1
                        }
                        aria-label="Decrease quantity"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-green-50 text-green-800 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={18} />
                      </button>

                      {/* Quantity input */}
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        max={stock}
                        step="1"
                        value={totalQuantity}
                        onChange={(event) =>
                          handleQuantity(event.target.value)
                        }
                        aria-label="Plant quantity"
                        className="w-full min-w-0 bg-transparent text-center text-2xl font-bold text-gray-900 outline-none"
                      />

                      {/* Increase button */}
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={
                          !validQuantity || totalQuantity >= stock
                        }
                        aria-label="Increase quantity"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <p className="text-xs text-gray-500">
                      {stock === 0
                        ? "This plant is currently out of stock."
                        : `You can select between 1 and ${stock} plants.`}
                    </p>
                  </div>

                  {/* Shipping address */}
                  <div className="space-y-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Shipping Address
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={purchaseInfo.address}
                      onChange={(event) =>
                        setPurchaseInfo((previous) => ({
                          ...previous,
                          address: event.target.value,
                        }))
                      }
                      placeholder="Enter your delivery address"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                  </div>

                  {/* Order summary */}
                  <div className="space-y-3 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Price per plant</span>
                      <span>
                        ${unitPrice.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Quantity</span>
                      <span>{totalQuantity || 0}</span>
                    </div>

                    <div className="border-t border-dashed border-green-200" />

                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-gray-800">
                        Total Amount
                      </span>

                      <span className="text-2xl font-extrabold text-green-800">
                        ৳{(
                          unitPrice *
                          (Number(totalQuantity) || 0)
                        ).toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>

                  {/* Add to cart action */}
                  <button
                    type="button"
                    disabled={!validQuantity || stock === 0}
                    onClick={() => {
                      const cartItem = {
                        cartId: _id,
                        name,
                        category,
                        image,
                        price: unitPrice,
                        quantity: totalQuantity,
                        email: user?.email,
                        address: purchaseInfo.address,
                      };

                      console.log("Cart item:", cartItem);

                      // Connect your POST /carts API here.
                    }}
                    className="w-full rounded-xl bg-green-700 px-5 py-3.5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add {totalQuantity || 0}{" "}
                    {Number(totalQuantity) === 1 ? "Plant" : "Plants"} to Cart
                  </button>

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SetAddToCart;