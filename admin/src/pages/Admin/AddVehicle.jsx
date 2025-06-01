import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
// import { toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { HashLoader } from 'react-spinners';


const AddVehicle = () => {

  const [vehImg, setVehImg] = useState(false)
  const [name, setName] = useState('')
  const [fuel, setFuel] = useState('')
  const [stars, setStars] = useState('1')
  const [seats, setSeats] = useState('')
  const [fee, setFee] = useState('')
  const [about, setAbout] = useState('')
  const [type, setType] = useState('Car')
  const [gear, setGear] = useState('')
  const [loading, setLoading] = useState(false);


  const { backendUrl, aToken } = useContext(AdminContext)


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true);

    try {
      if (!vehImg) {
        return toast.error('Image not selected')
      }

      if (!fee || isNaN(Number(fee))) {
        setLoading(false);
        return toast.error('Please enter a valid fee amount');
      }

      const formData = new FormData()   //here creating a formdata constructor

      //and here appending data as key-value items in formdata 
      formData.append('image', vehImg)
      formData.append('name', name)
      formData.append('fuel', fuel)
      formData.append('stars', stars)
      formData.append('fees', Number(fee))
      formData.append('seats', Number(seats))
      formData.append('about', about)
      formData.append('type', type)
      formData.append('gear', gear)


      //console logging
      // formData.forEach((value,key)=>{
      //   console.log(`${key} : ${value}`);
      // })

      //axios.post taking (url,data,configuration) where data & config are optional in arguments
      const { data } = await axios.post(backendUrl + '/api/admin/add-vehicle', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setVehImg(false)
        setName('')
        setSeats('')
        setAbout('')
        setFee('')
        setFuel('')
        setGear('')
        setStars('1')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)

    } finally {
      setLoading(false);
    }
  }

  //for spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <HashLoader
          color="#60B5FF"
          loading
          size={70}
          speedMultiplier={2}
        />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-xl font-bold'>Add Vehicle</p>

      <div className='bg-white px-8 py-8 border-0 rounded-2xl w-full max-w-4xl max-h-[120vh] overflow-y-scroll shadow-sm'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="veh-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={vehImg ? URL.createObjectURL(vehImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setVehImg(e.target.files[0])} type="file" id="veh-img" hidden />
          <p>Upload vehicle <br />picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Vehicle Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Vehicle Seats</p>
              <input onChange={(e) => setSeats(e.target.value)} value={seats} className='border border-gray-300 rounded px-3 py-2' type="number" placeholder='Seats' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Vehicle fuel</p>
              <input onChange={(e) => setFuel(e.target.value)} value={fuel} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Fuel' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Stars</p>
              <select onChange={(e) => setStars(e.target.value)} value={stars} className='border border-gray-300 rounded px-3 py-2' name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                {/* <option value="5">5⭐</option> */}
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFee(e.target.value)} value={fee} className='border border-gray-300 rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Type</p>
              <select onChange={(e) => setType(e.target.value)} value={type} className='border border-gray-300 rounded px-3 py-2' name="" id="">
                <option value="Car">Car</option>
                <option value="Scooter">Scooter</option>
                <option value="Bike">Bike</option>
                <option value="Suv">Suv</option>
                <option value="Sports Bike">Sports Bike</option>
                <option value="Van">Van</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Gear</p>
              <input onChange={(e) => setGear(e.target.value)} value={gear} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Gear' required />
            </div>

          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Vehicle</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border border-gray-300 rounded' placeholder='Write about vehicle' rows={5} required />
        </div>

        <button type='submit' className='bg-black px-10 py-3 mt-4 text-white rounded-full hover:scale-105 transition-all'>Add Vehicle</button>

      </div>
    </form>
  )
}

export default AddVehicle
