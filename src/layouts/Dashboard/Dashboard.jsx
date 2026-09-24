import { House, Trees } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import imageLogo from "../../../src/assets/img/plantLogo.jpg";
import CustomerMenu from "./Customer/CustomerMenu";
import useRole from "../../hooks/useRole";
import SellerMenu from "./Seller/SellerMenu";
import AdminMenu from "./Admin/AdminMenu";

const Dashboard = () => {
  const [role] = useRole();
  const [cart] = useCart();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-green-500 text-white font-semibold"
        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
    }`;

  const links = (
    <div className="w-full">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <img
          className="w-10 h-10 rounded-lg object-cover"
          src={imageLogo}
          alt="Tree Planet"
        />

        <p className="text-xl font-semibold whitespace-nowrap">
          <span className="text-green-500">Tree</span>{" "}
          <span className="text-gray-700">Planet</span>
        </p>
      </div>


      {/* Main Navigation */}
      <nav className="space-y-2">

        {/* Home */}
        <NavLink to="/" className={navLinkClass}>
          <House size={21} strokeWidth={2} />
          <span>Home</span>
        </NavLink>


        {/* Customer */}
        {role === "customer" && <CustomerMenu />}

        {/* Seller */}
        {role === "seller" && <SellerMenu />}

        {/* Admin */}
        {role === "admin" && <AdminMenu />}


        {/* Profile */}
        <NavLink to="profile" className={navLinkClass}>
          <Trees size={21} strokeWidth={2} />
          <span>Profile</span>
        </NavLink>

      </nav>

    </div>
  );


  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-white border-r border-gray-200">

        <div className="w-full px-4 py-7">
          {links}
        </div>

      </aside>


      {/* ================= MOBILE NAVBAR ================= */}
      <div className="lg:hidden w-full">

        <div className="bg-white border-b border-gray-200 px-4 py-4">
          {links}
        </div>

      </div>


      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

    </div>
  );
};

export default Dashboard;