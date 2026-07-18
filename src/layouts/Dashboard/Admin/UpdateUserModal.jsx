import { Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition, TransitionChild } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import clsx from 'clsx'
import { Fragment } from "react";
import { useState } from "react";


const UpdateUserModal = ({isOpen,setIsOpen}) => {

  const handleIsOpen=()=>{
    setIsOpen(false)
  }
  const roles = ["customer","seller","admin"];


  const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]
  const [selected, setSelected] = useState(people[1])
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
    
           <div className="mx-auto h-screen w-full  pt-20">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className="relative w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left text-black"
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
         className="relative w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left text-black"
        >
          {people.map((person) => (
            <ListboxOption
              key={person.name}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
             <div className="text-gray-900">

  {person.name}

</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
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