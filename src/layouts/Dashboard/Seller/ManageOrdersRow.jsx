import React, { useState } from 'react';
import DeleteInventoryModal from './DeleteInventoryModal';
import { notyf } from '../../../api/utils';
import userAxiosSecure from '../../../hooks/userAxiosSecure';

const ManageOrdersRow = ({orderData,refetch}) => {
  const axiosSecure = userAxiosSecure();
  const {customer,name,price,address,quantity,status,_id} = orderData;

  let[isOpen,setIsOpen] = useState(false);

  function open(){
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false)
  }

  const handleAction = (newStatus)=>{
    console.log(newStatus);
  }

  const handleDelete = async()=>{
    try {
      const {result} = await axiosSecure.delete(`/order/${_id}`)
      console.log(result)
      notyf.success("Order deleted")
      refetch();
    

    }
    catch(error){
      notyf.error(error.response.data)
      console.log(error)
      console.log(error.message)
    }

    finally{
      closeModal();
    }
   }
  return (
      <tr>
      <td>
        {name}
      </td>
      <td>{customer?.email}</td>

      <td>
   
       {price}
      </td>
     

      <td>
          {quantity}
      </td>
      <td>
        {address}
      </td>

      <td>
           {status}
   
     </td>
     <td>
        <div className="space-y-1">
  <select

    name="update"

    id="update"

    defaultValue={status}
    onChange={(event)=>handleAction(event.target.value)}

    className="w-full px-2 py-1 border border-green-300 focus:outline-green-300 rounded-md"

  >

    <option value="Pending">Pending</option>

    <option value="In Processing">Start Processing</option>

    <option value="Delivered">Delivered</option>

  </select>

</div>
     </td>
     <td>
      <button onClick={()=>setIsOpen(true)} className="bg-red-500 px-2 py-1 rounded-full text-red-300 cursor-pointer">Cancel</button>
     </td>
     <DeleteInventoryModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal}></DeleteInventoryModal>
  
    </tr>
  );
};

export default ManageOrdersRow;