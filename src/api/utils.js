import axios from "axios";

//upload and image return
export const imageUpload = async(imageData)=>{
    const formData = new FormData();

    // formData.append("image",data.photo[0]);
     formData.append("image",imageData);
  const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,formData)

 const img_url = res.data.data.display_url;
 return img_url
}
