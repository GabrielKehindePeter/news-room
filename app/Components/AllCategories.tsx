"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPosts } from "./Allposts"; // keep as-is if this returns a Promise of posts

interface Post {
  id: string | number;
  title?: string;
  image_url?: string;
  img?: string;
  desc?: string;
  // add other known fields here
}

const AllCategories: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]); // <-- typed here
  const [rows, setRows] = useState<number>(4); // starting items to show

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchPosts();
        // only set state if mounted and data is an array
        if (mounted && Array.isArray(data)) {
          // Narrow to Post[] for TS safety
          setAllPosts(data as Post[]);
        }
      } catch (err) {
        console.error("error occurred:", err);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // slice posts to show only "rows" count
  const visiblePosts = allPosts.slice(0, rows);

  return (
    <div className="p-4">
      <div className="w-full">
        <h2 className="pt-6 pb-4 text-2xl font-bold text-black">
          Sport and Entertainment Stories
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(150px,auto)]">
        {visiblePosts.map((post, index) => {
          const isSecond = index === 1;
          const cardClass = `group m-2 bg-white overflow-hidden rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-200 h-75 ${
            isSecond ? "sm:col-span-1 lg:col-span-2 lg:row-span-2" : ""
          }`;

          const imgSrc = post.image_url ?? post.img ?? "/placeholder.jpg"; // fallback image
          const title = post.title ?? "Untitled";

          return (
            <Link href="#" key={post.id ?? index}>
              <div className={cardClass}>
                <img src={imgSrc} alt={title} className="w-full object-cover" loading="lazy" />
                <div className="p-3">
                  <h3 className="text-lg text-gray-700 font-bold">{title}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center p-10">
        <button
          onClick={() => setRows((prev) => prev + 4)} // load 4 more each click
          className="inline-block bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-black transition"
          type="button"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default AllCategories;
