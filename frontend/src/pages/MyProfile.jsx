import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast'
import { HashLoader } from 'react-spinners'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false) // for spinner

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('imageFile', image)

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile', 
        formData, 
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
        setLoading(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // for spinner
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
    )
  }

  

  return userData && (
    <div className='max-w-lg flex flex-col text-sm pt-30'>
      {isEdit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img 
              className='w-36 rounded opacity-75' 
              src={image ? URL.createObjectURL(image) : (userData.image || assets.default_profile_icon)} 
              alt="Profile" 
            />
            <img 
              className='w-10 absolute bottom-12 right-12' 
              src={image ? '' : assets.upload_icon} 
              alt="Upload" 
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            hidden 
            accept="image/*"
          />
        </label>
      ) : (
        <img 
          className='w-36 rounded' 
          src={userData.image || assets.default_profile_icon} 
          alt="Profile" 
        />
      )}

      {isEdit ? (
        <input 
          className='bg-gray-100 text-3xl font-medium max-w-80 mt-4' 
          onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
          value={userData.name} 
          type='text' 
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] border-none' />
      
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-green-600'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input 
              className='bg-gray-100 max-w-52' 
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
              value={userData.phone} 
              type='text' 
            />
          ) : (
            <p className='text-green-600'>{userData.phone || 'Not set'}</p>
          )}
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select 
              className='max-w-20 bg-gray-100' 
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender || 'Not set'}</p>
          )}
          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input 
              className='max-w-28 bg-gray-100' 
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
              value={userData.dob} 
              type="date" 
            />
          ) : (
            <p className='text-gray-400'>{userData.dob || 'Not set'}</p>
          )}
        </div>
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button 
            className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all' 
            onClick={() => { updateUserProfileData(); setLoading(true) }}
          >
            Save Information
          </button>
        ) : (
          <button 
            className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all' 
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile