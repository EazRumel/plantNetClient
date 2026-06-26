import useAxiosPublic from "../hooks/useAxiosPublic";
// import axios from "axios";


export const imageUpload = async(imageData) =>{


  const axiosPublic = useAxiosPublic();

    const formData = new FormData();
    formData.append("image",imageData);


    const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`,formData)


const image_Url = res.data.data.display_url;

return image_Url; 
}