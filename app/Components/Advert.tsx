import React from 'react'
import Link from 'next/link';

  const posts = [
    { id: 1, title: "ASSU set to allow some selected UNiversity to complete their Exams.", desc: "This is the description for this category", img: "./imgs/asuu.jpg" },
    { id: 2, title: "Nigeria bar association join Showole on the release namdi Kano protest", desc: "This is the description for this category", img: "./imgs/naijah-men.jpg" },
    { id: 6, title: "Nigeria bar association join Showole on the release namdi Kano protest", desc: "This is the description for this category", img: "./imgs/naijah-men.jpg" },
    { id: 3, title: "Aris presenter 'Oseni Rufai' clashes with the minister of work 'David Uhayi'", desc: "This is the description for this category", img: "./imgs/arise.jpg" },
    { id: 4, title: "I can fix Nigeria under four years says Peter Obi in United States", desc: "This is the description for this category", img: "./imgs/news.jpg" },
    { id: 5, title: "Nigerians celebrate as Nigeria qualifies for the 2026 world cup ", desc: "This is the description for this category", img: "./imgs/naijah-men.jpg" },
    { id: 7, title: "I can fix Nigeria under four years says Peter Obi in United States", desc: "This is the description for this category", img: "./imgs/news.jpg" },
    { id: 8, title: "Nigerians celebrate as Nigeria qualifies for the 2026 world cup ", desc: "This is the description for this category", img: "./imgs/naijah-men.jpg" },
    { id: 9, title: "I can fix Nigeria under four years says Peter Obi in United States", desc: "This is the description for this category", img: "./imgs/news.jpg" },
  ];

const Advert = () => {
  return (
    <div className='mt-30'>

<div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 p-4'>
    <div className='col-span-2 p-2 mt-10'>
  <div className="flex w-full flex-col text-bl">
    <div className="divider divider-start divider-primary pt-10 text-2xl text-primary">Trending</div>
</div>


{/* posts */}

   <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 text-center p-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="m-2 bg-white h-90 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-blue-50 rounded-lg shadow-md"
        >
          <img src={post.img} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
          <h3 className="text-lg text-gray-700 p-2 font-bold">{post.title}</h3>
          <Link href={`/posts/${post.id}`}>
            <button className="btn bg-blue-900 rounded-2xl btn-sm hover:bg-black text-white mt-2">
              Read More
            </button>
          </Link>
        </div>
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