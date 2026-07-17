import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';

const SellerRoute = ({children}) => {
  
  const [role,isLoading] = useRole();

  if(isLoading){
    return <Loading></Loading>
  }
  if(role === "seller"){
    return children
  }
  return (
    <Navigate to ="/dashboard"></Navigate>
  );
};

export default SellerRoute;