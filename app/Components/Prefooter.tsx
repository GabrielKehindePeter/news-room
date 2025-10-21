import React from 'react'

const Prefooter = () => {
  return (
    <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 bg-gray-400 mb-30 mt-20'>
            <div className='col-span-2 p-4 text-black'>
                <h3 className='text-6xl text-blue-600'>Need Money?</h3>
                <h4 className='text-4xl'>Now you have all it takes to make it!</h4>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit laboriosam totam architecto, sequi consectetur quidem sunt quos explicabo error ipsum aliquam quo commodi alias animi libero minima illo culpa officiis.
<br /><br />
                <button className='btn btn-lg bg-black text-light rounded-2xl hover:bg-blue-800'>Explore this opportunity</button>
            </div>
            <div className='p-4'>
                <img src='./imgs/sen.jpg' className='rounded-2xl'/>
            </div>
        </div>
    </div>
  )
}

export default Prefooter