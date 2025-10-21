"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChevronLeft, ChevronRight,MoveRight,MoveLeft  } from "lucide-react"; // lightweight icon library
import Link from "next/link";

const TopNews = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const sliders = [
    { id: 1, title: "ASSU set to allow some selected UNiversity to complete their Exams.", desc: "This is the description for this category", img: "./imgs/asuu.jpg" },
    { id: 2, title: "Nigeria bar association join Showole on the release namdi Kano protest", desc: "This is the description for this category", img: "./imgs/naijah-men.jpg" },
    { id: 3, title: "Aris presenter 'Oseni Rufai' clashes with the minister of work 'David Uhayi'", desc: "This is the description for this category", img: "./imgs/arise.jpg" },
    { id: 4, title: "I can fix Nigeria under four years says Peter Obi in United States", desc: "This is the description for this category", img: "./imgs/news.jpg" },
    { id: 5, title: "Nigerians celebrate as Nigeria qualifies for the 2026 world cup ", desc: "This is the description for this category", img: "./imgs/naijah-men.jpg" },
  ];

  return (
    <div className="relative bg-blue-800 p-4 text-white h-90 rounded-b-full" id="slidepost">
        <br />
      <div className="flex items-center justify-between mb-4 px-4 pt-4">
        <h2 className="text-xl font-semibold">Good New Report</h2>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <MoveLeft />
          </button>
          <button
            ref={nextRef}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <MoveRight />
          </button>
        </div>
      </div>

      <div className="p-2">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="text-gray-200"
        >
          {sliders.map((slider) => (
 <SwiperSlide
              key={slider.id}
              className="p-2 rounded-lg text-gray-700"
            >
              <Link href="#">
                <div>
                    <div className=" bg-white pb-8 h-90 text-center rounded-t-2xl">
                    <img src={slider.img} className="rounded-t-2xl" />
                <div className="p-2">
                  <h3 className="font-semibold mb-1">{slider.title}</h3>
                 
                  {/* <p className="text-sm">{slider.desc}</p> */}
                  <p className=" text-sm">Posted on 21/10/2025</p>
                 <div className="mt-4">
                  <button className="btn btn-primary rounded-2xl btn-sm hover:bg-black">Read More</button>
                  </div>
                  </div>
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

export default TopNews;
