import { useState } from "react";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import DeleteInventoryModal from "./DeleteInventoryModal";
import { notyf } from "../../../api/utils";

import { Link } from "react-router-dom";
import UpdatePlant from "./UpdatePlant";

const MyInventoryRow = ({ plant, refetch }) => {

  const {
    image,
    name,
    category,
    quantity,
    _id
  } = plant;

  const axiosSecure = userAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);


  const closeModal = () => {
    setIsOpen(false);
  };


  const closeUpdateModal = () => {
setIsUpdateOpen(false);
};


  const handleDelete = async () => {

    try {

      await axiosSecure.delete(`/plants/${_id}`);

      notyf.success("Plant has been deleted");

      refetch();

    } catch (error) {

      console.log(error);

      notyf.error(
        error?.response?.data || "Failed to delete plant"
      );

    } finally {

      closeModal();

    }
  };


  return (
    <tr className="hover:bg-gray-50 transition-colors">

      {/* Image */}
      <td className="px-6 py-4">

        <img
          className="w-14 h-14 rounded-lg object-cover border border-gray-200"
          src={image}
          alt={name}
        />

      </td>


      {/* Name */}
      <td className="px-6 py-4">

        <p className="text-sm font-semibold text-gray-700">
          {name}
        </p>

      </td>


      {/* Category */}
      <td className="px-6 py-4">

        <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
          {category}
        </span>

      </td>


      {/* Quantity */}
      <td className="px-6 py-4">

        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
            quantity > 0
              ? "bg-blue-50 text-blue-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {quantity} available
        </span>

      </td>


      {/* Actions */}
    {/* Actions */}
<td className="px-6 py-4">
  <div className="flex items-center gap-3">

    {/* Update Button */}
    <button
      type="button"
      onClick={() => setIsUpdateOpen(true)}
      className="cursor-pointer
        group inline-flex items-center justify-center gap-2
        rounded-xl border border-green-200 bg-green-50
        px-4 py-2.5 text-sm font-semibold text-green-700
        shadow-sm transition-all duration-200
        hover:border-green-700 hover:bg-green-700 hover:text-white
        hover:shadow-md hover:shadow-green-700/20
        focus:outline-none focus:ring-4 focus:ring-green-500/20
        active:scale-95
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:rotate-[-8deg]"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
      </svg>

      <span>Update</span>
    </button>

    {/* Delete Button */}
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="cursor-pointer
        group inline-flex items-center justify-center gap-2
        rounded-xl border border-red-200 bg-red-50
        px-4 py-2.5 text-sm font-semibold text-red-600
        shadow-sm transition-all duration-200
        hover:border-red-600 hover:bg-red-600 hover:text-white
        hover:shadow-md hover:shadow-red-600/20
        focus:outline-none focus:ring-4 focus:ring-red-500/20
        active:scale-95
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:scale-110 "
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="m19 6-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>

      <span>Delete</span>
    </button>

  </div>

  {/* Delete Confirmation Modal */}
  <DeleteInventoryModal
    plant={plant._id}
    handleDelete={handleDelete}
    isOpen={isOpen}
    closeModal={closeModal}
  />

  {/* Update Modal */}
  <UpdatePlant
    id={_id}
    isUpdateOpen={isUpdateOpen}
    closeUpdateModal={closeUpdateModal}
    refetch={refetch}
  />
</td>

    </tr>
  );
};

export default MyInventoryRow;