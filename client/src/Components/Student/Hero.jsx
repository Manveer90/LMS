import React from 'react'
import SearchBar from './SearchBar'



const Hero = () => {
  return (

    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-x-7 text-center bg-gradient-to-b from-cyan-100'>

      <h1 className='md:text-5xl text-2xl relative font-bold text-gray-800 max-w-3xl mx-auto mb-5'> Empower your future with the course designed to <span className='text-blue-600'> fit your chioce.</span> 
      </h1>
      
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'> We bring together world-class instructiors, interactive content, and a supportive community to help you achieve your personal and professional goals. </p>

       <p className='md:hidden text-gray-500 max-w-sm mx-auto  '>We bring together world-class instructiors to help you achieve your personal and professional goals.</p>
       <SearchBar/>
      
    </div>
  )
}

export default Hero