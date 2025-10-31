"use client"
import React from 'react'
import Link from 'next/link';
import { fetchPosts } from "./Allposts";
import { useState } from 'react';

 const trend = await fetchPosts(); 
//  console.log(trend)

const Advert = () => {

  return (
    <div className='mt-30'>

<div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 p-4'>
    <div className='col-span-2 p-1 mt-10'>
      <div className="flex w-full flex-col text-bl">
        <div className="divider divider-start divider-primary pt-10 text-2xl text-primary">Trending</div>
    </div>


{/* posts */}

   <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 text-center p-1">
      {trend.map((post) => (
        <Link href={`details/${post.id}`}
          key={post.id}
          className="m-2 bg-white h-75 object-cover transform transition-transform duration-500 ease-in-out text-gray-700 hover:scale-110 hover:bg-blue-50 rounded-lg shadow-md hover:text-blue-600"
        >
          <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
          <h3 className="text-lg p-2 font-bold">{post.title}</h3>
        </Link>
      ))}
    </div>



    </div>

  

<div  className="p-4 bg-blue-100 rounded-t-2xl">
      <div>
    <div className="divider divider-start divider-primary pt-5 text-2xl text-primary">Advertise with us</div>
</div><br />
<p className=' text-black'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nostrum exercitationem explicabo labore id iure est, ut perferendis corrupti odit hic earum fugit iste ve
</p><br />
<img src='imgs/travel guide.png' />
<p className='pt-4 text-black'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, perferendis amet repellat, esse necessitatibus asperiores sunt, autem voluptates fugit itaque vitae sit. Dolorum nobis nam ne
</p>


<p className='pt-10 text-orange-500 text-xl'>To place advert kindly contact us through any of these options</p><br />
<ul className='text-black'>
    <li>Email: advert@bulletin.com</li>
    <li>Phone Call: 08130146023</li>
    <li>Whatsapp: 08130146023</li>
</ul>
</div>

    </div>
</div>
  )
}

export default Advert