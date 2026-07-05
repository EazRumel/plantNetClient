import { useLoaderData, useParams } from "react-router-dom";
import usePlants from "../hooks/usePlants";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PurchaseModal from './PurchaseModal';
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const PlantCardDetails = () => {

  const {id} = useParams();
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();

   let [isOpen, setIsOpen] = useState(false)



  const {data:plant,isLoading,refetch} = useQuery({
    queryKey:["plant",id],
    queryFn:async()=>{
      const res = await axiosPublic.get(`/plants/${id}`)
      return res.data
    },
  })

  if(isLoading){
    return <p>Loading</p>
  }



  
  // console.log(user);


  function open() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

//  const {name,image,category,difficulty,price,_id,quantity,description} = useLoaderData();

//  const plant = useLoaderData();
  return (
    <div className="mx-center my-20">
     <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={plant.image}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl py-3 font-bold ml-10">{plant.name}</h1>
      <p>Name: {user?.displayName}</p>
      <p>User: {user?.email}</p>
      <p>Quantity: {plant.quantity}</p>
      
     
      <img className="py-5" src={user?.photoURL} alt="" />
       <p className="py-6">
           {plant.description}
      </p>
      <Button
          onClick={()=>setIsOpen(true)}
          className="mt-3
    btn relative overflow-hidden group
    bg-transparent border border-green-500 text-green-500
    transition-shadow duration-200
    hover:shadow-lg
  "
>
  {/* Pour layer */}
  <span
    className="
      absolute inset-0 bg-green-500
      transform scale-y-0 origin-top
      transition-transform duration-300 ease-out
      delay-75
      group-hover:scale-y-100
    "
  ></span>

  {/* Button content */}
  <span className="
      relative z-10 flex items-center gap-2
      transition-colors duration-150
      group-hover:text-white
    ">
     {
      plant.quantity > 0 ? " Purchase" : "Out of Stock"
     }
    </span>
    
   
          
        </Button>
          <PurchaseModal refetch={refetch} plant={plant} closeModal={closeModal} isOpen={isOpen}></PurchaseModal>

        {/* Dialog */}
         
    </div>
  </div>
</div>
    </div>
  );
};

export default PlantCardDetails;

{/* <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Payment successful
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
                order.
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog> */}