import { Outlet } from "react-router-dom";
import Review from "./Review";


const Home = () => {
  return (
    <div>
       <h2 className="text-5xl mx-auto max">Home Page</h2>
       <Review></Review>
    </div>
  );
};

export default Home;