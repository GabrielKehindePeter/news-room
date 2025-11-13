import React from 'react'
import Link from 'next/link';
import { supabase } from "@/app/supabaseClient";
import PoliticsPosts from "./Politics"
import SideBar from './SideBar';

const BlogFront = async() => {


    const { data, error } = await supabase
                .from('blog')
                .select()
                .order('id', { ascending: false })
                // .range(0, 5)

                if(error){
                    console.log('an error occured: '+ error);
                }
  return (
    <>
        <div className='bg-gray-200 pt-15 text-blue-700'>
            <div className='grid sm:grid-cols-1 lg:grid-cols-3 sm:p-4 lg:p-8 '>
                <div className='sm:col-span-1 lg:col-span-2 p-6 pt-2'>
                  <div>
                     <img src="https://nwcgqudzhmjezprflpdb.supabase.co/storage/v1/object/public/blog/blogs/1761961041011_kjdjk.jpg" className='rounded-xl' />
                    <h2 className='text-5xl text-gray-800 pt-4 pb-4'>FULL LIST: Tinubu Reverses Maryam Sanda’s Pardon, Reduces Sentence To 12 Years</h2>
                    <hr className='border-2'/><br />
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati explicabo exercitationem reprehenderit? Nesciunt iste mollitia aliquam sapiente distinctio voluptatibus rerum debitis fuga eos sunt dolorem, accusantium atque! Quas, molestiae tempore?
                </div>

                <div className='p-4 bg-gray-300 rounded-lg mt-10'>
                       
                       
                       <div className="flex w-full flex-col text-bl">
                    <div className="divider divider-start divider-neutral pt-10 text-2xl text-black">Top Story</div>
                    </div>

                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 '>
                        <div className='p-2'>
                        <img src="https://nwcgqudzhmjezprflpdb.supabase.co/storage/v1/object/public/blog/blogs/1761961863114_Untitled-design-2025-10-28T221411.179.png" className='rounded-xl' />
                        </div>
                         <div className='p-2 text-2xl text-gray-700'>
                       Shaibu, Omobayo Clash Over Who Represents Edo At Former Deputy Governors’ Forum
                        <p className='text-sm pt-6 text-primary'>Poseted: Oct. 4:19:39 PM </p>
                       </div>

                </div>

                </div>
                  <PoliticsPosts />
                            </div>

                  

                <div className='p-4 bg-gray-300 rounded-lg'>
                   
                    
                <SideBar />
                </div>
            </div>
        </div>
    </>
  )
}

export default BlogFront