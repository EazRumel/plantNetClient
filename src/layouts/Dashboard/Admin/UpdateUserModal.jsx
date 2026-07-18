import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition, TransitionChild } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import clsx from 'clsx'
import { Fragment } from "react";
import { useState } from "react";


const UpdateUserModal = ({isOpen,setIsOpen,role,handleUpdateRole}) => {

  const handleIsOpen=()=>{
    setIsOpen(false)
  }
  const roles = ["customer","seller","admin"];


//   const people = [
//   { id: 1, name: 'Tom Cook' },
//   { id: 2, name: 'Wade Cooper' },
//   { id: 3, name: 'Tanya Fox' },
//   { id: 4, name: 'Arlene Mccoy' },
//   { id: 5, name: 'Devon Webb' },
// ]
  const [selected, setSelected] = useState(role)

  // console.log(selected)
  console.log(typeof role);
  console.log(role)
  return (
     <Transition appear show={isOpen} as={Fragment}>
       <Dialog as="div" className="relative z-10" onClose={handleIsOpen}>
        <TransitionChild 
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 scale-95"
        >
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"/>
    
     </TransitionChild>
    
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-left">
        <TransitionChild
         as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 scale-95"
        >
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white">
         <DialogTitle as="h3"
         className="text-lg mt-3 font-medium text-center leading-6 text-gray-900"
         >
               Please read all the terms and conditions before becoming a seller
         </DialogTitle>
    
    
    {/* Main div for info */}
    
           <div className="mx-auto w-full p-2  pt-20">
    <Listbox value={selected} onChange={setSelected}>

  <ListboxButton className="cursor-pointer relative w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left">

    {selected}

    <ChevronDownIcon className="absolute right-3 top-2.5 size-4" />

  </ListboxButton>

  <ListboxOptions anchor="bottom" className="mt-1 w-32 rounded-lg border bg-white shadow-lg">

    {roles.map((role) => (

      <ListboxOption

        key={role}

        value={role}

        className="cursor-pointer px-3 py-2 data-focus:bg-gray-100"

      >

        {role}

      </ListboxOption>

    ))}

  </ListboxOptions>

</Listbox>
 <div className="mt-6 flex mx-auto  justify-center m-4 gap-3">

    <button

      onClick={handleIsOpen}

      className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"

    >

      Cancel

    </button>

    <button

     onClick={()=>handleUpdateRole(selected)}

      className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"

    >

      Update

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