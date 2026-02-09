import { Key } from "lucide-react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import usePlants from "../hooks/usePlants";
import { Card } from "flowbite-react";


const FeaturedPlants = () => {

    const [plants]= usePlants();
    const featuredPlant = plants.filter(featured => featured.isFeatured == true)

    console.log(plants)


  return (
<div className="my-12">
<p className="text-green-300 text-center my-6 text-3xl">~~~~~~~~~~~~~~~~~~~~~~~~~</p>
<h1 className="text-green-400 font-light text-center my-6 text-3xl">Our featured plants for you</h1>
<p className="text-green-300 text-center my-6 text-3xl">~~~~~~~~~~~~~~~~~~~~~~~~~</p>
  <div className="grid grid-cols-3 gap-6">
    {
    featuredPlant.map(plant=>(

     <Card className="max-w-sm bg-white" imgSrc={plant.image} horizontal>
      <h5 className="text-2xl font-light tracking-tight text-green-300 dark:text-white">
       {plant.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {plant.category} . {plant.difficulty}
      </p>
      <p className="absolute rounded-l mr-1 px-2 mt-2 mb-32 ml-24  bg-green-400 p-1 text-white">BDT: {plant.price}</p>

    </Card>

    )
      
    )
  }
  </div>
</div>
  );
};

export default FeaturedPlants;
