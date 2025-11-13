import React from 'react'
import {sidebar} from '../Controllers/Sidebar'
import Link from 'next/link'

const randPost = await sidebar()

const SideBar = () => {
  return (
    <div>    <div className=''>

                    <div className="flex w-full flex-col text-bl">
                    <div className="divider divider-start divider-info pt-10">News Flash</div>
                    </div>
                    
                    <div className='grid sm:grid-cols-1 lg:grid-cols-1 text-gray-800 '>

                       {randPost.map((post)=>(

                     <Link href={`details/${post.id}`}   key={post.id}>
                    <div className='object-cover transform transition-transform duration-500 ease-in-out hover:scale-95  bg-blue-50 rounded-xl m-1 mb-4'>
                
                        <img src={post.image_url} className='rounded-xl' />
                       
                         <div className='p-3 font-bold text-blue-500'>
                        {post.title}
                       </div>
                    </div>
                    </Link>

                       ))}
                       
                    </div>
                
                </div></div>
  )
}

export default SideBar