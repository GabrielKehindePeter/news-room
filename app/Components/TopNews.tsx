"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { fetchPosts } from "./Allposts"; // Ensure this returns an array of posts

const TopNews = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        if (mounted) setPosts(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadPosts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative bg-blue-800 p-4 text-white rounded-b-3xl">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-semibold">Good News Report</h2>
        <div className="flex items-center gap-4">
          <button
            ref={prevRef}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            ref={nextRef}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-6">Loading...</div>
      ) : error ? (
        <div className="text-center p-6">Failed to load posts.</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          onBeforeInit={(swiper) => {
            // Type-safe navigation assignment
            const nav = swiper.params.navigation as any;
            if (nav) {
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
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
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="p-3 border-2 border-blue-300 rounded-xl bg-blue-900/20 hover:bg-blue-900/40 transition">
              <Link href={`details/${post.id}`}>
                <div className="grid grid-cols-3 gap-3 items-center">
                  <div className="relative">
                    <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-lg">
                      56
                    </span>
                    <img
                      src={post.image_url || post.img}
                      alt={post.title}
                      className="h-16 w-16 rounded-xl object-cover border border-white/20"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-white font-semibold text-sm mb-1">{post.title}</h3>
                    <p className="text-gray-300 text-xs">{post.desc || post.description}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopNews;
