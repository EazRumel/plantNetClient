import { useQuery } from "@tanstack/react-query";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import MyInventoryRow from "./MyInventoryRow";
import ManageOrdersRow from "./ManageOrdersRow";



const ManageOrders = () => {
  const {user} = useAuth();

  const axiosSecure = userAxiosSecure();

  const {data:orders=[],isLoading,refetch} = useQuery({
    queryKey:["orders",user?.email],
    queryFn:async()=>{
      const {data} = await axiosSecure.get(`/seller-order/${user.email}`)
      return data;
    }
    
  })


  
  console.log("Orders from client side: ",orders)


   
  return (
     <div className="mx-auto my-10">
<div className="flex justify-evenly my-5">

     <h1 className="h1 text-center  text-lime-400">Manage Users</h1>
</div>

  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>

       
        <th>Name</th>
       
        <th>Customer Email</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Address</th>
       <th>Status</th>
       <th>Update</th>
       <th>Action</th>
      </tr>
    </thead>
    <tbody>

{/* mapping thorough each object */}
       {
        orders.map(orderData=>
         <ManageOrdersRow orderData={orderData} key={orderData._id} refetch={refetch} ></ManageOrdersRow>
        )
       }

    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default ManageOrders;