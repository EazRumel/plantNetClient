import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';

const DeleteInventoryModal = ({isOpen,closeModal,handleDelete}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
       <TransitionChild 
       as={Fragment}
       enter="ease-out duration-300"
       enterFrom="opacity-0"
       enterTo="opacity-100"
       leave="ease-in duration-300"
       leaveFrom="opacity-100"
       leaveTo="opacity-0 scale-95"
       >
       <div className="fixed inset-0 bg-black/20 backdrop-blur-lg"/>
   
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
         <DialogPanel className="w-full p-6 max-w-md transform overflow-hidden rounded-2xl bg-white">
        <DialogTitle as="h3"
        className="text-lg mt-3 font-bold text-left leading-6 text-gray-900"
        >
            Are you sure?
        </DialogTitle>
        <p className="text-bold mt-2 text-gray-500">You cannot retrieve the data once it is done !!!!!!</p>
   
   
   {/* Main div for info */}
   
         <div className='mb-2 mx-auto justify-center m-5 ml-5 flex gap-3'>
   
   
            <button className="btn text-green-800 bg-green-300 opacity-40" onClick={handleDelete}>Delete</button>
   
   
            <button className="btn text-red-600 bg-red-200 opacity-40"  onClick={closeModal}>Cancel</button>
   
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