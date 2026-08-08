import React from 'react';
import AdminStats from '../Admin/AdminStats';
import useRole from '../../../hooks/useRole';
import { Navigate, useNavigate } from 'react-router-dom';

const Stats = () => {
   const [role] = useRole();
  const navigate = useNavigate();

  if(role === "customer")return <Navigate to="/dashboard/myOrder"/>
  if(role === "seller")return <Navigate to="/dashboard/myInventory"/>
  return (
    <div>
     {role === "admin" && <AdminStats></AdminStats>}
    </div>
  );
};

export default Stats;