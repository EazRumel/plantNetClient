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
     <div className="mx-auto my-10 px-4 max-w-7xl">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Manage Users
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Manage user roles and account status
      </p>
    </div>

    <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium">
      {users.length} Users
    </div>
  </div>


  {/* Table Card */}
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

    <div className="overflow-x-auto">
      <table className="w-full">

        {/* Head */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Role
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Action
            </th>

          </tr>
        </thead>


        {/* Body */}
        <tbody className="divide-y divide-gray-100">

          {
            users.map(user => (
              <ManageUsersRow
                refetch={refetch}
                key={user._id}
                user={user}
              />
            ))
          }

        </tbody>

      </table>
    </div>

  </div>

</div>
  );
};

export default ManageUsers;