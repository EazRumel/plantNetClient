import { Key } from "lucide-react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import usePlants from "../hooks/usePlants";
import { Card } from "flowbite-react";
import  "../components/FeaturedPlants.css"
import { Link } from 'react-router-dom';



const FeaturedPlants = () => {

    const [plants]= usePlants();
    const featuredPlant = plants.filter(featured => featured.isFeatured == true)

    console.log(plants)


  return (
<div className="my-12">
{/* <p className="text-green-300 text-center my-6 text-3xl">~~~~~~~~~~~~~~~~~~~~~~~~~</p> */}



  <h1 className="h1 text-green-400 font-light mt-36 mb-12 text-3xl">Our featured plants for you</h1>


{/* <p className="text-green-300 text-center my-6 text-3xl">~~~~~~~~~~~~~~~~~~~~~~~~~</p> */}
  <div className="grid grid-cols-3 gap-6">
  {featuredPlant.length > 0 ? (
    featuredPlant.map((plant) => (
      <Card
        key={plant._id}
        className="max-w-sm bg-white object-hover transition-transform duration-300 hover:scale-105"
        imgSrc={plant.image}
        horizontal
      >
        <h5 className="text-2xl font-light tracking-tight text-green-300">
          {plant.name}
        </h5>

        <p className="font-normal text-gray-700">
          {plant.category} · {plant.difficulty}
        </p>

        <p>Quantity: {plant.quantity}</p>

        <p className="absolute rounded-l mr-1 px-2 mt-2 mb-32 ml-24 bg-green-400 p-1 text-white">
          BDT: {plant.price}
        </p>

        <button className="btn"><Link to={`/plant/${plant._id}`}>Details</Link></button>
      </Card>
    ))
  ) : (
    <p className="h1 text-red-500">No plants available</p>
  )}
</div>
</div>
  );
};

export default FeaturedPlants;
