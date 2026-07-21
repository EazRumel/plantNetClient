import { Trees } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import MyInventory from './MyInventory';

const SellerMenu = () => {
  return (
    <>
      <li>
            <NavLink
  to="addPlant"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-lg gap-2 items-center justify-center"><Trees size={22} strokeWidth={3} /> Add Plant </span>
</NavLink>
          </li>
          <li>
            <NavLink
  to="myInventory"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-lg gap-2 items-center justify-center"><Trees size={22} strokeWidth={3} /> My Inventory</span>
</NavLink>
          </li>
    </>
  );
};

export default SellerMenu;