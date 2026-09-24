import { useQuery } from "@tanstack/react-query";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import MyInventoryRow from "./MyInventoryRow";

const MyInventory = () => {

  const axiosSecure = userAxiosSecure();

  const {
    data: plants = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/plants/seller");
      return data;
    },
  });


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }


  return (
    <div className="mx-auto my-10 px-4 max-w-7xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            My Inventory
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage the plants you have listed for sale
          </p>
        </div>

        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
          {plants.length} Plants
        </div>

      </div>


      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* Table Head */}
            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>

              </tr>

            </thead>


            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">

              {plants.map((plant) => (
                <MyInventoryRow
                  refetch={refetch}
                  plant={plant}
                  key={plant._id}
                />
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default MyInventory;