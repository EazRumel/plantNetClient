import React from 'react';
import ManageUsersRow from './ManageUsersRow';
import "./../../../components/FeaturedPlants.css"
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import userAxiosSecure from '../../../hooks/userAxiosSecure';

const ManageUsers = () => {
  const {user} = useAuth();
  const axiosSecure = userAxiosSecure();

  const {data:users=[],isLoading,refetch}= useQuery({
    queryKey:["all-users",user?.email],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/all-users/${user?.email}`)
      return response.data;
    }
  })

  console.log(users)


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

       
        <th>Email</th>
       
        <th>Role</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

       {
        users.map(user=>(
          <ManageUsersRow refetch={refetch} key={user._id} user={user}></ManageUsersRow>
        ))
       }
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default ManageUsers;