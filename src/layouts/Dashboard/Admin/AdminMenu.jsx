import { UserPen } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {

  const adminLinkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-green-500 text-white font-semibold"
        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
    }`;

  return (
    <>
      <NavLink
        to="admin-stats"
        className={adminLinkClass}
      >
        <UserPen size={21} strokeWidth={2} />
        <span>Admin Statistics</span>
      </NavLink>

      <NavLink
        to="manageUsers"
        className={adminLinkClass}
      >
        <UserPen size={21} strokeWidth={2} />
        <span>Manage Users</span>
      </NavLink>
    </>
  );
};

export default AdminMenu;