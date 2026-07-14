import { NotebookPen, Store } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BecomeASeller from "./BecomeASeller";

const CustomerMenu = () => {

     let [isOpen, setIsOpen] = useState(false)

    function open() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  
  return (
    <>
      <li>
        <NavLink
          to="myOrder"
          className={({ isActive }) =>
            isActive
              ? "text-green-500 font-semibold"
              : "text-gray-300 hover:text-green-400"
          }
        >
          <span className="flex items-center gap-2 text-lg font-bold">
            <NotebookPen size={22} strokeWidth={3} />
            My Orders
          </span>
        </NavLink>
      </li>

      <li>
       
        

         <button
           className={({ isActive }) =>
            isActive
              ? "text-green-500 font-semibold"
              : "text-gray-300 hover:text-green-400"
          }
         onClick={()=>setIsOpen(true)}
         >
           <span className="flex items-center gap-2 text-lg font-bold">
            <Store size={22} strokeWidth={3} />
            Become a Seller
          </span>
         </button>
       
      </li>
      <BecomeASeller isOpen={isOpen} closeModal={closeModal}></BecomeASeller>
    </>
  );
};

export default CustomerMenu;