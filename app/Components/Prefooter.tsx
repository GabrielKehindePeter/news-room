import React from 'react'

const Prefooter = () => {
  return (
    <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 bg-gray-400 mb-30 mt-20'>
            <div className='col-span-2 p-4 text-black'>
                <h3 className='text-6xl text-white p-2 font-bold'>Need Money?</h3>
                <h4 className='text-4xl'>Now you have all it takes to make it!</h4>
                You can make money just by reading news on this platform. What to know how it works? You are just few steps away, just hit the button below to learn more
<br /><br />
                <button className='btn btn-lg bg-black text-light rounded-2xl hover:bg-blue-800'>Explore this opportunity</button>
            </div>
            <div className='p-4'>
                <img src='./imgs/sen.jpg' className='rounded-2xl w-full'/>
            </div>
        </div>
    </div>
  )
}

export default Prefooter