import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import razorpay_logo from '../assets/razorpay_logo.png'

const MyBookings = () => {
  const { backendUrl, token, getVehiclesData } = useContext(AppContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state
  const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const navigate = useNavigate()

  // Skeleton Loader Component
  const BookingSkeleton = () => (
    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300'>
      <div>
        <div className='w-52 h-32 bg-gray-200 rounded-xl animate-pulse'></div>
      </div>
      <div className='flex-1 text-md py-6 space-y-3'>
        <div className='h-5 bg-gray-200 rounded w-3/4 animate-pulse'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse'></div>
        <div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
      </div>
      <div className='flex flex-col gap-2 justify-end'>
        <div className='min-w-48 h-10 bg-gray-200 rounded animate-pulse'></div>
        <div className='min-w-48 h-10 bg-gray-200 rounded animate-pulse'></div>
      </div>
    </div>
  )

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserBookings = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } })

      if (data.success) {
        setBookings(data.bookings.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-booking', { bookingId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserBookings()
        getVehiclesData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order, bookingId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ZoomiGo",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razorpay`,
            { ...response, bookingId },
            { headers: { token } }
          );
          if (data.success) {
            toast.success("Payment successful!");
            getUserBookings();
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Payment failed");
        }
      },
      theme: {
        color: "#1C4FF7", // Match your brand
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const bookingRazorpay = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { bookingId },
        { headers: { token } }
      );
      console.log(data)
      if (data.success) {
        initPay(data.order, bookingId); // Pass bookingId to handler
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment initialization failed");
    }
  };



  useEffect(() => {
    if (token) {

      const timer = setTimeout(() => {
        getUserBookings()
      }, 500) // artificially 2 second delay
      return () => clearTimeout(timer)
    }
  }, [token])

  return (
    <div className='pt-25'>
      <p className='pb-3 mt-12 font-bold text-zinc-700 border-b border-gray-300 text-3xl'>My Bookings</p>

      {loading ? (
        // Show skeleton loaders while loading
        <div className='space-y-6'>
          {[...Array(3)].map((_, index) => (
            <BookingSkeleton key={index} />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        // Show actual bookings when loaded
        <div>
          {bookings.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300' key={index}>
              <div>
                <img className='w-52 bg-gray-50 rounded-xl border-0' src={item.vehData.image} alt="" />
              </div>
              <div className='flex-1 text-md text-zinc-600 py-6'>
                <p className='text-neutral-800 font-semibold'>{item.vehData.name}</p>
                <p>{item.vehData.type}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => bookingRazorpay(item._id)}
                    className='flex items-center justify-center gap-2 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-full hover:bg-[#43B17E] hover:text-white transition-all duration-300'
                  >
                    <img
                      src={razorpay_logo}
                      alt="Razorpay"
                      className="h-3 w-auto object-contain"
                    />
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelBooking(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-full hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel Booking</button>}
                {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Booking Cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Booking Completed</button>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show empty state when no bookings
        <div className='py-10 text-center text-gray-500'>
          You don't have any bookings yet.
        </div>
      )}
    </div>
  )
}

export default MyBookings