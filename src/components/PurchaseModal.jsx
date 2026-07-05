
import { Button, Dialog, DialogPanel, DialogTitle ,Transition ,TransitionChild } from '@headlessui/react'
import { useState } from 'react'

import {Fragment }from "react";
import { Label } from 'flowbite-react';
import ButTon from '../shared/Button';
import useAuth from '../hooks/useAuth';
import { Notyf } from 'notyf';
import userAxiosSecure from '../hooks/userAxiosSecure';



const PurchaseModal = ({plant,closeModal,isOpen,refetch}) => {
  const {user} = useAuth();

  const axiosSecure = userAxiosSecure();
  const {name,quantity,price,category,seller,_id} = plant;



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
      const [totalPrice,setTotalPrice] = useState(price);

      // console.log(totalQuantity);

      const handleQuantity = (value) => {
          if(value > quantity)
          {
            setTotalQuantity(quantity);
            return notyf.error("Limit exceeded")
          }

          if(value <= 0)
          {
            setTotalQuantity(1);
            return notyf.error("Cannot order zero item");
          }

          setTotalQuantity(value);
          setTotalPrice(value * price);

      setPurchaseInfo(prev=>{
      return{...prev,quantity:value,price:value*price}
     })
      }


      const [purchaseInfo,setPurchaseInfo] = useState({
        customer :{
         name:user?.displayName,
         email:user?.email,
         image:user?.photoURL
        },

        plantId:_id,
        quantity:totalQuantity,
        price:totalPrice,
        seller:seller?.email,
        address:" ",
        status:"Pending"
      })


      const handlePurchaseInfo = async()=>{
        console.table(purchaseInfo);
        try{
          const res = await axiosSecure.post("/order",purchaseInfo);
        

           console.log(res.data);

           const response = await axiosSecure.patch(`/plants/quantity/${_id}`,{
            updateQuantity:totalQuantity
           })

            console.log(response)
             notyf.success("Order Completed")
             refetch();

        }
        catch(error){
          console.log(error.message)
          console.log(error)
          notyf.error("Order failed")
        }

        finally{
          closeModal();
        }

        

       
        
      }
      






 
  

  // console.log(quantity);

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
        value={totalQuantity}
        onChange={(e)=>handleQuantity(e.target.value)}
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
     onChange={(e)=>setPurchaseInfo(prev=>{
      return{...prev,address:e.target.value}
     })}

        type="text"
        name="address"
        id="address"
        placeholder="Shipping Address"
        className="p-2 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
      />
    </div>


      <div className='mb-2 ml-5'>
         <ButTon
          onClick={handlePurchaseInfo}
          label={`Pay ${totalPrice} BDT`}
         
         />
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