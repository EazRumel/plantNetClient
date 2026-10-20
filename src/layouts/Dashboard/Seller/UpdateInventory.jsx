import { useQuery } from "@tanstack/react-query";
import userAxiosSecure from "../../../hooks/userAxiosSecure";
import { useState } from "react";
import UpdatePlantForm from "./UpdatePlantForm";
import { imageUpload, notyf } from "../../../api/utils";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Leaf, LoaderPinwheel, X } from "lucide-react";

const UpdateInventory = ({
  id,
  isUpdateOpen,
  closeUpdateModal,
  refetch,
}) => {
  const axiosSecure = userAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState("Upload Image");
  const [image, setImage] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/plants/${id}`);
      return res.data;
    },
    enabled: Boolean(isUpdateOpen && id),
  });

  const handleSubmitUpdatePlant = async (event) => {
    event.preventDefault();

    const form = event.target;

    try {
      setLoading(true);

      let imageUrl = data.image;
      const selectedImage = form.image.files[0];

      if (selectedImage) {
        imageUrl = await imageUpload(selectedImage);
      }

      const plantData = {
        name: form.name.value,
        category: form.category.value,
        difficulty: form.difficulty.value,
        light: form.light.value,
        watering: form.watering.value,
        price: Number(form.price.value),
        currency: form.currency.value,
        quantity: Number(form.quantity.value),
        isFeatured: form.isFeatured.value === "true",
        description: form.description.value,
        image: imageUrl,
      };

      await axiosSecure.patch(`/plants/${id}`, plantData);

      notyf.success("Plant updated successfully!");

      closeUpdateModal();

      // Refresh the inventory table after updating.
      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.error(error);

      notyf.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to update plant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={Boolean(isUpdateOpen)}
      onClose={() => {
        if (!loading) closeUpdateModal();
      }}
      className="relative z-50"
    >
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-5">
        <DialogPanel className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

          {/* Modal header */}
          <div className="flex shrink-0 items-center justify-between border-b border-green-100 bg-gradient-to-r from-green-50 to-white px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Leaf size={23} />
              </div>

              <div>
                <DialogTitle className="text-lg font-bold tracking-tight text-gray-800 sm:text-xl">
                  Update Plant
                </DialogTitle>

                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                  Manage your plant information and inventory.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeUpdateModal}
              disabled={loading}
              aria-label="Close modal"
              className="rounded-xl p-2 text-gray-400 transition hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={21} />
            </button>
          </div>

          {/* Scrollable modal content */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {isLoading && (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12">
                <LoaderPinwheel
                  size={34}
                  className="animate-spin text-green-600"
                />

                <p className="text-sm font-semibold text-gray-700">
                  Loading plant information...
                </p>

                <p className="text-xs text-gray-400">
                  Please wait a moment.
                </p>
              </div>
            )}

            {isError && (
              <div className="px-6 py-12 text-center">
                <p className="font-semibold text-red-600">
                  Unable to load plant information.
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Please close this window and try again.
                </p>
              </div>
            )}

            {data && !isLoading && !isError && (
              <div className="p-5 sm:p-8">
                <UpdatePlantForm
                  plant={data}
                  handleSubmitUpdatePlant={handleSubmitUpdatePlant}
                  loading={loading}
                  upload={upload}
                  setUpload={setUpload}
                  image={image}
                  setImage={setImage}
                  closeUpdateModal={closeUpdateModal}
                />
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateInventory;