import { ShoppingCart } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";


const Dashboard = () => {

  const [cart] = useCart();

  const links = (

      <ul>
       
          <li>
            <NavLink
  to="cart"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-2xl gap-2 items-center justify-center">Cart ({cart.length})<ShoppingCart size={22} strokeWidth={3} /></span>
</NavLink>
          </li>
          <li>
            <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  Add Plant
</NavLink>
          </li>
        </ul>
    
  )
  
  return (
    <div className="flex flex-col lg:flex-row">
      

    {/* large navbar */}
       <div className="hidden lg:block w-64 min-h-screen bg-emerald-900">
        <ul className="flex flex-row gap-6 items-center">
          {links}
        </ul>
       </div>


{/* //small device navbar */}
      <div className="lg:hidden bg-emerald-900 px-6 py-4">
        <ul className="flex flex-row gap-6 items-center">{links}</ul>
      </div>
       <div className="flex-1">
        <Outlet></Outlet>
       </div>
       
    </div>
  );
};

export default Dashboard;