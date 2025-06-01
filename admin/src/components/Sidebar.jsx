import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { VehicleContext } from '../context/VehicleContext'

const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(VehicleContext)

  return (
    <div className='min-h-screen bg-white ml-8 mt-5 rounded-3xl shadow-sm'>


      {/* sidebar for admin */}
      {
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-black text-white m-4 rounded-2xl transition-all' : ''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-black text-white m-4 rounded-2xl transition-all' : ''}`} to={'/all-bookings'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Bookings</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-black text-white m-4 rounded-2xl transition-all' : ''}`} to={'/add-vehicle'}>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Vehicle</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-black text-white m-4 rounded-2xl transition-all' : ''}`} to={'/vehicle-list'}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Vehicles List</p>
          </NavLink>
        </ul>
      }


      {/* sidebar for vehicle */}
      {
        dToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-6 border-[#43B17E]' : ''}`} to={'/vehicle-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-6 border-[#43B17E]' : ''}`} to={'/vehicle-bookings'}>
            <img src={assets.booking_icon} alt="" />
            <p className='hidden md:block'>Bookings</p>
          </NavLink>
          
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-green-100 border-r-6 border-[#43B17E]' : ''}`} to={'/vehicle-profile'}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
