import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelBooking, dashData, completeBooking } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)


  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])



  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex flex-col items-center gap-2 bg-white p-4 min-w-52 min-h-52 rounded-4xl border-0 border-gray-200 cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-24' src={assets.vehicle_icon} alt="" />
          <div className='flex items-center gap-2 py-3 px-8  bg-blue-200 rounded-xl'>
            <p className='text-4xl font-semibold text-blue-500'>{dashData.vehicles}</p>
            <p className='text-blue-400 text-lg'>Vehicles</p>
          </div>
        </div>

        <div className='flex flex-col items-center gap-2 bg-white p-4 min-w-52 min-h-52 rounded-4xl border-0 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-24' src={assets.bookings_icon} alt="" />
          <div className='flex items-center gap-2 py-3 px-8  bg-blue-200 rounded-xl'>
            <p className='text-4xl font-semibold text-blue-500'>{dashData.bookings}</p>
            <p className='text-blue-400 text-lg'>Bookings</p>
          </div>
        </div>

        <div className='flex flex-col items-center gap-2 bg-white p-4 min-w-52 min-h-52 rounded-4xl border-0 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-24' src={assets.users_icon} alt="" />
          <div className='flex items-center gap-2 py-3 px-8  bg-blue-200 rounded-xl'>
            <p className='text-4xl font-semibold text-blue-500'>{dashData.users}</p>
            <p className='text-blue-400 text-lg'>Users</p>
          </div>
        </div>

      </div>

      <div className='bg-white rounded-2xl'>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-5 rounded-t border-0'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border-0'>
          {
            dashData.latestBookings.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 hover:scale-105 transition-all rounded-xl hover:shadow-2xl' key={index}>
                <img className='rounded-full w-10 bg-gray-100' src={item.vehData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.vehData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled
                  ? <p className='text-red-400 text-xs font-medium bg-red-100 py-1 px-2 rounded-full'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium bg-green-100 py-1 px-2 rounded-full'>Completed</p>
                    : <div className='flex'>
                      <img onClick={() => {cancelBooking(item._id),getDashData()}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={() => {completeBooking(item._id),getDashData()}} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>
                }
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Dashboard
