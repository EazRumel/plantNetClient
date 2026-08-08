import React from 'react';
import userAxiosSecure from '../../../hooks/userAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';


const AdminStats = () => {
  const axiosSecure = userAxiosSecure();

  const {data:statData,isLoading} = useQuery({
    queryKey:["admin-stats"],
    queryFn:async()=>{
      const {data} = await axiosSecure.get("/admin-stats")
      return data;
    }
  })
  if(isLoading)return <Loading></Loading>
  console.log(statData);
  const { totalUsers,totalPlants } = statData || {};
 
  return (
    <div>
      <h2>Admin Statistics Page</h2>
      <p>Total Users: {totalUsers}</p>
      <p>Total Plants: {totalPlants}</p>
    </div>
  );
};

export default AdminStats;