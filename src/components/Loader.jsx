import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center py-3 '>
      <div className='animate-spin duration-300 h-32 w-32 border-b-2  rounded-full '></div>
    </div>
  )
}

export default Loader