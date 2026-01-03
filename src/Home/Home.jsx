import Carousel from "../components/Carousel";
import NavHomeBar from "../shared/NavHomeBar";
import Review from "./Review";


const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
     <NavHomeBar></NavHomeBar>
      <div className="my-20">
      <Carousel></Carousel>
         <Review></Review>
         
      </div>
    </div>
  );
};

export default Home;