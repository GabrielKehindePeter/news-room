"use client"
import { fetchPosts } from "./Allposts";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";


export default function MarqueeText() {

    const [news, setNews] = useState([]); // start as array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let mounted = true;
      const load = async () => {
        try {
          setLoading(true);
          const data = await fetchPosts(); // fetchPosts should be async and return data (array)
// console.log(data)
          if (mounted) setNews(Array.isArray(data) ? data : []);
          console.log(news)
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


  const messages = [
    "🚀 Welcome to our website! lorem kjekke ekeke eke ekeke  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio",
    "💥 Enjoy amazing discounts today!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio",
    "🎉 New arrivals now available!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui consequatur odio",
    "🛍️ Free shipping on all orders!"
  ];

  return (
    <div className="marquee">
      <div className="marquee-content">
        {news.map((alert) => (
          <Link href={`details/${alert.id}`} key={alert.id} className="mx-8 text-gray-300 text-sm hover:text-orange-400">
            {alert.title}
           
          </Link>
        ))}
      </div>

    </div>
  );
}
