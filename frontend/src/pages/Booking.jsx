import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ClipLoader } from 'react-spinners';
import { assets } from '../assets/assets';
import RelatedVehicles from '../components/RelatedVehicles';
// import { toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Booking = () => {

  const { vehId } = useParams()
  const { vehicles, currencySymbol, backendUrl, token, getVehiclesData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [vehInfo, setVehInfo] = useState(null)
  const [vehSlots, setVehSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const fetchVehInfo = async () => {
    const vehInfo = vehicles.find(veh => veh._id === vehId)
    setVehInfo(vehInfo)
  }

  const getAvailableSlots = async () => {
    setVehSlots([]);
    
    // Getting current date
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      // Setting end time of the date with index (9PM)
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9PM cutoff
  
      // Setting starting time (10AM)
      if (currentDate.getDate() === today.getDate()) {
        // If current day, start from next 3-hour block
        const currentHour = currentDate.getHours();
        if (currentHour < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          // Round up to next 3-hour block
          const nextBlock = Math.ceil((currentHour + 1) / 3) * 3;
          currentDate.setHours(nextBlock > 21 ? 21 : nextBlock, 0, 0, 0);
        }
      } else {
        // For future days, always start at 10AM
        currentDate.setHours(10, 0, 0, 0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
  
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
  
        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable = vehInfo.slots_booked[slotDate] && 
                              vehInfo.slots_booked[slotDate].includes(formattedTime) ? false : true;
  
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }
  
        // Increment by 3 hours
        currentDate.setHours(currentDate.getHours() + 3);
      }
  
      setVehSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookVehicle = async () => {
    if (!token) {
      toast.warn('Login to book vehicle')
      return navigate('/login')
    }

    try {
      const date = vehSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      // console.log(slotDate)

      const { data } = await axios.post(backendUrl + '/api/user/book-vehicle', { vehId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getVehiclesData()
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  useEffect(() => {
    getAvailableSlots()
  }, [vehInfo])

  useEffect(() => {
    fetchVehInfo()
  }, [vehicles, vehId])

  useEffect(() => {
    console.log(vehSlots)
  }, [vehSlots])

  {/* Using the spinner here befor the data is loading */ }
  if (!vehInfo) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#8eedbe" size={50} />
      </div>
    );
  }



  return vehInfo && (
    <div className='pt-30'>
      {/*-----------Vehicle details------------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-gray-100 w-full sm:max-w-112 rounded-3xl shadow-xl' src={vehInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-3xl p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* --------veh info: name, type , gear */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-900'>
            {vehInfo.name}
            {/* <img className='w-5' src={assets.verified_icon} alt="" /> */}
          </p>
          <div className='flex items-center gap-2 text-md mt-1 text-gray-600'>
            <p>{vehInfo.gear} • {vehInfo.type} • {vehInfo.stars}⭐</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{vehInfo.fuel}</button>
          </div>

          {/* --------vehicle about-------- */}
          <div>
            <p className='flex items-center gap-1 text-md font-medium text-gray-900'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-md text-gray-500 max-w-[700px] mt-1'>{vehInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Booking price: <span className='text-lg font-extrabold text-gray-600'>{currencySymbol}{vehInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ------booking slots */}
      <div className='sm:ml-62 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p className='mt-10 text-2xl'>Booking Slots Available</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            vehSlots.length && vehSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-30 rounded-4xl cursor-pointer ${slotIndex === index ? 'bg-yellow-300 text-gray-600 text-lg font-bold' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            vehSlots.length && vehSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-md font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-yellow-300 text-gray-600 font-bold text-xl' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button onClick={bookVehicle} className='bg-blue-500 text-white text-md font-medium px-14 py-3 rounded-full my-6'>Book a Vehicle</button>
      </div>

      {/* listing related doctors */}
      <RelatedVehicles vehId={vehId} type={vehInfo.type} />
    </div>
  )
}

export default Booking
