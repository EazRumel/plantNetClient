
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
  const location = useLocation();
  console.log(location)
  const {user,loading} = useAuth();

   if(loading){
    return <Loading></Loading>
  }
  if(user){
    return children;
  }
 
  return (
   <Navigate to ="/login" state={{from:location}}replace></Navigate>
  );
};

export default PrivateRoute;