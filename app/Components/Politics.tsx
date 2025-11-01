import React from 'react'
import Link from 'next/link'
import {fetchpolitics} from '../Controllers/Politics'

const polpost = await fetchpolitics();
console.log(polpost)

const PoliticsPosts = () => {
  return (
    <div>
          <div className="flex w-full flex-col text-bl"><br />
                        <div className="divider divider-end divider-neutral pt-10 text-2xl text-black">Politics News</div>
                        </div>
                          <div>

                            <br />
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta natus harum doloribus odio quibusdam suscipit, eius tenetur cum officia accusamus consequatur molestiae voluptas, quisquam exercitationem. 
                                </p>
                            <br />
                         <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-gray-800 '>

                                {polpost.map((post)=>(
                                        <Link href={`/detail/${ post.id }}`}  key={post.id}>
                                            <div className='object-cover transform transition-transform duration-500 ease-in-out hover:scale-105  bg-blue-50 h-65 border-t-4 border-t-blue-600 m-1 mb-4' >

                                                <img src={post.image_url} className='' />
                                                
                                                    <div className='p-3 font-bold text-blue-500'>
                                                {post.title}
                                                </div>
                                            </div>
                                            </Link>
                                ))}
                                
                                </div>


                            </div>
    </div>
  )
}

export default PoliticsPosts