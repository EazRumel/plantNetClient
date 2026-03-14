import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({

  baseURL:"http://localhost:3000",
  withCredentials:true
}
)
const userAxiosSecure = () => {
  const {logOut} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    axiosSecure.interceptors.response.use(response=>{
      return response;
    },(error)=>{

       if(error.status === 401 || error.status === 403){
        logOut()
        .then(response=>{
          console.log("logged out the user for his crime")
           navigate("/login")
        })
       
        
      }
      
      return Promise.reject(error);
    })
  },[])
  return axiosSecure
};

export default userAxiosSecure;