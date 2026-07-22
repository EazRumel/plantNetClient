import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import ButTon from '../../../shared/Button';
import useAuth from '../../../hooks/useAuth';
import userAxiosSecure from '../../../hooks/userAxiosSecure';
import PropTypes from "prop-types";

const BecomeASeller = ({closeModal,isOpen,handleRequest}) => {
 

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

      <div className='mb-2 mx-auto justify-center m-5 ml-5 flex gap-3'>


         <button className="btn text-green-800 bg-green-300 opacity-40" onClick={handleRequest}>Send Request</button>


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

BecomeASeller.propTypes= {
  handleRequest:PropTypes.func,
  closeModal:PropTypes.func,
  isOpen:PropTypes.bool.isRequired
}

export default BecomeASeller;