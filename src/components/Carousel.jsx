// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from "../assets/img/slide1.jpg";

import slide2 from "../assets/img/slide2.jpeg";
import slide3 from "../assets/img/slide3.jpeg";
// import swipper from "../components/styles/swipper.css";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';
import { Autoplay, Navigation } from 'swiper/modules';

const Carousel = () => {
  return (
    <div className="w-full relative">
      <Swiper navigation={true} modules={[Navigation,Autoplay]} className="mySwiper" 
      autoplay={{
        delay:2000,
        pauseOnMouseEnter:true
      }}
      loop={true}
      >
        <SwiperSlide><img className="w-full" src={slide1} /></SwiperSlide>
        <SwiperSlide><img src={slide2} className="w-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src={slide3} className="w-full"  alt="" /></SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default Carousel;