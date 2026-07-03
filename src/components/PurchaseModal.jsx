
import { Button, Dialog, DialogPanel, DialogTitle ,Transition ,TransitionChild } from '@headlessui/react'
import { useState } from 'react'

import {Fragment }from "react";
import { Label } from 'flowbite-react';
import ButTon from '../shared/Button';



const PurchaseModal = ({closeModal,isOpen}) => {


  // let [isOpen, setIsOpen] = useState(false);

  
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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"/>

 </TransitionChild>

  <div className="fixed inset-0 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4 text-center">
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
           Review Info Before Purchase
     </DialogTitle>
{/* Main div for info */}

       <div className="mt-2">
      <p className="text-sm text-gray-800">Plant: Money Plant</p>
     </div>
       <div className="mt-2">
      <p className="text-sm text-gray-800">Plant: Money Plant</p>
     </div>
       <div className="mt-2">
      <p className="text-sm text-gray-800">Plant: Money Plant</p>
     </div>
       <div className="mt-2">
      <p className="text-sm text-gray-800">Plant: Money Plant</p>
     </div>

      <div className='mb-2'>
         <ButTon label="Purchase"/>
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