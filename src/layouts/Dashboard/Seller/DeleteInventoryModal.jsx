import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { AlertTriangle, Trash2, X, Leaf } from "lucide-react";

const DeleteInventoryModal = ({
  isOpen,
  closeModal,
  handleDelete,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-3 scale-95"
            >
              <DialogPanel className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-950/15">
                {/* Top Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-green-600 via-lime-500 to-green-700" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close confirmation dialog"
                  className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <X size={18} />
                </button>

                <div className="px-6 pb-7 pt-8 sm:px-8">
                  {/* Warning Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-8 ring-red-50/50">
                      <AlertTriangle
                        size={30}
                        strokeWidth={1.8}
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="text-center">
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                      Delete this plant?
                    </DialogTitle>

                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
                      Are you sure you want to remove this plant from your
                      inventory? This action cannot be undone.
                    </p>
                  </div>

                  {/* Warning Message */}
                  <div className="mt-6 flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <Leaf
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-700"
                    />

                    <p className="text-xs leading-5 text-amber-900">
                      Please double-check before continuing. Once deleted,
                      this plant will no longer appear in your inventory.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition hover:bg-red-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-red-500/20"
                    >
                      <Trash2 size={17} />
                      Delete Plant
                    </button>
                  </div>

                  {/* Footer */}
                  <p className="mt-5 text-center text-xs text-gray-400">
                    Tree Planet · Inventory Management
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

export default DeleteInventoryModal;