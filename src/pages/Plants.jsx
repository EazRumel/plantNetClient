import { useState } from "react";
import { Leaf, House, Sun, Sprout, TreePine } from "lucide-react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import usePlants from "../hooks/usePlants";
import TabItems from "../components/TabItems";
import Parallax from "../components/Parallax";

const categories = [
  { name: "Indoor", icon: House, description: "Greenery for your home" },
  { name: "Succulent", icon: Sprout, description: "Small plants, big charm" },
  { name: "Outdoor", icon: TreePine, description: "Nature in the open air" },
  { name: "Herb", icon: Sun, description: "Freshness at your fingertips" },
];

const Plants = () => {
  const [plants = []] = usePlants();
  const [tabIndex, setTabIndex] = useState(0);

  const indoor = plants.filter((plant) => plant.category === "Indoor");
  const succulent = plants.filter(
    (plant) => plant.category === "Succulent"
  );
  const outdoor = plants.filter((plant) => plant.category === "Outdoor");
  const herb = plants.filter((plant) => plant.category === "Herb");

  const categoryPlants = [indoor, succulent, outdoor, herb];

  return (
    <main>
      {/* Hero Section */}
      <Parallax />

      {/* Plant Collection */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2">
            <Leaf size={16} className="text-green-600" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
              Explore Our Collection
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-800 sm:text-4xl lg:text-5xl">
            Find Your Perfect{" "}
            <span className="text-green-600">Plant</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            From leafy indoor companions to outdoor greenery and fresh herbs,
            discover plants that make your space feel more alive.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-green-500" />
        </div>

        {/* Category Tabs */}
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="mb-10 flex flex-wrap items-center justify-center gap-3 border-0 p-0">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const active = tabIndex === index;

              return (
                <Tab
                  key={category.name}
                  className="list-none cursor-pointer outline-none"
                  selectedClassName="selected-category-tab"
                >
                  <div
                    className={`group flex min-w-[135px] items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 sm:min-w-[155px] sm:px-5 ${
                      active
                        ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-700/15"
                        : "border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50/70"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-green-50 text-green-700 group-hover:bg-green-100"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {category.name}
                      </p>

                      <p
                        className={`mt-1 text-[10px] ${
                          active ? "text-green-50" : "text-gray-400"
                        }`}
                      >
                        {categoryPlants[index].length} plants
                      </p>
                    </div>
                  </div>
                </Tab>
              );
            })}
          </TabList>

          {/* Indoor Plants */}
          <TabPanel>
            <TabItems plants={indoor} />
          </TabPanel>

          {/* Succulents */}
          <TabPanel>
            <TabItems plants={succulent} />
          </TabPanel>

          {/* Outdoor Plants */}
          <TabPanel>
            <TabItems plants={outdoor} />
          </TabPanel>

          {/* Herbs */}
          <TabPanel>
            <TabItems plants={herb} />
          </TabPanel>
        </Tabs>
      </section>
    </main>
  );
};

export default Plants;