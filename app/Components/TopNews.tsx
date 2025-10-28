"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MoveRight, MoveLeft } from "lucide-react";
import Link from "next/link";
import { fetchPosts } from "./Allposts"; // ensure fetchPosts is exported and returns an array

const TopNews = () => {
  const [posts, setPosts] = useState([]); // start as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(); // fetchPosts should be async and return data (array)
        if (mounted) setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("fetchPosts error:", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // fallback static slides if posts is empty (optional)
  const staticSlides = [
    { id: 1, title: "ASSU set to allow some selected University...", img: "/imgs/asuu.jpg" },
    { id: 2, title: "Nigeria bar association join Showole...", img: "/imgs/naijah-men.jpg" },
    { id: 3, title: "Aris presenter clashes with minister...", img: "/imgs/arise.jpg" },
    { id: 4, title: "I can fix Nigeria under four years says Peter Obi...", img: "/imgs/news.jpg" },
    { id: 5, title: "Nigerians celebrate as Nigeria qualifies for 2026...", img: "/imgs/naijah-men.jpg" },
  ];

  const slides = posts.length ? posts : staticSlides;

  return (
    <div className="relative bg-blue-800 p-4 text-white h-90 rounded-b-full" id="slidepost">
      <br />
      <div className="flex items-center justify-between mb-4 px-4 pt-4">
        <h2 className="text-xl font-semibold">Good News Report</h2>

        <div className="flex items-center gap-6">
          <button ref={prevRef} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Previous">
            <MoveLeft />
          </button>
          <button ref={nextRef} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Next">
            <MoveRight />
          </button>
        </div>
      </div>

      <div className="p-2">
        {loading ? (
          <div className="text-center p-6">Loading...</div>
        ) : error ? (
          <div className="text-center p-6">Failed to load posts.</div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={1}
            slidesPerView={4}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="text-gray-200"
          >
            {slides.map((slider) => (
              <SwiperSlide key={slider.id} className="p-2 rounded-lg text-blue-500">
                <Link href="#" aria-label={slider.title}>
                  <div className="object-cover transform transition-transform duration-500 ease-in-out hover:scale-110">
                    <div className="bg-white pb-8 h-90 text-center rounded-t-2xl">
                      <img src={slider.image_url} alt={slider.title} className="rounded-t-2xl w-full h-40 object-cover" />
                      <div className="p-2">
                        <h3 className="font-semibold mb-1">{slider.title}</h3>
                        <p className="text-sm">Posted on {slider.created_at}</p>
                        <div className="mt-4">
                          <button className="btn bg-blue-900 rounded-2xl btn-sm hover:bg-black">Read More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TopNews;
