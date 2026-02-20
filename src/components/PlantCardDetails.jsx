import { useLoaderData } from "react-router-dom";
import usePlants from "../hooks/usePlants";
import useAuth from "../hooks/useAuth";


const PlantCardDetails = () => {
  const {user} = useAuth();
  console.log(user);

 const {name,image,category,difficulty,price,_id} = useLoaderData();
  return (
    <div className="mx-center my-20">
     <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={image}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold ml-10">{name}</h1>
      <p className="ml-10">{user?.displayName}</p>
      <p>{user?.email}</p>
      
      <p className="py-6">

      </p>
      <img src={user?.photoURL} alt="" />
      <button className="ml-10 btn btn-primary">Purchase</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default PlantCardDetails;