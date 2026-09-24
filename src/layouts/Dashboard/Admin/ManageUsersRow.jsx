import React, { useState } from "react";
import UpdateUserModal from "./UpdateUserModal";

import { Notyf } from "notyf";
import userAxiosSecure from "../../../hooks/userAxiosSecure";

const ManageUsersRow = ({ user, refetch }) => {

  const { email, role, status } = user;

  const axiosSecure = userAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });


  const handleUpdateRole = async (selectedRole) => {

    try {

      if (selectedRole === role) return;

      await axiosSecure.patch(`/users/role/${email}`, {
        role: selectedRole
      });

      notyf.success("Role Updated");

      refetch();

    } catch (error) {

      console.log(error);

      notyf.error(error?.response?.data);

    } finally {

      setIsOpen(false);

    }
  };


  return (
    <tr className="hover:bg-gray-50 transition-colors">

      {/* Email */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-700">
          {email}
        </div>
      </td>


      {/* Role */}
      <td className="px-6 py-4">

        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold capitalize">
          {role}
        </span>

      </td>


      {/* Status */}
      <td className="px-6 py-4">

        {
          status ? (

            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                ${
                  status === "Requested"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-green-50 text-green-600"
                }
              `}
            >
              {status}
            </span>

          ) : (

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold">
              Unavailable
            </span>

          )
        }

      </td>


      {/* Action */}
      <td className="px-6 py-4">

        <button
          onClick={() => setIsOpen(true)}
          className="
            px-4 py-2
            rounded-lg
            bg-green-50
            text-green-600
            text-sm
            font-semibold
            hover:bg-green-500
            hover:text-white
            transition-all
            duration-200
            cursor-pointer
          "
        >
          Update Role
        </button>


        <UpdateUserModal
          handleUpdateRole={handleUpdateRole}
          role={role}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

      </td>

    </tr>
  );
};

export default ManageUsersRow;