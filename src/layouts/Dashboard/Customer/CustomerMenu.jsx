import { NotebookPen, Store } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BecomeASeller from "./BecomeASeller";
import useAuth from "../../../hooks/useAuth";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import { Notyf } from "notyf";

const CustomerMenu = () => {

   const {user} = useAuth();
    const axiosSecure = userAxiosSecure();

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

     let [isOpen, setIsOpen] = useState(false)

    function open() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }



    const handleRequest = async () =>{
      try{
         const result = await axiosSecure.patch(`/users/${user?.email}`);
         console.log(result.data)
         notyf.success("Applied to become a seller")
      }
      catch(error){
        console.log(error)
        console.log(error.message)
                 notyf.error(error.response.data)

      }
      finally{
        closeModal();
      }
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
      <BecomeASeller handleRequest={handleRequest} isOpen={isOpen} closeModal={closeModal}></BecomeASeller>
    </>
  );
};

export default CustomerMenu;