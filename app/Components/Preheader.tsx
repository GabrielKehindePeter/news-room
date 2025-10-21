import React from 'react'
import MarqueeText from './Scroll'
const Preheader = () => {
  return (
   <>
   <div className='grid grid-cols-6 p-1 border-b-2 border-blue-600'>
        <div className='border-r-2 border-white'>
          <h2 className='text-xl font-bold text-blue-600 text-center'>News Head Lines</h2> 
        </div> 
        <div className='sm:col-span-5 lg:col-span-4'>
           <MarqueeText />
        </div>
        <div className='text-xl text-center'>
            Social Icons
        </div>
   </div>
   </>
  )
}

export default Preheader