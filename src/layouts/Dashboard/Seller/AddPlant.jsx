import { useState } from 'react';
import AddPlantForm from '../../../components/AddPlantForm';
import "../../../components/FeaturedPlants.css"
import { imageUpload } from '../../../api/utils';
import useAuth from '../../../hooks/useAuth';
import userAxiosSecure from '../../../hooks/userAxiosSecure';
import { Notyf } from 'notyf';


const AddPlant = () => {


  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
      {
        type: 'success',
        background: 'green',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'success'
        }
      },
      {
        type: 'success',
        background: 'green',
        duration: 2000,
        dismissible: true
      }
    ]
  });

 const axiosSecure = userAxiosSecure();
 const {user} = useAuth();
 const [upload,setUpload] = useState("Upload Image");

  const handleSubmitAddPlant = async(event) => {
    
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const description = form.description.value;

    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    const seller = {
        name: user?.displayName,
        email:user?.email,
        photo:user?.photoURL
    }

    const plantData = {
      name,
      category,
      price,
      quantity,
      description,
      image:imageUrl,
      seller
    }
    console.table(plantData)
    
    try{

      const res = await axiosSecure.post("/plants",plantData)
      console.log(res.data);
      notyf.success(`${plantData.name} added`)


    }
    catch(error){
       console.log(error.message)
       notyf.error("Could not add plant")

    }

  }


  return (
    <div>
       <h1 className="h1 text-center mx-10 my-10 text-lime-400">Add Plant</h1>
      <AddPlantForm handleSubmitAddPlant={handleSubmitAddPlant} upload={upload} setUpload={setUpload}></AddPlantForm>
    </div>
  );
};

export default AddPlant;