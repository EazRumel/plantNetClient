import { Button, ButtonGroup, Card } from 'flowbite-react';
import useAuth from '../hooks/useAuth';
import userAxiosSecure from '../hooks/userAxiosSecure';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';


const PageCard = ({plant}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [carts,refetch] = useCart();
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
      // console.log(response.data);
      if(response.data.insertedId){
        notyf.success(`${name} Added to Cart`)
        refetch();
      }
    })
    
    .catch(error=>{
      notyf.error("Failed to Add to Cart")
      console.log(error.message)
    })
   }
   else{
     Swal.fire({
  title: "You are not logged in",
  text: "Continue from the login page?",
  icon: "info",
  showCancelButton: true,
  confirmButtonColor: "#16a34a",
  cancelButtonColor: "red",
  confirmButtonText: "Take me to the login page!"
})
.then(result=>{
  if(result.isConfirmed){
    console.log(result)
    navigate("/login",{state:{from:location}})
  }
})

   }
  }
  // console.log(plant);
  return (
    <div className="">
          <div className="card bg-base-100  w-96 shadow-sm">
  <figure>

    <img className="h-96 w-full"
      src={image}
      alt="Shoes" />
  </figure>
    <p className="absolute rounded-xl mr-1 px-1 mt-2 mb-32 ml-72  bg-slate-100 py-1 text-center flex text-black">{name}</p>

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