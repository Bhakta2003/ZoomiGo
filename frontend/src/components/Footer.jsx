import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm bg-gray-800 rounded-xl p-6'>
        {/*---------left section-------- */}
        <div>
            <img className='mb-5 w-40 rounded-xl' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-white leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate in praesentium corporis voluptate, id enim! Magni voluptatum quae, tempora alias animi eligendi, esse nostrum possimus vitae labore voluptatibus. Earum, quae.</p>
        </div>
        {/*---------middle section-------- */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-200'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-200'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/*---------right section-------- */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-200'>Get in touch</p>
          <ul className='flex flex-col gap-2 text-gray-200'>
            <li>+91-123-986-346</li>
            <li>abc123@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/*--------------copyright text----------- */}
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ZoomiGo . All Rights Reserved.</p> 
      </div>
    </div>
  )
}

export default Footer
