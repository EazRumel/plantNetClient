import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { useState, Fragment } from 'react'

import ButTon from '../shared/Button';
import useAuth from '../hooks/useAuth';
import { Notyf } from 'notyf';
import userAxiosSecure from '../hooks/userAxiosSecure';
import { useNavigate } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

const PurchaseModal = ({ plant, closeModal, isOpen, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = userAxiosSecure();
  const { name, quantity, price, category, seller, _id } = plant;

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
      {
        type: 'success',
        background: 'green',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'success',
        },
      },
      {
        type: 'success',
        background: 'green',
        duration: 2000,
        dismissible: true,
      },
    ],
  });

  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  const handleQuantity = (value) => {
    if (value > quantity) {
      setTotalQuantity(quantity);
      return notyf.error("Limit exceeded");
    }

    if (value <= 0) {
      setTotalQuantity(1);
      return notyf.error("Cannot order zero item");
    }

    setTotalQuantity(value);
    setTotalPrice(value * price);

    setPurchaseInfo(prev => {
      return { ...prev, quantity: value, price: value * price };
    });
  };

  const [purchaseInfo, setPurchaseInfo] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },

    plantId: _id,
    quantity: Number(totalQuantity),
    price: totalPrice,
    seller: seller?.email,
    address: " ",
    status: "Pending",
  });

  const handlePurchaseInfo = async () => {
    console.table(purchaseInfo);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        {/* Background overlay */}
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

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-3 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 px-6 py-6 text-white">
                  <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/10" />
                  <div className="absolute -bottom-12 right-20 h-24 w-24 rounded-full bg-white/10" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-green-50">
                        <span className="h-2 w-2 rounded-full bg-lime-300" />
                        TREE PLANET CHECKOUT
                      </div>

                      <DialogTitle
                        as="h3"
                        className="text-2xl font-bold tracking-tight"
                      >
                        Review Your Order
                      </DialogTitle>

                      <p className="mt-2 text-sm leading-6 text-green-50">
                        Just one more step to bring some green into your life.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      aria-label="Close purchase modal"
                      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
                    >
                      <span className="text-xl leading-none">&times;</span>
                    </button>
                  </div>
                </div>

                {/* Main content */}
                <div className="space-y-5 p-5 sm:p-6">

                  {/* Plant information */}
                  <div className="rounded-2xl border border-green-100 bg-green-50/70 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-widest text-green-800">
                        Plant Details
                      </p>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
                        {category}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900">
                      {name}
                    </h4>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs font-medium text-gray-500">
                          Price per plant
                        </p>
                        <p className="mt-1 text-lg font-bold text-green-800">
                          ৳{price}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs font-medium text-gray-500">
                          Available stock
                        </p>
                        <p className="mt-1 text-lg font-bold text-gray-800">
                          {quantity} plants
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer information */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Customer Information
                    </p>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                        <span className="text-lg font-bold">
                          {user?.displayName?.charAt(0)?.toUpperCase() || 'C'}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.displayName}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>

                      <span className="ml-auto rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        Customer
                      </span>
                    </div>
                  </div>

                  {/* Quantity field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Order Quantity
                    </label>

                    <input
                      value={totalQuantity}
                      onChange={(e) => handleQuantity(Number(e.target.value))}
                      type="number"
                      name="quantity"
                      id="quantity"
                      placeholder="Enter quantity"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                    <p className="text-xs text-gray-500">
                      Choose how many plants you would like to purchase.
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
                      onChange={(e) =>
                        setPurchaseInfo(prev => {
                          return { ...prev, address: e.target.value };
                        })
                      }
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter your full delivery address"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                  </div>

                  {/* Order summary */}
                  <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Price per plant</span>
                      <span>৳{price}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                      <span>Quantity</span>
                      <span>{totalQuantity}</span>
                    </div>

                    <div className="my-3 border-t border-dashed border-green-200" />

                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-gray-800">
                        Total Amount
                      </span>

                      <span className="text-2xl font-extrabold tracking-tight text-green-800">
                        ৳{totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Stripe checkout */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4">
                    <div className="mb-3">
                      <p className="font-semibold text-gray-800">
                        Secure Payment
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Complete your payment below to place your order.
                      </p>
                    </div>

                    <Elements stripe={stripePromise}>
                      <CheckOutForm
                        purchaseInfo={purchaseInfo}
                        closeModal={closeModal}
                        totalQuantity={totalQuantity}
                        refetch={refetch}
                      />
                    </Elements>
                  </div>

                  {/* Footer */}
                  <p className="text-center text-xs leading-5 text-gray-400">
                    Thank you for choosing Tree Planet. Let's grow greener together.
                  </p>

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;