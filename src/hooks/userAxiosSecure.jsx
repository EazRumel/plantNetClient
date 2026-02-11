import axios from "axios";


const axiosSecure =axios.create({

  baseURL:"http://localhost:3000"
}
)
const userAxiosSecure = () => {
  return axiosSecure
};

export default userAxiosSecure;