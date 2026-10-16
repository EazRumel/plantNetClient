import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpeg";
import slide3 from "../assets/img/slide3.jpeg";

import "swiper/css";

import { Autoplay, Navigation } from "swiper/modules";

const Carousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative w-full">
      <Swiper
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
        className="mySwiper"
      >
        {[slide1, slide2, slide3].map((slide, index) => (
          <SwiperSlide key={slide}>
            <div className="relative">
              <img
                src={slide}
                alt={`Tree Planet featured plants ${index + 1}`}
                className="h-[450px] w-full object-cover sm:h-[550px] lg:h-[700px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

              {/* Hero text */}
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <div className="max-w-3xl text-white">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-green-100 sm:text-base">
                    Bring Nature Home
                  </p>

                  <h1 className="text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-7xl">
                    Grow Your Own
                    <span className="block text-green-200">
                      Little Paradise
                    </span>
                  </h1>

                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-lg">
                    Discover beautiful plants and bring a little more
                    greenery, freshness, and life into your space.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous arrow */}
      <button
        ref={prevRef}
        className="group absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-green-700 sm:left-8 sm:h-12 sm:w-12"
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft
          size={25}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </button>

      {/* Next arrow */}
      <button
        ref={nextRef}
        className="group absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-green-700 sm:right-8 sm:h-12 sm:w-12"
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight
          size={25}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </button>
    </section>
  );
};

export default Carousel;