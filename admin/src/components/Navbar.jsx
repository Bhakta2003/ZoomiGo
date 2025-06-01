import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { VehicleContext } from '../context/VehicleContext'
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(VehicleContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
    <div className='bg-[#f0f0f0]'>
      {/* Add padding-top here to create space above navbar */}
      <div className='pt-6 bg-[#f0f0f0] px-8'> 
        <div className='flex justify-between items-center px-4 py-4 sm:px-3 border-0 bg-white rounded-3xl shadow-sm'>
          <div className='flex items-center gap-2 text-xs'>
            <img className='w-35 sm:w-40 cursor-pointer rounded-xl' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
              {aToken ? 'Admin' : 'Vehicle'}
            </p>
          </div>
          <button 
            onClick={()=>{logout(); toast.success('Logged out successfully!');}}
            className='bg-black text-white text-md px-10 py-4 rounded-full'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar