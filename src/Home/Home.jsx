import { Footer } from "flowbite-react";
import Footerrr from "../shared/Footerrr";
import Carousel from "../components/Carousel";
import NavHomeBar from "../shared/NavHomeBar";
import Review from "./Review";
import FeaturedPlants from "../components/FeaturedPlants";


const Home = () => {
  return (
    <div>
      {/* <div className="mt-10">
        <NavHomeBar ></NavHomeBar>
      </div> */}
      <Carousel></Carousel>
      <FeaturedPlants></FeaturedPlants>
    <Review></Review>
{/* <Footerrr></Footerrr> */}
   
    </div>
  );
};

export default Home;