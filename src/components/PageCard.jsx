import { Button, ButtonGroup, Card } from 'flowbite-react';
import useAuth from '../hooks/useAuth';
import userAxiosSecure from '../hooks/userAxiosSecure';


const PageCard = ({plant}) => {

  const axiosSecure = userAxiosSecure();

  const {user} = useAuth();
  const {name,image,category,difficulty,price,_id} = plant

  const handleAddToCart=(plant)=>{
    plant.preventDefault();
    
   if(user && user?.email){
     const cartItem = {
      cartId : _id,
      price,
      name,
      email:user.email,
      image,
      category
    }
    axiosSecure.post("/carts",cartItem)
    .then(response=>{
      console.log(response.data);
    })
   }
  }
  console.log(plant);
  return (
    <div className="">
          <div className="card bg-base-100  w-96 shadow-sm">
  <figure>
    <img className="h-96 w-full"
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{category}</h2>

    <p>Difficulty : {difficulty}</p>
    <div className="card-actions justify-end">
     <button
     onClick={handleAddToCart}
  className="
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
    Add to Cart
    <span className="font-semibold">{price} BDT</span>
  </span>
</button>


    </div>
  </div>
</div>
    </div>
  );
};

export default PageCard;