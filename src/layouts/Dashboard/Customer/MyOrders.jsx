import React from "react";
import CustomerOrderRow from "./CustomerOrderRow";
import useAuth from "../../../hooks/useAuth";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = userAxiosSecure();

  const {
    data: order = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/customer/order/${user?.email}`);
      return res.data;
    },
  });

  console.log(order);

  return (
    <div className="w-full px-6 py-8">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Orders
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage your orders
        </p>
      </div>

      {/* Orders Table */}
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Plant Preview</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {order.map((orderData) => (
              <CustomerOrderRow
                key={orderData._id}
                orderData={orderData}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;