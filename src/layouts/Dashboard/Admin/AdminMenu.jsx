import { UserPen } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <li>
            <NavLink
  to="manageUsers"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-300 hover:text-green-400"
  }
>
  <span className="flex font-bold text-lg gap-2 items-center justify-center"><UserPen size={22} strokeWidth={3} /> Manage Users</span>
</NavLink>
          </li>
    </>
  );
};

export default AdminMenu;