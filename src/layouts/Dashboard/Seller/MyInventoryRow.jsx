import { useState } from "react";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import DeleteInventoryModal from "./DeleteInventoryModal";
import { notyf } from "../../../api/utils";


const MyInventoryRow = ({plant,refetch}) => {
  const {image,name,category,quantity,_id} = plant;
  console.log(plant);
  const axiosSecure = userAxiosSecure();


 let [isOpen, setIsOpen] = useState(false)

    function open() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  


   const handleDelete = async() =>{
    console.log(_id)

    try {
      const {data} = await axiosSecure.delete(`/plants/${_id}`)
      console.log(data);
      notyf.success("Plant has been deleted");
      refetch();
    }
    catch(error){
      console.log(error)
      console.log(error.message)
      notyf.error(error.response.data)
    }
    finally{
     closeModal();
    }

  }
  return (
     <tr>
      <td>
        <img className="w-12" src={image} alt="" />
      </td>
      <td>{name}</td>

      <td>
     {category}
      
      </td>
     

      <td>
       {quantity}
      </td>
      <td>
        <button className="border border-green-500 px-2  bg-green-400 bg-opacity-80 text-white  rounded-full cursor-pointer">Update</button>
      </td>

      <td>
  <button onClick={()=>setIsOpen(true)} className="border border-red-500 px-2  bg-red-400 bg-opacity-80 text-white  rounded-full cursor-pointer">Delete</button>   
   
     </td>
  
  <DeleteInventoryModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal}/>
    </tr>
    
  );
};

export default MyInventoryRow;