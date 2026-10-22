import { ArrowRight, Leaf, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import usePlants from "../hooks/usePlants";

const FeaturedPlants = () => {
  const [plants] = usePlants();

  const featuredPlant = plants.filter(
    (plant) => plant.isFeatured === true
  );

  return (
    <section className="mx-auto my-20 max-w-7xl px-5 sm:px-8 lg:px-10">
      {/* Section Heading */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2">
          <Leaf size={16} className="text-green-600" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
            Handpicked for You
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-gray-800 sm:text-4xl lg:text-5xl">
          Our Featured{" "}
          <span className="text-green-600">Plants</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
          Bring your space to life with our handpicked collection of beautiful
          plants. Find the perfect green companion for your home.
        </p>

        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-green-500" />
      </div>

      {/* Plant Cards */}
      {featuredPlant.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPlant.map((plant) => (
            <article
              key={plant._id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-100 hover:shadow-xl hover:shadow-green-900/10"
            >
              {/* Plant Image */}
              <div className="relative h-64 overflow-hidden bg-green-50 sm:h-72">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />

                {/* Featured Badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm backdrop-blur-md">
                  <Sprout size={14} />
                  Featured
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 rounded-2xl border border-white/30 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    ${plant.price}
                  </p>
                </div>
              </div>

              {/* Plant Details */}
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {plant.category}
                  </span>

                  <span className="text-xs font-medium text-gray-500">
                    {plant.difficulty}
                  </span>
                </div>

                <h3 className="truncate text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-700">
                  {plant.name}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs text-gray-400">Availability</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {plant.quantity > 0
                        ? `${plant.quantity} available`
                        : "Out of stock"}
                    </p>
                  </div>

                  <Link
                    to={`/plant/${plant._id}`}
                    className="group/button inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:shadow-green-700/20"
                  >
                    Details
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/button:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-green-200 bg-green-50/50 px-6 py-16 text-center">
          <Sprout size={36} className="mx-auto text-green-500" />

          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            No featured plants yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Check back soon to discover our featured collection.
          </p>
        </div>
      )}

      {/* View All Plants */}
      {featuredPlant.length > 0 && (
        <div className="mt-12 text-center">
          <Link
            to="/plants"
            className="group inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-7 py-3.5 text-sm font-semibold text-green-700 transition-all duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white"
          >
            Explore All Plants
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedPlants;