import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { ChevronDown, Check } from "lucide-react";
import { Fragment, useState } from "react";

const UpdateUserModal = ({
  isOpen,
  setIsOpen,
  role,
  handleUpdateRole,
}) => {

  const roles = ["customer", "seller", "admin"];

  const [selected, setSelected] = useState(role);

  const handleClose = () => {
    setIsOpen(false);
  };


  return (
    <Transition appear show={isOpen} as={Fragment}>

      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
      >

        {/* Background */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
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
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >

              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl">

                {/* Header */}
                <div className="border-b border-gray-100 px-6 py-5">

                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-gray-800"
                  >
                    Update User Role
                  </DialogTitle>

                  <p className="mt-1 text-sm text-gray-500">
                    Select a new role for this user.
                  </p>

                </div>


                {/* Content */}
                <div className="px-6 py-6">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    User Role
                  </label>


                  {/* Role selector */}
                  <Listbox
                    value={selected}
                    onChange={setSelected}
                  >

                    <div className="relative">

                      <ListboxButton
                        className="
                          relative w-full cursor-pointer
                          rounded-lg
                          border border-gray-300
                          bg-white
                          px-4 py-3
                          text-left
                          text-sm
                          text-gray-700
                          shadow-sm
                          outline-none
                          transition
                          hover:border-green-400
                          focus:border-green-500
                          focus:ring-2
                          focus:ring-green-100
                        "
                      >

                        <span className="capitalize">
                          {selected}
                        </span>

                        <ChevronDown
                          size={18}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                      </ListboxButton>


                      <ListboxOptions
                        anchor="bottom"
                        className="
                          z-50
                          mt-2
                          w-[var(--button-width)]
                          overflow-hidden
                          rounded-lg
                          border border-gray-200
                          bg-white
                          shadow-lg
                          focus:outline-none
                        "
                      >

 {roles.map((item) => (

 <ListboxOption key={item} value={item} className="group
                              flex
                              cursor-pointer
                              items-center
                              justify-between px-4
                              py-3 text-sm text-gray-700 capitalize data-focus:bg-green-50
  data-focus:text-green-600">
 <span>{item}</span>

<Check
size={17}
className="invisible text-green-500 group-data-selected:visible"
                            />

                          </ListboxOption>

                        ))}

                      </ListboxOptions>

                    </div>

                  </Listbox>


                  {/* Buttons */}
                  <div className="mt-7 flex justify-end gap-3">

                    <button
                      onClick={handleClose}
                      className="
                        cursor-pointer
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-50
                      "
                    >
                      Cancel
                    </button>


                    <button
                      onClick={() => handleUpdateRole(selected)}
                      className="
                        cursor-pointer
                        rounded-lg
                        bg-green-500
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-green-600
                        hover:shadow
                      "
                    >
                      Update Role
                    </button>

                  </div>

                </div>

              </DialogPanel>

            </TransitionChild>

          </div>

        </div>

      </Dialog>

    </Transition>
  );
};

export default UpdateUserModal;