import { useState } from "react";
import PageCard from "../components/PageCard";
import usePlants from "../hooks/usePlants";

import { Home, Leaf, TreePine } from "lucide-react";

// import { TabItem, Tabs } from "flowbite-react";
// import { Home , TreePine , Leaf} from "lucide-react";



import { GiCactus } from "react-icons/gi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TabItems from "../components/TabItems";
import Parallax from "../components/Parallax";




const Plants = () => {
  const [plants] = usePlants();
   const [tabIndex, setTabIndex] = useState(0);




  
  const indoor = plants.filter(indoor=>indoor.category == "Indoor");
  const succulent = plants.filter(succulent=>succulent.category =="Succulent")
  const outdoor = plants.filter(outdoor =>outdoor.category == "Outdoor")
  const herb = plants.filter(herb=>herb.category == "Herb")

  // console.log(indoor)
  // console.log(succulent)
  // console.log(outdoor)
  // console.log(herb)
  return (
   <div>
         <Parallax></Parallax>
  <Tabs selectedIndex={tabIndex}  onSelect={(index) => setTabIndex(index)}>
      <TabList className="flex gap-4 mx-auto my-20 justify-center ">


       <Tab className="p-0">
  <div
    className="
      relative px-4 py-2
      border border-gray-300 rounded-md
      cursor-pointer group
      transition-colors duration-200
      hover:border-green-500
    "
  >
    {/* Text */}
    <span className="text-gray-700 group-hover:text-green-600 transition-colors">
      Indoor
    </span>

    {/* Underline */}
    <span
      className="
        absolute left-2 right-2 bottom-1
        h-[2px] bg-green-500
        transform scale-x-0 origin-left
        transition-transform duration-300 ease-out
        group-hover:scale-x-100
      "
    ></span>
  </div>
</Tab>



        <Tab className="p-0">
  <div
    className="
      relative px-4 py-2
      border border-gray-300 rounded-md
      cursor-pointer group
      transition-colors duration-200
      hover:border-green-500
    "
  >
    {/* Text */}
    <span className="text-gray-700 group-hover:text-green-600 transition-colors">
      Succulent
    </span>

    {/* Underline */}
    <span
      className="
        absolute left-2 right-2 bottom-1
        h-[2px] bg-green-500
        transform scale-x-0 origin-left
        transition-transform duration-300 ease-out
        group-hover:scale-x-100
      "
    ></span>
  </div>
</Tab>

       <Tab className="p-0">
  <div
    className="
      relative px-4 py-2
      border border-gray-300 rounded-md
      cursor-pointer group
      transition-colors duration-200
      hover:border-green-500
    "
  >
    {/* Text */}
    <span className="text-gray-700 group-hover:text-green-600 transition-colors">
      Outdoor
    </span>

    {/* Underline */}
    <span
      className="
        absolute left-2 right-2 bottom-1
        h-[2px] bg-green-500
        transform scale-x-0 origin-left
        transition-transform duration-300 ease-out
        group-hover:scale-x-100
      "
    ></span>
  </div>
</Tab>


        <Tab className="p-0">
  <div
    className="
      relative px-4 py-2
      border border-gray-300 rounded-md
      cursor-pointer group
      transition-colors duration-200
      hover:border-green-500
    "
  >
    {/* Text */}
    <span className="text-gray-700 group-hover:text-green-600 transition-colors">
    Herb
    </span>

    {/* Underline */}
    <span
      className="
        absolute left-2 right-2 bottom-1
        h-[2px] bg-green-500
        transform scale-x-0 origin-left
        transition-transform duration-300 ease-out
        group-hover:scale-x-100
      "
    ></span>
  </div>
</Tab>


      </TabList>
      <TabPanel>
        <TabItems plants={indoor}></TabItems>
      </TabPanel>
      <TabPanel >
        <TabItems plants={succulent}></TabItems>
      </TabPanel>
      <TabPanel >
        <TabItems plants={outdoor}></TabItems>
      </TabPanel>
      <TabPanel >
        <TabItems plants={herb}> </TabItems>
      </TabPanel>
    </Tabs>

    
   </div>
  );
};

export default Plants;


{/* <Tabs aria-label="Tabs with underline" variant="underline"
       className="text-green-600 [&_[aria-selected=true]]:text-green-600 [&_[aria-selected=true]]:border-green-600"
       >
       <TabItem

       title="All"
         active={activeCategory==="All"}
         onClick={()=> setActiveCategory("All")}

       >
         
       </TabItem>
      <TabItem  title="Indoor" icon={Home}
    active={activeCategory === "Indoor"}
      onClick={() => setActiveCategory("Indoor")  }
      
      
      >
        
     
      </TabItem>
      <TabItem title="Succulent" icon={GiCactus} 
      onClick={() => setActiveCategory("Succulent")  }
       active={activeCategory === "Succulent"}
      >
        
      </TabItem>
      <TabItem title="Outdoor" icon={TreePine} 
      onClick={() => setActiveCategory("Outdoor")  }
      active={activeCategory === "Outdoor"}
      >
        
      
      </TabItem>
      <TabItem title="Herb" icon={Leaf}  
      onClick={() => setActiveCategory("Herb")  }
      active={activeCategory === "Herb"}
      >
       
      
      </TabItem>
      
    </Tabs> */}

      {/* {
        succulent.map(plant=>(
          <div className="">
            <PageCard plant={plant} key={plant._id}></PageCard>
          </div>
        ))
      }
      {
        outdoor.map(plant=>(
          <div className="">
            <PageCard plant={plant} key={plant._id}></PageCard>
          </div>
        ))
      }
      {
        herb.map(plant=>(
          <div className="">
            <PageCard plant={plant} key={plant._id}></PageCard>
          </div>
        ))
      } */}
 
