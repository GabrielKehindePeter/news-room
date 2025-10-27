import React from 'react'

import { supabase } from "@/app/supabaseClient";

const BlogFront = async() => {


    const { data, error } = await supabase
                .from('blog')
                .select()
                .order('id', { ascending: false })
                .range(0, 10)

                if(error){
                    console.log('an error occured: '+ error);
                }else{
                    console.log(data)
                }
  return (
    <>
        <div className='bg-gray-200 pt-15 text-blue-700'>
            <div className='grid sm:grid-cols-1 lg:grid-cols-3 sm:p-4 lg:p-8 '>
                <div className='sm:col-span-1 lg:col-span-2 p-6 pt-2'>
                  <div>
                     <img src="./imgs/sen.jpg" className='rounded-xl' />
                    <h2 className='text-5xl text-gray-800 pt-4 pb-4'>Nigeria state approves professor Joash Asumpita as new Nigeria INEC chairman</h2>
                    <hr className='border-2'/><br />
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati explicabo exercitationem reprehenderit? Nesciunt iste mollitia aliquam sapiente distinctio voluptatibus rerum debitis fuga eos sunt dolorem, accusantium atque! Quas, molestiae tempore?
                </div>

                <div className='p-4 bg-gray-300 rounded-lg mt-10'>
                       
                       
                       <div className="flex w-full flex-col text-bl">
                    <div className="divider divider-start divider-neutral pt-10 text-2xl text-black">Top Story</div>
                    </div>

                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 '>
                        <div className='p-2'>
                        <img src="./imgs/asuu.jpg" className='rounded-xl' />
                        </div>
                         <div className='p-2 text-2xl text-gray-700'>
                        ASSU Strike hits day 4 as federal government insist on granting their demand for resumption
                        <p className='text-sm pt-6 text-primary'>Poseted: Oct. 4:19:39 PM </p>
                       </div>
                </div>
                </div>

                </div>

                <div className='p-4 bg-gray-300 rounded-lg'>
                   
                    
                    <div className=''>

                    <div className="flex w-full flex-col text-bl">
                    <div className="divider divider-start divider-info pt-10">Trending News</div>
                    </div>
                    
                    <div className='grid sm:grid-cols-1 lg:grid-cols-2 text-gray-800 '>

                       {data.map((post)=>(


                    <div className='object-cover transform transition-transform duration-500 ease-in-out hover:scale-95  bg-blue-50 rounded-xl m-1 mb-4'  key={post.id}>
                
                        <img src={post.image_url} className='rounded-xl' />
                       
                         <div className='p-3 font-bold text-blue-500'>
                        {post.title}
                       </div>
                    </div>

                       ))}
                       
                       
                      
                        



                    </div>
                   











                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BlogFront