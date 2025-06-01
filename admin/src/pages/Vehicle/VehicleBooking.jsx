import React, { useContext, useEffect } from 'react'
import { VehicleContext } from '../../context/VehicleContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { HashLoader } from 'react-spinners';

const VehicleBooking = () => {

  const { dToken, appointments, getBookings, completeBooking, cancelBooking,loading } = useContext(VehicleContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getBookings()
    }
  }, [dToken])


  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <HashLoader
          color="#6af286"
          loading
          size={70}
          speedMultiplier={2}
        />
      </div>
    );
  }


  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Bookings</p>

      <div className='bg-white border-0 rounded text-sm min-h-[50vh] max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.reverse().map((item, index) => {
            return (
              <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                <p className='max-sm:hidden'>{index + 1}</p>
                <div className='flex items-center gap-2 '>
                  <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                </div>
                <div>
                  <p className='text-xs inline border border-[#43B17E] px-2 rounded-full'>
                    {item.payment ? 'Online' : 'Cash'}
                  </p>
                </div>
                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p>{currency}{item.amount}</p>
                {
                  item.cancelled
                    ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    : item.isCompleted
                      ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                      : <div className='flex'>
                        <img onClick={() => cancelBooking(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeBooking(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
                }

              </div>
            )
          })
        }


      </div>

    </div>
  )
}

export default VehicleBooking
