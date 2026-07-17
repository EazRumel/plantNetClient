import { House, NotebookPen, ShoppingCart, Store, Trees } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import imageLogo from "../../../src/assets/img/plantLogo.jpg"
import CustomerMenu from "./Customer/CustomerMenu";
import useRole from "../../hooks/useRole";
import SellerMenu from "./Seller/SellerMenu";
import AdminMenu from "./Admin/AdminMenu";



const Dashboard = () => {

  const [role] = useRole();


  const [cart] = useCart();

  const links = (

      <ul className="flex lg:flex-col gap-3">
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
  <span className="flex font-bold text-xl gap-2 items-center justify-center"><House size={22} strokeWidth={3} /> Home</span>
</NavLink>
          </li>
       
          
          {
            role === "customer" &&   <CustomerMenu></CustomerMenu>
          }

          {
            role === "seller" && <SellerMenu></SellerMenu>
          }

          {
            role === "admin" && <AdminMenu></AdminMenu>
          }

      


           <li>
            <NavLink
  to="profile"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-lg gap-2 items-center justify-center"><Trees size={22} strokeWidth={3} />Profile</span>
</NavLink>
          </li>
        </ul>
    
  )
  
  return (
    <div className="flex flex-col lg:flex-row">
      
       
    {/* large navbar */}
       <div className="hidden lg:p-10 lg:block w-64 min-h-screen bg-gray-300">
        <ul className="menu bg-gray-100 text-gray-800 gap-5 bg-opacity-100 py-6 rounded-xl flex flex-row items-center">
          {links}
        </ul>
       </div>


{/* //small device navbar */}
      <div className="lg:hidden bg-gray-100 px-6 py-4">
        <ul className="menu flex flex-row  bg-green-200 bg-opacity-20 p-4 rounded-xl  gap-6 items-center">{links}</ul>
      </div>
       <div className="flex-1">
        <Outlet></Outlet>
       </div>
       
    </div>
  );
};

export default Dashboard;