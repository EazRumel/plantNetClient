import { Logs, Trees, Warehouse } from "lucide-react";
import { NavLink } from "react-router-dom";

const SellerMenu = () => {

  const sellerLinkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-green-500 text-white font-semibold"
        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
    }`;

  return (
    <>
      {/* Add Plant */}
      <NavLink
        to="addPlant"
        className={sellerLinkClass}
      >
        <Trees size={21} strokeWidth={2} />
        <span>Add Plant</span>
      </NavLink>


      {/* Inventory */}
      <NavLink
        to="myInventory"
        className={sellerLinkClass}
      >
        <Warehouse size={21} strokeWidth={2} />
        <span>My Inventory</span>
      </NavLink>


      {/* Manage Orders */}
      <NavLink
        to="manageOrders"
        className={sellerLinkClass}
      >
        <Logs size={21} strokeWidth={2} />
        <span>Manage Orders</span>
      </NavLink>
    </>
  );
};

export default SellerMenu;