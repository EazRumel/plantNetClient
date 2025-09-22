import NavHomeBar from "../shared/NavHomeBar";
import Review from "./Review";


const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
     <NavHomeBar></NavHomeBar>
       <Review></Review>
    </div>
  );
};

export default Home;