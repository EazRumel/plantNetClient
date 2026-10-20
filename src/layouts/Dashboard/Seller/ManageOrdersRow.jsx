import React, { useState } from "react";
import { Package, MapPin, Mail, Ban, ChevronDown } from "lucide-react";
import DeleteInventoryModal from "./DeleteInventoryModal";
import { notyf } from "../../../api/utils";
import userAxiosSecure from "../../../hooks/userAxiosSecure";

const ManageOrdersRow = ({ orderData, refetch }) => {
  const axiosSecure = userAxiosSecure();

  const {
    customer,
    name,
    price,
    address,
    quantity,
    status,
    _id,
  } = orderData;

  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const closeModal = () => setIsOpen(false);

  const handleStatus = async (newStatus) => {
    if (status === newStatus || updating) return;

    try {
      setUpdating(true);

      await axiosSecure.patch(`/manageOrders/${_id}`, {
        status: newStatus,
      });

      notyf.success("Order status updated successfully");
      refetch();
    } catch (error) {
      notyf.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to update order status"
      );
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/order/${_id}`);

      notyf.success("Order cancelled successfully");
      refetch();
    } catch (error) {
      notyf.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to cancel order"
      );
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const statusStyles = {
    Pending: "bg-amber-100 text-amber-800 ring-amber-200",
    "In Processing": "bg-blue-100 text-blue-800 ring-blue-200",
    Delivered: "bg-green-100 text-green-800 ring-green-200",
  };

  const currentStatusStyle =
    statusStyles[status] || "bg-base-200 text-base-content ring-base-300";

  return (
    <tr className="group border-b border-base-300 transition-colors duration-200 hover:bg-green-50/60 dark:hover:bg-base-200">
      {/* Plant Name */}
      <td className="py-5 pl-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700 transition-transform duration-200 group-hover:scale-105">
            <Package size={20} />
          </div>

          <div>
            <p className="font-semibold text-base-content">{name}</p>
            <p className="mt-1 text-xs text-base-content/50">
              Order #{_id?.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>
      </td>

      {/* Customer Email */}
      <td className="py-5">
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <Mail size={15} className="shrink-0 text-green-600" />
          <span className="max-w-48 break-all">
            {customer?.email || "N/A"}
          </span>
        </div>
      </td>

      {/* Price */}
      <td className="py-5">
        <span className="font-bold text-green-700">
          ৳{Number(price || 0).toLocaleString("en-BD")}
        </span>
      </td>

      {/* Quantity */}
      <td className="py-5">
        <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-base-200 px-3 py-1.5 text-sm font-semibold text-base-content">
          {quantity}
        </span>
      </td>

      {/* Address */}
      <td className="py-5">
        <div className="flex max-w-52 items-start gap-2 text-sm leading-5 text-base-content/70">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0 text-green-600"
          />
          <span>{address || "No address provided"}</span>
        </div>
      </td>

      {/* Current Status */}
      <td className="py-5">
        <span
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${currentStatusStyle}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      </td>

      {/* Update Status */}
      <td className="py-5">
        <div className="relative min-w-36">
          <select
            name={`update-${_id}`}
            id={`update-${_id}`}
            disabled={status === "Delivered" || updating}
            value={status}
            onChange={(event) => handleStatus(event.target.value)}
            className="w-full appearance-none rounded-xl border border-base-300 bg-base-100 py-2.5 pl-3 pr-9 text-sm font-medium text-base-content shadow-sm outline-none transition-all duration-200 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Pending">Pending</option>
            <option value="In Processing">In Processing</option>
            <option value="Delivered">Delivered</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
          />

          {updating && (
            <span className="mt-1 block text-xs text-green-600">
              Updating...
            </span>
          )}
        </div>
      </td>

      {/* Cancel Order */}
      <td className="py-5 pr-5">
        <button
          type="button"
          disabled={status === "Delivered"}
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:shadow disabled:cursor-not-allowed disabled:border-base-300 disabled:bg-base-200 disabled:text-base-content/30 disabled:shadow-none"
        >
          <Ban size={15} />
          Cancel
        </button>
      </td>

      {/* Confirmation Modal */}
      <DeleteInventoryModal
        handleDelete={handleDelete}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </tr>
  );
};

export default ManageOrdersRow;