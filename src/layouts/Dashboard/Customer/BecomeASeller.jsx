import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { CheckCircle2, Store, X } from "lucide-react";
import PropTypes from "prop-types";

const BecomeASeller = ({ closeModal, isOpen, handleRequest }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Background */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="cursor-pointer absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-red-500"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="px-6 pt-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <Store className="text-green-600" size={28} />
                  </div>

                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  >
                    Become a Seller
                  </DialogTitle>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Please review the seller requirements before sending your
                    request.
                  </p>
                </div>

                {/* Terms */}
                <div className="mx-6 mt-6 rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-3 font-semibold text-gray-800">
                    Seller Requirements
                  </h4>

                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <span>
                        Provide accurate information about your plants and
                        products.
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <span>
                        Keep product prices and available quantities updated.
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <span>
                        Process customer orders responsibly and on time.
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <span>
                        Follow the platform's rules and maintain good service.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 px-6 py-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleRequest}
                    className="btn flex-1 border-none bg-green-600 text-white hover:bg-green-700"
                  >
                    Send Request
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

BecomeASeller.propTypes = {
  handleRequest: PropTypes.func,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
};

export default BecomeASeller;