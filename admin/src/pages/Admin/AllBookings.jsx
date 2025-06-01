import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { VehicleContext } from '../../context/VehicleContext'

const AllBookings = () => {

  const { aToken, bookings, getAllBookings, cancelBooking,completeBooking} = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {
    if (aToken) {
      getAllBookings()
    }
  }, [aToken])


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-xl font-bold'>All Bookings</p>
      <div className='bg-white border-0 rounded-2xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-b-gray-200'>
          <p className='text-lg'>#</p>
          <p className='text-lg font-medium'>User</p>
          <p className='text-lg font-medium'>Date & Time</p>
          <p className='text-lg font-medium'>Vehicle</p>
          <p className='text-lg font-medium'>Fee</p>
          <p className='text-lg font-medium'>Actions</p>
        </div>

        {bookings.reverse().map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_2.5fr_1fr_1fr] items-center text-gray-500 py-4 px-6 border-b border-b-gray-200  hover:bg-gray-100 hover:scale-105 transition-all rounded-xl hover:shadow-2xl' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.vehData.image} alt="" /> <p>{item.vehData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium bg-red-100 py-1 px-5 rounded-full'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium bg-green-100 py-1 px-5 rounded-full'>Completed</p>
                : <div className='flex'>
                  <img onClick={() => cancelBooking(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeBooking(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
            }

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBookings
