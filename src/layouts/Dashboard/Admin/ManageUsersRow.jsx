import React from 'react';
import { useState } from 'react';
import UpdateUserModal from './UpdateUserModal';

const ManageUsersRow = ({user}) => {
  const [isOpen,setIsOpen] = useState(false);



  const {email,role,status}  = user;
  return (
     <tr>
      <td>
       {email}
      </td>
      <td>{role}</td>

      <td>
      {
        status ? ( <p className={`${status === "Requested" ? "text-yellow-500" : "text-green-400"} `}>
          {status}
        </p> ): (<p className="whitespace-wrap text-red-600">Unavailable</p>)
      }
      
      </td>
     

      <td>
        <button
         onClick={()=>setIsOpen(true)}
         className="cursor-pointer px-2 text-green-700 bg-green-200 opacity-70 rounded-full">
          Update Role
        </button>
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen}></UpdateUserModal>
      </td>
    </tr>
  );
};

export default ManageUsersRow;