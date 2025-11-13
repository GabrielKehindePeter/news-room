"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

const SliderDemo = () => {
  // refs for custom navigation
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const sliders = [
   {
    'id':1,
    'title':'Politics New',
    'desc':'This is the description for this category',
    'img':'./imgs/news.jpg'
   },
   { 
    'id':2,
    'title':'Entertainment News',
    'desc':'This is the description for this category',
    'img':'./imgs/event.jpg'
   },
   { 
    'id':3,
    'title':'Event',
    'desc':'This is the description for this category',
    'img':'./imgs/event.jpg'
   },
   { 
    'id':4,
    'title':'What is trending',
    'desc':'This is the description for this category',
    'img':'./imgs/news.jpg'
   },
   { 
    'id':5,
    'title':'Sport',
    'desc':'This is the description for this category',
    'img':'./imgs/sport.jpg'
   },
  ]

  return (
    <div className="relative bg-blue-800 pb-4 sm:mt-43 lg:mt-27">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-semibold pt-4">Featured Categories</h2>
      </div>
<div className="p-2">
     <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={4} // Default
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        // Custom navigation
          onInit={(swiper) => {
        const nav = swiper.params.navigation;
        if (nav && typeof nav !== "boolean") {
          nav.prevEl = prevRef.current;
          nav.nextEl = nextRef.current;
        }

  if (swiper.navigation && typeof swiper.navigation.init === "function") {
    swiper.navigation.init();
    if (typeof swiper.navigation.update === "function") {
      swiper.navigation.update();
    }
  }
}}

        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="text-gray-200"
      >

        {sliders.map((slider) => (

           <SwiperSlide key={slider.id} className=" p-2 border-2 border-blue-200 rounded-lg">
            <Link href="#">
            <div className="grid grid-cols-3">

            <div className="indicator">
              <span className="indicator-item indicator-middle badge badge-secondary rounded-lg">56</span>
                <img src={slider.img} className="bg-base-300 grid h-16 w-16 place-items-center rounded-4xl"/>
             
            </div>

          <div className="col-span-2">
            <h3 className="text-gray-400 text-sm">{slider.title}</h3>
            {slider.desc}
          </div>

            </div>
            </Link>
          </SwiperSlide>
          
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default SliderDemo;
