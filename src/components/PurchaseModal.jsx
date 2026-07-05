
import { Button, Dialog, DialogPanel, DialogTitle ,Transition ,TransitionChild } from '@headlessui/react'
import { useState } from 'react'

import {Fragment }from "react";
import { Label } from 'flowbite-react';
import ButTon from '../shared/Button';
import useAuth from '../hooks/useAuth';
import { Notyf } from 'notyf';



const PurchaseModal = ({plant,closeModal,isOpen}) => {

  const {quantity,price,category} = plant;



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
              text: 'success'
            }
          },
          {
            type: 'success',
            background: 'green',
            duration: 2000,
            dismissible: true
          }
        ]
      });


  const [totalQuantity,setTotalQuantity] = useState(1);


 
  const handleQuantity = (value)=> {
    // value = Number(value);
     if(value > quantity){
      setTotalQuantity(quantity);
      return notyf.error("It exceeds the limit")
    
     }

     if(value <= 0){
       setTotalQuantity(1);
       return notyf.error("Value cannot be zero");
       
     }

     setTotalQuantity(value);
  }

  console.log(quantity);

  // let [isOpen, setIsOpen] = useState(false);
  const {user} = useAuth();

  
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
           Review Info Before Purchase
     </DialogTitle>
{/* Main div for info */}

       <div className="mt-2 ml-5">
      <p className="text-sm text-gray-800">Plant: {name}</p>
     </div>
       <div className="mt-2 ml-5">
      <p className="text-sm text-gray-800">Category: {category}</p>
     </div>
       <div className="mt-2 ml-5">
      <p className="text-sm text-gray-800">Customer: {user?.displayName}</p>
     </div>
       <div className="mt-2 ml-5">
      <p className="text-sm text-gray-800">Price: {price} BDT</p>
     </div>

     <div className="mt-2 ml-5">
      <p className="text-sm text-gray-800">Available: {quantity} </p>
     </div>

     {/* Quantity field */}

      <div className="space-y-1 mt-2 ml-5">
      <label htmlFor="quantity" className="block text-gray-400">
        Quantity
      </label>
      <input
        onChange={(e)=>handleQuantity(e.target.value)}
       
        value={totalQuantity}
        type="number"
        name="quantity"
        id="quantity"
        placeholder="Quantity"
         required
        className="p-2 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
      />
     
    </div>


    {/* Address field */}

     <div className="space-y-1 mt-2 ml-5">
      <label htmlFor="address" className="block text-gray-400">
        Address
      </label>
      <input

        type="text"
        name="address"
        id="address"
        placeholder="Shipping Address"
        className="p-2 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
      />
    </div>


      <div className='mb-2 ml-5'>
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