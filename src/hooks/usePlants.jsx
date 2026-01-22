
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePlants = () => {

  const axiosPublic = useAxiosPublic();

  const {data:plants=[]} = useQuery({
    queryKey:["plants"],
    queryFn:async()=>{
      const response = await axiosPublic.get("/plants");
      return response.data;
    }

  })

   
   return [plants];
}

export default usePlants;