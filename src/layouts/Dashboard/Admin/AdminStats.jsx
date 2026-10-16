import React from 'react';
import userAxiosSecure from '../../../hooks/userAxiosSecure'; 
import Loading from '../../../components/Loading';
import { usePrefetchQuery, useQuery } from '@tanstack/react-query';
import "../../../components/FeaturedPlants.css"
import moneyIcon from "../../../assets/gifs/icons8-dollar-bag.gif"

import orderIcon from "../../../assets/gifs/icons8-cart-96.gif"

import plantIcon from "../../../assets/gifs/icons8-plant-96.gif"

import userIcon from "../../../assets/gifs/icons8-user-96.gif"
import useAuth from '../../../hooks/useAuth';
import Charts from './Charts';

import PieChartComponent from './PieChartComponent';

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
  console.log("Stat-Data is: ",statData);
  const {totalUser,totalOrder,totalRevenue,totalPlants} = statData || {};

  const {data:categoryStats=[]} = useQuery({
       queryKey:["order-stats"],
       queryFn:async()=>{
        const {data} = await axiosSecure.get("/order-stats")
        return data;
       }
  })



  // console.log("Order-stats: ",categoryStats);


 
  return (
    <div>
      <div className="flex justify-between">
         <div className="ml-5 my-2">
         <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
  Hello, <span className="text-green-500">{user.displayName}</span> 👋
</h1>

        </div>
   <div className="mr-5">
    <img className='w-12 mt-3 ml-4 h-12 rounded-full' src={user.photoURL} alt="" />
   </div>
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
       <h1 className="text-xl">Total Revenue: ${totalRevenue} </h1>
    
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


  
 <div className="w-full text-center my-24">

  <h2 className="text-2xl font-bold text-green-500 mb-2">
    Dashboard Overview
  </h2>

   <p className="text-slate-500 mb-4">

    A quick overview of your plants, users, orders, and revenue.

  </p>

  <div className="w-full h-px bg-emerald-500 mb-8"></div>
  <div className="flex items-center justify-evenly gap-4 w-full my-4">
    
   

    {statData && (
      <Charts statData={statData} />
    )}
     {categoryStats && (
      <PieChartComponent categoryStats={categoryStats} />
    )}

  </div>

</div>
    </div>
  );
};

export default AdminStats;