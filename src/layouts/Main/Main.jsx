
import { Outlet, useLocation } from 'react-router-dom';
import NavHomeBar from '../../shared/NavHomeBar';
import { Carousel, Footer } from 'flowbite-react';
import Review from '../../Home/Review';
import Footerrr from "../../shared/Footerrr";



const Main = () => {

  const location = useLocation();
  // console.log(location);

  const hideHeaderFooter = location.pathname.includes("/signUp") || location.pathname.includes("login");



  

  return (
    <div className="max-w-7xl mx-auto">

      <div className="">
        {hideHeaderFooter || <NavHomeBar ></NavHomeBar>  }
      </div>
      <Outlet></Outlet>
{hideHeaderFooter || <Footerrr></Footerrr>}
            
    </div>
  );
};

export default Main;