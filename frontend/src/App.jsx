import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyBookings from './pages/MyBookings'
import Booking from './pages/Booking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      {/* <ToastContainer /> */}
      <Toaster position="top-center" reverseOrder={false}/>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/vehicles/:type' element={<Vehicles />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/booking/:vehId' element={<Booking />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
