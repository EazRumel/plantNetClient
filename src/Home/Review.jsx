import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';
import { Autoplay, Navigation } from 'swiper/modules';


const Review = () => {
  const [_rating, setRating] = useState(0)
  // console.log(rating)
   const [reviews,setReviews] = useState([])
   useEffect(()=>{
    fetch("http://localhost:3000/reviews")
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      setReviews(data)
    })
   },[])
  return (
    <div>
               <div className="m-24 mx-auto items-center ">
             <Swiper navigation={true} modules={[Navigation,Autoplay]} className="mySwiper"
             autoplay={
              {
              delay:2000,
              pauseOnMouseEnter:true
             }}loop={true}
             >
             
      {
        reviews.map(review =>(
<div className="mx-auto flex justify-center items-center">
  (<SwiperSlide key={review._id}>
  
  
  <div className="text-center">
    <h2 className="text-2xl  text-green-500">{review.name}</h2>
  <p className="my-5">{review.review}</p>
  </div>
  <Rating className="items-center flex justify-center mx-auto" style={{ maxWidth: 250 }} value={review.rating} onChange={setRating} />
  </SwiperSlide>)
</div>
        ))
      }
      </Swiper>
           </div>
    </div>
  );
};

export default Review;