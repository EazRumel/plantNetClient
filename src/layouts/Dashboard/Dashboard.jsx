import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="flex gap-5">
      
       <div className="w-72 min-h-screen bg-emerald-900">
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
  Cart
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