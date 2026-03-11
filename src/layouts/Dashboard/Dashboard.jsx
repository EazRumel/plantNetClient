import { ShoppingCart } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="flex gap-5">
      
       <div className="w-72 min-h-screen bg-emerald-900">
        <ul className="p-6 menu-vertical ">
          <li>
            <NavLink
  to="cart"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-2xl gap-2 items-center justify-center">Cart<ShoppingCart size={22} strokeWidth={3} /></span>
</NavLink>
          </li>
          <li>
            <NavLink
  to="addPlant"
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
       </div>
       <div>
        <Outlet></Outlet>
       </div>
       
    </div>
  );
};

export default Dashboard;