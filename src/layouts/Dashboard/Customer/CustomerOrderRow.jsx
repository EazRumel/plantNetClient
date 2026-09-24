import { BookmarkX } from "lucide-react";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import Swal from "sweetalert2";
import { Notyf } from "notyf";

const CustomerOrderRow = ({ orderData, refetch }) => {
  const {
    price,
    category,
    name,
    image,
    quantity,
    _id,
    status,
    plantId,
  } = orderData;

  const axiosSecure = userAxiosSecure();

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
    types: [
      {
        type: "success",
        background: "green",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "success",
        },
      },
      {
        type: "success",
        background: "green",
        duration: 2000,
        dismissible: true,
      },
    ],
  });

  const handleDelete = async () => {
    try {
    const result = await Swal.fire({

  title: "Delete this order?",

  text: `Are you sure you want to remove ${name} from your orders?`,

  icon: "warning",

  showCancelButton: true,

  confirmButtonText: "Yes, delete it",

  cancelButtonText: "Cancel",

  confirmButtonColor: "#16a34a",

  cancelButtonColor: "#e5e7eb",

  reverseButtons: true,

  customClass: {

    popup: "rounded-2xl",

    title: "text-xl font-bold text-gray-800",

    htmlContainer: "text-gray-500",

    confirmButton: "rounded-lg px-5 py-2.5 font-semibold",

    cancelButton: "rounded-lg px-5 py-2.5 font-semibold text-gray-700",

  },

  buttonsStyling: true,

});

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/order/${_id}`);

        const res = await axiosSecure.patch(`/plants/quantity/${plantId}`, {
          updateQuantity: quantity,
          status: "increase",
        });

        console.log(res);
        console.log(response.data);

        if (
          response.data.deletedCount > 0 &&
          res.data.modifiedCount > 0
        ) {
          notyf.success(`${name} has been removed from your order`);
          refetch();
        }
      }
    } catch (error) {
      console.log(error);
      notyf.error(error.response?.data || "Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      {/* Plant Preview */}
      <td>
        <div className="flex items-center">
          <div className="avatar">
            <div className="mask mask-squircle h-16 w-16">
              <img src={image} alt={name} />
            </div>
          </div>
        </div>
      </td>

      {/* Name */}
      <td>
        <div className="font-semibold text-gray-800">
          {name}
        </div>
      </td>

      {/* Category */}
      <td className="text-gray-600">
        {category}
      </td>

      {/* Price */}
      <td className="font-medium">
        {price} BDT
      </td>

      {/* Quantity */}
      <td>
        {quantity}
      </td>

      {/* Status */}
      <td>
        <span className="badge badge-outline">
          {status}
        </span>
      </td>

      {/* Action */}
      <td>
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
        >
          <BookmarkX size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CustomerOrderRow;