import React from 'react';
import userAxiosSecure from '../../../hooks/userAxiosSecure'; 
import Loading from '../../../components/Loading';
import { useQuery } from '@tanstack/react-query';
import "../../../components/FeaturedPlants.css"
import moneyIcon from "../../../assets/gifs/icons8-dollar-bag.gif"

import orderIcon from "../../../assets/gifs/icons8-cart-96.gif"

import plantIcon from "../../../assets/gifs/icons8-plant-96.gif"

import userIcon from "../../../assets/gifs/icons8-user-96.gif"
import useAuth from '../../../hooks/useAuth';

const AdminStats = () => {
  const {user} = useAuth();
  const axiosSecure = userAxiosSecure();

  const {data:statData,isLoading} = useQuery({
    queryKey:["admin-stats"],
    queryFn:async()=>{
      const {data} = await axiosSecure.get("/admin-stats")
      return data;
    }
  })
  console.log(statData)
  const {totalUser,totalOrder,totalRevenue,totalPlants} = statData || {};


 
  return (
    <div>


      <div className="flex mx-3 my-3">
        <h1 className="h1 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent font-bold text-lg  ">Hello {user.displayName}</h1>

   <img className='w-12 mt-3 ml-4 h-12 rounded-full' src={user.photoURL} alt="" />
      </div>
      {/* <h1 className="h1 bg-gradient-to-r from-green-300 to-emerald-600 bg-clip-text text-transparent font-bold text-3xl text-center  mt-5">Admin Statistics page</h1> */}

<div className="flex gap-2 my-10 mx-5">
  {/* total revenue card */}
     <div className="card w-64 bg-base-100 card-sm shadow-xl">
  <div className="card-body">
     <div>
      <img className="w-16" src={moneyIcon} alt="" />
     </div>
   
    <div className=" card-actions">
       <h1 className="text-xl">Total Revenue: </h1>
       <h1 className="text-xl">${totalRevenue}</h1>
    </div>
  </div>
</div>
{/* total plants */}

  <div className="card w-64 bg-base-100 card-sm shadow-xl">
  <div className="card-body">
     <div>
      <img className="w-16" src={plantIcon} alt="" />
     </div>
   
    <div className=" card-actions">
       <h1 className="text-xl">Total Plants: </h1>
       <h1 className="text-xl">{totalPlants}</h1>
    </div>
  </div>
</div>

{/* total orders */}

  <div className="card w-64 bg-base-100 card-sm shadow-xl">
  <div className="card-body">
     <div>
      <img className="w-16" src={orderIcon} alt="" />
     </div>
   
    <div className=" card-actions">
       <h1 className="text-xl">Total Order: </h1>
       <h1 className="text-xl">{totalOrder}</h1>
    </div>
  </div>
</div>

{/* total Users */}
<div className="card w-64 bg-base-100 card-sm shadow-xl">
  <div className="card-body">
     <div>
      <img className="w-16" src={userIcon} alt="" />
     </div>
   
    <div className=" card-actions">
       <h1 className="text-xl">Total Users: </h1>
       <h1 className="text-xl">{totalUser}</h1>
    </div>
  </div>
</div>
</div>
    </div>
  );
};

export default AdminStats;