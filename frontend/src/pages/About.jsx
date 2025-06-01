import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='pt-30'>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[600px] rounded-lg object-contain' src={assets.about_image} alt="Our vehicle fleet" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to ZoomiGo, your trusted partner for convenient and reliable vehicle rentals. At ZoomiGo, we understand the importance of having the right vehicle for your needs, whether it's for business, family trips, or personal adventures.</p>
          <p>ZoomiGo is committed to excellence in vehicle rental services. We continuously strive to enhance our fleet, integrating the latest models and technologies to improve your driving experience. Whether you need a car for a day or a long-term rental, ZoomiGo is here to provide the perfect solution.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at ZoomiGo is to create seamless mobility solutions for every customer. We aim to bridge the gap between travelers and their destinations, making it easier for you to access quality vehicles at competitive prices.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 md:gap-2 lg:gap-4'>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-110'>
          <b>Quality Fleet</b>
          <p>Well-maintained, late-model vehicles for every need and budget.</p>
        </div>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-110'>
          <b>Flexible Options</b>
          <p>Short-term and long-term rentals with customizable packages.</p>
        </div>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-110'>
          <b>24/7 Support</b>
          <p>Round-the-clock assistance for all your rental needs and emergencies.</p>
        </div>
      </div>
    </div>
  )
}

export default About