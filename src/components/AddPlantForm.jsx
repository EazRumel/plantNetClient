import { LoaderPinwheel } from 'lucide-react';
import React from 'react';

const AddPlantForm = ({handleSubmitAddPlant,upload,setUpload,loading}) => {
  return (
    <div className="w-full min-h-[calc-(100vh-40px)] flex flex-col justify-center items-center text-gray-800">
      <form onSubmit={handleSubmitAddPlant}>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Name */}
    <div className="space-y-1">
      <label htmlFor="name" className="block text-gray-400">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Plant Name"
        className="w-full px-4 py-3 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
      />
    </div>

    {/* Price */}
    <div className="space-y-1">
      <label htmlFor="price" className="block text-gray-400">
        Price
      </label>
      <input
        type="number"
        name="price"
        id="price"
        placeholder="Price"
        className="w-full px-4 py-3 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
      />
    </div>

    {/* Category */}
    <div className="space-y-1">
      <label htmlFor="category" className="block text-gray-400">
        Category
      </label>
      <select
        name="category"
        id="category"
        className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-300 rounded-md"
      >
        <option value="Indoor">Indoor</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Succulent">Succulent</option>
        <option value="Herb">Herb</option>
      </select>
    </div>

    {/* Quantity */}
    <div className="space-y-1">
      <label htmlFor="quantity" className="block text-gray-400">
        Quantity
      </label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        placeholder="Quantity"
        className="w-full px-4 py-3 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
      />
    </div>


    {/* Description */}
    <div className="lg:col-span-2 space-y-1">
      <label htmlFor="description" className="block text-gray-400">
        Description
      </label>
      <textarea
        name="description"
        id="description"
        placeholder="Write your description"
        className="w-full h-32 px-4 py-3 border border-lime-300 focus:outline-lime-300 rounded-md"
      ></textarea>
    </div>

    {/* Image Upload */}
    <div className="lg:col-span-2">
      <label htmlFor="image" className="block text-gray-400 mb-2">
        Plant Image
      </label>

      <div className="p-4 rounded-lg border-4 border-dotted border-gray-300">
        <label className="cursor-pointer flex justify-center">
          <input
           onChange={event=>setUpload(event.target.files[0].name)}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="hidden"
          />

          <div className="bg-lime-500 text-white px-4 py-2 rounded-lg">
          {upload}
          </div>
        </label>
      </div>
    </div>

    {/* currency */}

    <div className="space-y-1">

  <label htmlFor="currency" className="block text-gray-400">

    Currency

  </label>

  <select

    name="currency"

    id="currency"

    defaultValue="BDT"

    className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-300 rounded-md"

  >

    <option value="BDT">BDT</option>

    <option value="USD">USD</option>

    <option value="EUR">EUR</option>

  </select>

</div>

{/* Light */}

<div className="space-y-1">

  <label htmlFor="light" className="block text-gray-400">

    Light Requirement

  </label>

  <input

    type="text"

    name="light"

    id="light"

    placeholder="e.g. Bright indirect light"

    className="w-full px-4 py-3 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"

  />

</div>

{/* Watering */}
<div className="space-y-1">
  <label htmlFor="watering" className="block text-gray-400">
    Watering Frequency
  </label>
  <input
    type="text"
    name="watering"
    id="watering"
    placeholder="e.g. Weekly"
    className="w-full px-4 py-3 text-gray-800 border border-lime-400 focus:outline-lime-500 rounded-md"
  />
</div>

{/* Is Featured */}
<div className="space-y-1">
  <label htmlFor="isFeatured" className="block text-gray-400">
    Featured Plant
  </label>
  <select
    name="isFeatured"
    id="isFeatured"
    defaultValue="false"
    className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-300 rounded-md"
  >
    <option value="false">No</option>
    <option value="true">Yes</option>
  </select>
</div>

{/* Difficulty */}
<div className="space-y-1">
  <label htmlFor="difficulty" className="block text-gray-400">
    Difficulty
  </label>
  <select
    name="difficulty"
    id="difficulty"
    defaultValue="Easy"
    className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-300 rounded-md"
  >
    <option value="Very Easy">Very Easy</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
</div>

    {/* Submit Button */}
    <div className="lg:col-span-2">
      <button
        type="submit"
        className="w-full cursor-pointer my-4 p-3 font-medium text-white bg-lime-500 border border-lime-500 rounded-md"
      >
      {
         loading ? <LoaderPinwheel className="animate-spin mx-auto" /> : 
     "Save & Continue"
     }
      </button>
    </div>

  </div>
</form>
    </div>
  );
};

export default AddPlantForm;