import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import { Autoplay, Navigation } from "swiper/modules";
import { MessageCircle, Leaf, Star, Sprout } from "lucide-react";

import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/navigation";

import PostReview from "../components/PostReview";
import "../components/FeaturedPlants.css";

const Review = () => {
  const [_rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Your original fetching logic — unchanged
  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 pt-28 pb-20">
      {/* Header Section */}
      <section className="px-5 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
          <MessageCircle size={32} strokeWidth={1.7} />
        </div>

        <div className="mb-3 flex items-center justify-center gap-2">
          <Leaf size={17} className="text-green-600" />
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
            Our Community
          </span>
          <Leaf size={17} className="text-green-600" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
          What People{" "}
          <span className="text-green-600">Say</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
          Every plant has a story, and every happy customer is part of ours.
          Discover what our plant-loving community thinks about Tree Planet.
        </p>

        <div className="mx-auto mt-7 flex items-center justify-center gap-2">
          <span className="h-1 w-12 rounded-full bg-green-300"></span>
          <Sprout size={22} className="text-green-600" />
          <span className="h-1 w-12 rounded-full bg-green-300"></span>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="mx-auto mt-14 max-w-6xl px-5 sm:px-10">
        {reviews.length > 0 ? (
          <div className="rounded-3xl border border-green-100 bg-white/80 px-5 py-10 shadow-[0_15px_60px_rgba(22,101,52,0.08)] backdrop-blur-sm sm:px-12 sm:py-14">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="review-swiper"
              autoplay={{
                delay: 3500,
                pauseOnMouseEnter: true,
              }}
              loop={reviews.length > 1}
              spaceBetween={30}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <div className="mx-auto flex max-w-3xl flex-col items-center px-3 py-4 text-center">
                    {/* Quote Icon */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <MessageCircle size={26} strokeWidth={1.6} />
                    </div>

                    {/* Decorative Stars */}
                    <div className="mb-5 flex gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={17}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="mb-8 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                      "{review.review}"
                    </p>

                    {/* Rating */}
                    <div className="mb-5">
                      <Rating
                        style={{ maxWidth: 130 }}
                        value={Number(review.rating) || 0}
                        readOnly
                      />
                    </div>

                    {/* Customer Name */}
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <Leaf size={23} />
                      </div>

                      <h2 className="text-xl font-bold text-gray-800">
                        {review.name}
                      </h2>

                      <span className="mt-1 text-sm font-medium text-green-600">
                        Tree Planet Community
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="rounded-3xl border border-green-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Leaf size={30} />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Your thoughts matter to us!
            </h2>

            <p className="mt-3 text-gray-500">
              Be the first to share your Tree Planet experience.
            </p>
          </div>
        )}
      </section>

      {/* Write Review Section */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-10">
        <div className="grid items-center gap-10 rounded-3xl bg-green-800 p-7 text-white shadow-xl sm:p-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side */}
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Sprout size={30} />
            </div>

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              Your Voice Matters
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Share Your
              <br />
              <span className="text-green-300">Plant Story.</span>
            </h2>

            <p className="mt-5 max-w-md leading-7 text-green-100">
              Your feedback helps our little green community grow. Tell us
              about your experience, share your thoughts, and inspire other
              plant lovers.
            </p>

            <div className="mt-7 flex items-center gap-3 text-sm font-medium text-green-100">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-800 bg-green-200 text-green-800">
                  <Leaf size={17} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-800 bg-lime-200 text-green-800">
                  <Sprout size={17} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-800 bg-emerald-200 text-green-800">
                  <Star size={17} />
                </span>
              </div>
              <span>Growing together, one review at a time.</span>
            </div>
          </div>

          {/* Right Side: Existing PostReview Component */}
          <div className="rounded-2xl bg-white p-6 text-gray-800 shadow-lg sm:p-8">
            <div className="mb-6 border-b border-gray-100 pb-5">
              <h3 className="text-2xl font-bold text-gray-800">
                Write a Review
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                We'd love to hear about your experience with Tree Planet.
              </p>
            </div>

            <PostReview />
          </div>
        </div>
      </section>

      {/* Bottom Message */}
      <section className="mt-16 px-5 text-center">
        <Leaf size={22} className="mx-auto text-green-600" />

        <p className="mt-3 text-sm font-medium text-gray-500">
          Thank you for helping our community grow greener. 🌿
        </p>
      </section>
    </main>
  );
};

export default Review;