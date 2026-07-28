import { useQuery } from "@tanstack/react-query";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import useAuth from "../../../hooks/useAuth";



const ManageOrders = () => {
  const {user} = useAuth();

  const axiosSecure= userAxiosSecure();

  const {data:orders=[],isLoading,refetch} = useQuery({
    queryKey:["orders",user?.email],
    queryFn:async()=>{
      const {data} = await axiosSecure.get(`/seller-order/${user.email}`)
      return data
    }
    
  })
  console.log("Orders from client side: ",orders)
  return (
    <div>
      
    </div>
  );
};

export default ManageOrders;