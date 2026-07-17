
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import userAxiosSecure from './userAxiosSecure';


const useRole = () => {
  const axiosSecure = userAxiosSecure();
  const {user,loading} = useAuth();

  const {data:role,isLoading} = useQuery({
    queryKey:["role",user?.email],
    enabled:(!loading && !!user?.email),
    queryFn:async()=>{
      const response = await axiosSecure.get(`/users/role/${user?.email}`)
      return response.data.role
    }
  
    
  })
    console.log(role)
  return [role,isLoading]
};

export default useRole;