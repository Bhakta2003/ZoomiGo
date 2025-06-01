import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
import { VehicleContext } from '../context/VehicleContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(VehicleContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        localStorage.setItem('aToken', data.token)
        setAToken(data.token)
        navigate('/admin-dashboard')
        toast.success('Logged in successfully!')
      } else {
        toast.error(data.message)
      }

    } catch (error) {

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-0 rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-blue-500'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='bg-blue-500 text-white w-full py-2 rounded-md text-base'>Login</button>
        {/* {
          state === 'Admin'
            ? <p>Vehicle Login? <span className='text-blue-500 underline cursor-pointer' onClick={() => setState('Vehicle')}>Click here</span></p>
            : <p>Admin Login? <span className='text-blue-500 underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        } */}
      </div>
    </form>
  )
}

export default Login
