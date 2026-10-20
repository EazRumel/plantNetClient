import { useState } from "react";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import DeleteInventoryModal from "./DeleteInventoryModal";
import { notyf } from "../../../api/utils";
import UpdateInventory from "./UpdateInventory";
import { Link } from "react-router-dom";

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
      <td className="px-6 py-4">

        <div className="flex items-center gap-2">

          {/* Update */}
   <button
  type="button"
  onClick={() => setIsUpdateOpen(true)}
  className="
    inline-flex cursor-pointer items-center rounded-lg
    bg-green-50 px-4 py-2 text-sm font-semibold
    text-green-600 transition hover:bg-green-500
    hover:text-white
  "
>
  Update
</button>
          {/* Delete */}
          <button
            onClick={() => setIsOpen(true)}
            className="
              cursor-pointer
              rounded-lg
              bg-red-50
              px-4
              py-2
              text-sm
              font-semibold
              text-red-500
              transition
              hover:bg-red-500
              hover:text-white
            "
          >
            Delete
          </button>

        </div>


        <DeleteInventoryModal
          plant={plant._id}
          handleDelete={handleDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        />

        <UpdateInventory
         id={_id}
         isUpdateOpen={isUpdateOpen} 
          closeUpdateModal={closeUpdateModal}
          refetch={refetch}  
        >
         
           
        </UpdateInventory>

      </td>

    </tr>
  );
};

export default MyInventoryRow;