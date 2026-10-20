import { useEffect, useState } from "react";
import {
  ImagePlus,
  Sprout,
  Package,
  Sun,
  Droplets,
  Leaf,
  LoaderPinwheel,
  X,
} from "lucide-react";

const UpdatePlantForm = ({
  plant,
  handleSubmitUpdatePlant,
  loading,
  upload,
  setUpload,
  image,
  setImage,
  closeUpdateModal,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const localUrl = URL.createObjectURL(file);

    setPreviewUrl(localUrl);
    setImage(localUrl);
    setUpload(file.name);
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none transition duration-200 placeholder:font-normal placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

  const labelStyle =
    "mb-2 block text-sm font-semibold tracking-tight text-gray-700";

  const sectionTitleStyle =
    "mb-5 flex items-center gap-2.5 border-b border-green-100 pb-3 text-xs font-bold uppercase tracking-[0.15em] text-green-800 sm:text-sm";

  const currentImage = image || plant.image;

  return (
    <form onSubmit={handleSubmitUpdatePlant} className="space-y-8">
      {/* Basic Information */}
      <section>
        <h3 className={sectionTitleStyle}>
          <Sprout size={18} />
          Plant Information
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Plant Name */}
          <div className="sm:col-span-2">
            <label htmlFor="plant-name" className={labelStyle}>
              Plant Name <span className="text-red-500">*</span>
            </label>

            <input
              id="plant-name"
              type="text"
              name="name"
              defaultValue={plant.plant_name ?? plant.name ?? ""}
              placeholder="e.g. Monstera Deliciosa"
              className={inputStyle}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelStyle}>
              Category <span className="text-red-500">*</span>
            </label>

            <select
              id="category"
              name="category"
              defaultValue={plant.category ?? ""}
              className={inputStyle}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulent">Succulent</option>
              <option value="Herb">Herb</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className={labelStyle}>
              Care Difficulty <span className="text-red-500">*</span>
            </label>

            <select
              id="difficulty"
              name="difficulty"
              defaultValue={plant.difficulty ?? ""}
              className={inputStyle}
              required
            >
              <option value="" disabled>
                Select difficulty
              </option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelStyle}>
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={plant.description ?? ""}
              placeholder="Describe the plant, its features, and care requirements..."
              className={`${inputStyle} min-h-28 resize-y`}
              required
            />
          </div>
        </div>
      </section>

      {/* Care Requirements */}
      <section>
        <h3 className={sectionTitleStyle}>
          <Sun size={18} />
          Care Requirements
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Light */}
          <div>
            <label htmlFor="light" className={labelStyle}>
              Light Requirements <span className="text-red-500">*</span>
            </label>

            <input
              id="light"
              type="text"
              name="light"
              defaultValue={plant.light ?? ""}
              placeholder="e.g. Bright indirect light"
              className={inputStyle}
              required
            />
          </div>

          {/* Watering */}
          <div>
            <label htmlFor="watering" className={labelStyle}>
              Watering Schedule <span className="text-red-500">*</span>
            </label>

            <input
              id="watering"
              type="text"
              name="watering"
              defaultValue={plant.watering ?? ""}
              placeholder="e.g. Once a week"
              className={inputStyle}
              required
            />
          </div>
        </div>
      </section>

      {/* Inventory and Pricing */}
      <section>
        <h3 className={sectionTitleStyle}>
          <Package size={18} />
          Inventory & Pricing
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Price */}
          <div>
            <label htmlFor="price" className={labelStyle}>
              Price <span className="text-red-500">*</span>
            </label>

            <input
              id="price"
              type="number"
              name="price"
              min="0"
              step="0.01"
              defaultValue={plant.price ?? ""}
              placeholder="Enter price"
              className={inputStyle}
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className={labelStyle}>
              Currency <span className="text-red-500">*</span>
            </label>

            <select
              id="currency"
              name="currency"
              defaultValue={plant.currency ?? "BDT"}
              className={inputStyle}
              required
            >
              <option value="BDT">BDT (৳)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className={labelStyle}>
              Available Quantity <span className="text-red-500">*</span>
            </label>

            <input
              id="quantity"
              type="number"
              name="quantity"
              min="0"
              step="1"
              defaultValue={plant.quantity ?? ""}
              placeholder="Enter quantity"
              className={inputStyle}
              required
            />
          </div>

          {/* Featured */}
          <div>
            <label htmlFor="isFeatured" className={labelStyle}>
              Featured Plant <span className="text-red-500">*</span>
            </label>

            <select
              id="isFeatured"
              name="isFeatured"
              defaultValue={String(plant.isFeatured ?? false)}
              className={inputStyle}
              required
            >
              <option value="true">Yes — Feature this plant</option>
              <option value="false">No — Keep it unfeatured</option>
            </select>
          </div>
        </div>
      </section>

      {/* Plant Image */}
   {/* Plant Image */}
<section>
  <h3 className={sectionTitleStyle}>
    <ImagePlus size={18} />
    Plant Image
  </h3>

  <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 p-5">
    <div className="flex flex-col items-center text-center">

      {/* Image Preview */}
      <div className="flex h-48 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {currentImage ? (
          <img
            src={currentImage}
            alt={plant.plant_name ?? plant.name ?? "Plant preview"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Leaf size={36} />
            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>

      {/* Upload Controls — Directly Below Image */}
      <div className="mt-5 flex w-full flex-col items-center">
        <p className="text-base font-semibold text-gray-800">
          Update your plant photo
        </p>

        <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
          Choose a new image from your device, or keep the existing photo.
        </p>

        <label
          htmlFor="plant-image"
          className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-800 shadow-sm transition hover:border-green-400 hover:bg-green-100"
        >
          <ImagePlus size={17} />
          Choose Image
        </label>

        <input
          id="plant-image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="sr-only"
        />

        <p
          className="mt-3 max-w-full truncate text-xs text-gray-500"
          title={upload}
        >
          {upload !== "Upload Image"
            ? upload
            : "Current image will be retained"}
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Form Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-gray-500">
          <span className="text-red-500">*</span> Required fields
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={closeUpdateModal}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderPinwheel size={17} className="animate-spin" />
                Updating Plant...
              </>
            ) : (
              <>
                <Sprout size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePlantForm;