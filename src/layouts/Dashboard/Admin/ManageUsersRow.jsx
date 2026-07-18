import React from 'react';
import { useState } from 'react';
import UpdateUserModal from './UpdateUserModal';

import { Notyf } from 'notyf';
import userAxiosSecure from '../../../hooks/userAxiosSecure';

const ManageUsersRow = ({user,refetch}) => {
    const {email,role,status}  = user;
    const axiosSecure = userAxiosSecure();
  const [isOpen,setIsOpen] = useState(false);
   const notyf = new Notyf({
            duration: 2000,
            position: {
              x: 'center',
              y: 'top',
            },
            types: [
              {
                type: 'success',
                background: 'green',
                icon: {
                  className: 'material-icons',
                  tagName: 'i',
                  text: 'success'
                }
              },
              {
                type: 'success',
                background: 'green',
                duration: 2000,
                dismissible: true
              }
            ]
          });

          console.log("User",user)
          console.log("Role: ",user.role)


  const handleUpdateRole=async(selectedRole)=>{
    // console.log("Role is: ",selectedRole);
    try{
      const {data} = await axiosSecure.patch(`/users/role/${email}`,{
      role:selectedRole
    })
    // console.log(data);
    notyf.success("Role Updated");
    refetch();
    }
    catch(error){
      console.log(error)
      console.log(error.message)
      notyf.error(error?.response?.data)

    }
    finally{
      setIsOpen(false);
    }

  }



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
        <UpdateUserModal handleUpdateRole={handleUpdateRole} role={role} isOpen={isOpen} setIsOpen={setIsOpen}></UpdateUserModal>
      </td>
    </tr>
  );
};

export default ManageUsersRow;