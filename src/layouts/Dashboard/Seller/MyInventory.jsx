import { useQuery } from "@tanstack/react-query";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import MyInventoryRow from "./MyInventoryRow";


const MyInventory = () => {
  const axiosSecure = userAxiosSecure();

  const {data:plants=[],isLoading,refetch} = useQuery({
    queryKey:["plants"],
    queryFn: async()=>{
      const {data} = await axiosSecure.get("/plants/seller")
      return data; 
    },

  })


 
  console.log(plants);
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

       
        <th>Image</th>
       
        <th>Name</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Update</th>
       <th>Delete</th>
      </tr>
    </thead>
    <tbody>

       {
        plants.map(plant=>
          <MyInventoryRow plant={plant} key={plant._id}></MyInventoryRow>
        )
       }
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default MyInventory;