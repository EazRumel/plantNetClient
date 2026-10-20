import { useQuery } from "@tanstack/react-query";
import {
  ClipboardList,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Leaf,
} from "lucide-react";

import userAxiosSecure from "../../../hooks/userAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ManageOrdersRow from "./ManageOrdersRow";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = userAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/seller-order/${user.email}`
      );
      return data;
    },
  });

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "In Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ClipboardList,
      iconStyle: "bg-green-100 text-green-700",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock,
      iconStyle: "bg-amber-100 text-amber-700",
    },
    {
      title: "Processing",
      value: processingOrders,
      icon: Truck,
      iconStyle: "bg-blue-100 text-blue-700",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200/60 px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-700">
              <Leaf size={14} />
              Seller Dashboard
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
              Manage Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
              Track customer orders, update delivery statuses, and keep
              your plant business growing.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Package size={23} />
            </div>

            <div>
              <p className="text-xs font-medium text-base-content/50">
                Your Orders
              </p>
              <p className="text-xl font-bold text-base-content">
                {isLoading ? "..." : orders.length}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-base-content/60">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-base-content">
                      {isLoading ? "—" : stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${stat.iconStyle}`}
                  >
                    <Icon size={23} />
                  </div>
                </div>

                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-base-200">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-green-500 to-lime-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Orders Table Section */}
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="flex flex-col gap-2 border-b border-base-300 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="text-xl font-bold text-base-content">
                All Orders
              </h2>

              <p className="mt-1 text-sm text-base-content/50">
                Review and manage orders placed for your plants.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center px-4 py-20">
              <span className="loading loading-spinner loading-lg text-green-600" />
              <p className="mt-4 text-sm font-medium text-base-content/60">
                Loading your orders...
              </p>
            </div>
          ) : isError ? (
            <div className="px-4 py-16 text-center">
              <p className="text-lg font-bold text-base-content">
                Unable to load orders
              </p>

              <p className="mt-2 text-sm text-base-content/60">
                Something went wrong while fetching your orders.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600">
                <ClipboardList size={36} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-base-content">
                No orders yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-base-content/60">
                When customers order your plants, their orders will appear
                here. Keep growing your inventory!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse text-left">
                <thead>
                  <tr className="bg-base-200/70 text-xs uppercase tracking-wider text-base-content/60">
                    <th className="px-5 py-4 font-bold">Plant</th>
                    <th className="px-4 py-4 font-bold">Customer</th>
                    <th className="px-4 py-4 font-bold">Price</th>
                    <th className="px-4 py-4 font-bold">Quantity</th>
                    <th className="px-4 py-4 font-bold">Address</th>
                    <th className="px-4 py-4 font-bold">Status</th>
                    <th className="px-4 py-4 font-bold">Update</th>
                    <th className="px-5 py-4 font-bold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((orderData) => (
                    <ManageOrdersRow
                      key={orderData._id}
                      orderData={orderData}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {!isLoading && !isError && orders.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-base-300 bg-base-200/40 px-5 py-4 text-sm text-base-content/50 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing{" "}
                <span className="font-semibold text-base-content">
                  {orders.length}
                </span>{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>

              <p className="flex items-center gap-2">
                <Leaf size={15} className="text-green-600" />
                Growing your business, one plant at a time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;