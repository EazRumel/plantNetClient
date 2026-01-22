import useAxiosPublic from "../hooks/useAxiosPublic";
import usePlants from "../hooks/usePlants";
import { Card } from "flowbite-react";


const FeaturedPlants = () => {

    const [plants]= usePlants();
    const featuredPlant = plants.filter(featured => featured.isFeatured == true)

    console.log(plants)


  return (
<div className="my-12">
<p className="text-yellow-500 text-center my-6 text-3xl">-------------------------------------</p>
<h1 className="text-green-400 font-light text-center my-6 text-3xl">Our featured plants for you</h1>
<p className="text-yellow-400 text-center my-6 text-3xl">-------------------------------------</p>
  <div className="grid grid-cols-3 gap-6">
    {
    featuredPlant.map(plant=>(
     
       <Card className="max-w-sm " imgSrc={plant.image} horizontal>
      <h5 className="text-2xl font-light tracking-tight text-green-500 dark:text-white">
       {plant.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {plant.category} . {plant.price}
      </p>
    </Card>

    )
      
    )
  }
  </div>
</div>
  );
};

export default FeaturedPlants;