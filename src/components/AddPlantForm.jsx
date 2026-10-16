import { LoaderPinwheel, Leaf, ImagePlus } from "lucide-react";
import { shortImageName } from "../utilities";

const AddPlantForm = ({
  handleSubmitAddPlant,
  upload,
  setUpload,
  loading,
  image,
  setImage,
}) => {
  const inputStyle =
    "w-full px-4 py-3 text-gray-800 bg-white border border-gray-200 rounded-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 placeholder:text-gray-400";

  const labelStyle =
    "block text-sm font-medium text-gray-600 mb-2";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-600">
            <Leaf size={28} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Add a New Plant
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Add a plant to your inventory and make it available for sale.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="px-6 py-5 md:px-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Plant Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to list your plant.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitAddPlant}>

            <div className="p-6 md:p-8 space-y-8">

              {/* Basic Information */}
              <section>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-5">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelStyle}>
                      Plant Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="e.g. Monstera Deliciosa"
                      required
                      className={inputStyle}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className={labelStyle}>
                      Category
                    </label>

                    <select
                      name="category"
                      id="category"
                      defaultValue="Indoor"
                      required
                      className={inputStyle}
                    >
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Succulent">Succulent</option>
                      <option value="Herb">Herb</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="description" className={labelStyle}>
                      Description
                    </label>

                    <textarea
                      name="description"
                      id="description"
                      placeholder="Describe your plant, its features, and what makes it special..."
                      required
                      rows={5}
                      className={`${inputStyle} resize-y`}
                    />
                  </div>

                </div>
              </section>

              {/* Pricing and Inventory */}
              <section>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-5">
                  Pricing & Inventory
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Price */}
                  <div>
                    <label htmlFor="price" className={labelStyle}>
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      required
                      className={inputStyle}
                    />
                  </div>

                  {/* Currency */}
                  <div>
                    <label htmlFor="currency" className={labelStyle}>
                      Currency
                    </label>

                    <select
                      name="currency"
                      id="currency"
                      defaultValue="BDT"
                      required
                      className={inputStyle}
                    >
                      <option value="BDT">BDT — Bangladeshi Taka</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" className={labelStyle}>
                      Available Quantity
                    </label>

                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      placeholder="Enter quantity"
                      min="0"
                      step="1"
                      required
                      className={inputStyle}
                    />
                  </div>

                  {/* Featured */}
                  <div>
                    <label htmlFor="isFeatured" className={labelStyle}>
                      Featured Plant
                    </label>

                    <select
                      name="isFeatured"
                      id="isFeatured"
                      defaultValue="false"
                      required
                      className={inputStyle}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>

                </div>
              </section>

              {/* Plant Care */}
              <section>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-5">
                  Plant Care
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Light */}
                  <div>
                    <label htmlFor="light" className={labelStyle}>
                      Light Requirement
                    </label>

                    <input
                      type="text"
                      name="light"
                      id="light"
                      placeholder="e.g. Bright indirect light"
                      required
                      className={inputStyle}
                    />
                  </div>

                  {/* Watering */}
                  <div>
                    <label htmlFor="watering" className={labelStyle}>
                      Watering Frequency
                    </label>

                    <input
                      type="text"
                      name="watering"
                      id="watering"
                      placeholder="e.g. Once a week"
                      required
                      className={inputStyle}
                    />
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label htmlFor="difficulty" className={labelStyle}>
                      Care Difficulty
                    </label>

                    <select
                      name="difficulty"
                      id="difficulty"
                      defaultValue="Easy"
                      required
                      className={inputStyle}
                    >
                      <option value="Very Easy">Very Easy</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                </div>
              </section>

              {/* Image Upload */}
              <section>
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-5">
                  Plant Image
                </h3>

                <div className="border border-gray-200 rounded-xl p-5 md:p-6">

                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer rounded-xl border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition p-8"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600">
                      <ImagePlus size={28} />
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700">
                        Click to upload a plant image
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, JPEG or WEBP
                      </p>
                    </div>

                    <span className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition">
                      {upload || "Choose Image"}
                    </span>

                    <input
                      onChange={(event) => {
                        const files = event.target.files[0];

                        if (!files) return;

                        setUpload(shortImageName(files.name));
                        setImage(files);
                      }}
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>

                  {/* Image Preview */}
                  {image && (
                    <div className="mt-5">
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        Image Preview
                      </p>

                      <img
                        className="w-full max-w-xs h-52 object-cover rounded-xl border border-gray-200"
                        src={URL.createObjectURL(image)}
                        alt="Plant preview"
                      />
                    </div>
                  )}

                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-6 py-5 md:px-8 bg-gray-50 border-t border-gray-200">

              <p className="text-xs text-gray-500 text-center sm:text-left">
                Make sure your plant information is accurate before submitting.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto min-w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold shadow-sm hover:shadow transition duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoaderPinwheel size={20} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Leaf size={18} />
                    Save Plant
                  </>
                )}
              </button>

            </div>

          </form>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Tree Planet · Grow your inventory, grow your business.
        </p>

      </div>
    </div>
  );
};

export default AddPlantForm;