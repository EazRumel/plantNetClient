import { NotebookPen, Store } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BecomeASeller from "./BecomeASeller";
import useAuth from "../../../hooks/useAuth";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import { Notyf } from "notyf";

const CustomerMenu = () => {
  const { user } = useAuth();
  const axiosSecure = userAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

  const handleRequest = async () => {
    try {
      const result = await axiosSecure.patch(`/users/${user?.email}`);

      console.log(result.data);
      notyf.success("Applied to become a seller");
    } catch (error) {
      console.log(error);
      notyf.error(error?.response?.data || "Something went wrong");
    } finally {
      setIsOpen(false);
    }
  };

  const customerLinkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-green-500 text-white font-semibold"
        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
    }`;

  return (
    <>
      {/* My Orders */}
      <NavLink to="myOrder" className={customerLinkClass}>
        <NotebookPen size={21} strokeWidth={2} />
        <span>My Orders</span>
      </NavLink>

      {/* Become a Seller */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                   text-gray-600 hover:bg-green-50 hover:text-green-600
                   transition-all duration-200 cursor-pointer"
      >
        <Store size={21} strokeWidth={2} />
        <span>Become a Seller</span>
      </button>

      <BecomeASeller
        handleRequest={handleRequest}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default CustomerMenu;