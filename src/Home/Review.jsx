import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';
import { Navigation } from 'swiper/modules';


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
             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
             
      {
        reviews.map(review =>(
<div className="mx-auto flex justify-center items-center">
  (<SwiperSlide key={review._id}>
  
  
  <h2 className="text-2xl text-green-500">{review.name}</h2>
  <p className="">{review.review}</p>
  <Rating style={{ maxWidth: 250 }} value={review.rating} onChange={setRating} />
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