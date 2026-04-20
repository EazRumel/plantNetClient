import { useLoaderData } from "react-router-dom";
import usePlants from "../hooks/usePlants";
import useAuth from "../hooks/useAuth";


const PlantCardDetails = () => {


  
  const {user} = useAuth();
  console.log(user);

 const {name,image,category,difficulty,price,_id,quantity} = useLoaderData();
  return (
    <div className="mx-center my-20">
     <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={image}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold ml-10">Plant Name: {name}</h1>
      <p>Name: {user?.displayName}</p>
      <p>User: {user?.email}</p>
      <p>Quantity: {quantity}</p>
      
      <p className="py-6">
     
      </p>
      <img src={user?.photoURL} alt="" />
         <button

  className="mt-3
    btn relative overflow-hidden group
    bg-transparent border border-green-500 text-green-500
    transition-shadow duration-200
    hover:shadow-lg
  "
>
  {/* Pour layer */}
  <span
    className="
      absolute inset-0 bg-green-500
      transform scale-y-0 origin-top
      transition-transform duration-300 ease-out
      delay-75
      group-hover:scale-y-100
    "
  ></span>

  {/* Button content */}
  <span
    className="
      relative z-10 flex items-center gap-2
      transition-colors duration-150
      group-hover:text-white
    "
  >
   Purchase

  </span>
</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default PlantCardDetails;