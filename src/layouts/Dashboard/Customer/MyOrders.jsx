import React from 'react';
import CustomerOrderRow from './CustomerOrderRow';
import useAuth from '../../../hooks/useAuth';
import userAxiosSecure from '../../../hooks/userAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyOrders = () => {


  const {user} = useAuth();
  const axiosSecure = userAxiosSecure();



   const { data:order=[],isLoading,refetch } = useQuery({
    queryKey:["order",user?.email],
    queryFn:async()=>{
      const res = await axiosSecure.get(`/customer/order/${user?.email}`)
      return res.data
    },
  })
  console.log(order)


  return (
    <div className="mx-auto my-10">
<div className="flex justify-evenly my-5">


  {/* <h2 className="font-bold text-2xl text-green-400">Cart Item :{cart.length}</h2> */}


{/* <p className="font-bold text-2xl text-green-400">Total Price: {totalPrice}</p> */}
</div>

  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>

        <th>Plant Preview</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        order.map(orderData=>(
          <CustomerOrderRow orderData={orderData}/>
        ))
      }
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default MyOrders;

 