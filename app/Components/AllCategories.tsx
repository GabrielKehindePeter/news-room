import React from "react";
import Link from "next/link";

const posts = [
  { id: 1, title: "ASSU set to allow some selected University to complete their Exams.", desc: "This is the description for this category", img: "/imgs/asuu.jpg" },
  { id: 2, title: "Nigeria bar association join Showole on the release namdi Kano protest", desc: "This is the description for this category", img: "/imgs/naijah-men.jpg" },
  { id: 6, title: "Nigeria bar association join Showole on the release namdi Kano protest", desc: "This is the description for this category", img: "/imgs/naijah-men.jpg" },
  { id: 3, title: "Aris presenter 'Oseni Rufai' clashes with the minister of work 'David Uhayi'", desc: "This is the description for this category", img: "/imgs/arise.jpg" },
  { id: 4, title: "I can fix Nigeria under four years says Peter Obi in United States", desc: "This is the description for this category", img: "/imgs/news.jpg" },
  { id: 5, title: "Nigerians celebrate as Nigeria qualifies for the 2026 world cup ", desc: "This is the description for this category", img: "/imgs/naijah-men.jpg" },
  { id: 7, title: "I can fix Nigeria under four years says Peter Obi in United States", desc: "This is the description for this category", img: "/imgs/news.jpg" },
  { id: 8, title: "Nigerians celebrate as Nigeria qualifies for the 2026 world cup ", desc: "This is the description for this category", img: "/imgs/naijah-men.jpg" },
];

const AllCategories = () => {
  return (
    <div className="p-4">
      <div className="w-full">
        <h2 className="pt-6 pb-4 text-2xl font-bold text-black">Sport and Entertainment Stories</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center">
        {posts.map((post) => (
          <Link href="#" key={post.id}>
            <div className="group m-2 bg-white overflow-hidden rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-50">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <h3 className="text-lg text-gray-700 font-bold">{post.title}</h3>
                {/* optional description:
                <p className="text-sm text-gray-500 mt-1">{post.desc}</p>
                */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center p-10">
        <button className="inline-block rounded-sm bg-blue-900 rounded-xl text-white px-6 py-2 hover:bg-black transition" role="button">
          Load more
        </button>
      </div>
    </div>
  );
};

export default AllCategories;
