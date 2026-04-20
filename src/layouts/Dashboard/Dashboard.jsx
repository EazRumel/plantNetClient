import { House, ShoppingCart } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import imageLogo from "../../../src/assets/img/plantLogo.jpg"



const Dashboard = () => {

  const [cart] = useCart();

  const links = (

      <ul className="margin-center flex fled-row lg:flex-col gap-3">
      <div className="flex gap-3 px-3 py-2 rounded-2xl flex-row">
       <p className="self-center whitespace-nowrap text-xl font-light dark:text-white"><span className="text-green-400 font-light">Tree</span> <span className="text-white">Planet</span></p>
        <img className="mr-3 rounded-lg h-6 sm:h-9" src={imageLogo} alt="" />
      </div>
          <li>
            <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-xl gap-2 items-center justify-center">Home -<House size={22} strokeWidth={3} /></span>
</NavLink>
          </li>
          <li>
            {/* <NavLink
  to="cart"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-xl gap-2 items-center justify-center">Cart({cart.length}) -<ShoppingCart size={22} strokeWidth={3} /></span>
</NavLink> */}
          </li>
        </ul>
    
  )
  
  return (
    <div className="flex flex-col lg:flex-row">
      
       
    {/* large navbar */}
       <div className="hidden lg:p-10 lg:block w-64 min-h-screen bg-emerald-900">
        <ul className="menu bg-green-900 gap-5 bg-opacity-100 p-4 rounded-xl flex flex-row items-center">
          {links}
        </ul>
       </div>


{/* //small device navbar */}
      <div className="lg:hidden bg-emerald-900 px-6 py-4">
        <ul className="menu flex flex-row  bg-green-200 bg-opacity-20 p-4 rounded-xl  gap-6 items-center">{links}</ul>
      </div>
       <div className="flex-1">
        <Outlet></Outlet>
       </div>
       
    </div>
  );
};

export default Dashboard;