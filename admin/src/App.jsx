import React, { useContext } from 'react'
import Login from './pages/Login'
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddVehicle from './pages/Admin/AddVehicle';
import VehiclesList from './pages/Admin/VehiclesList';
import { VehicleContext } from './context/VehicleContext';
import VehicleDashboard from './pages/Vehicle/VehicleDashboard';
import VehicleBooking from './pages/Vehicle/VehicleBooking';
import VehicleProfile from './pages/Vehicle/VehicleProfile';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(VehicleContext)

  return aToken || dToken ? (      //it means that if we have token then we dont need to display the login page as it means we are already logged in
    <div className='bg-[#f0f0f0]'>
      {/* <ToastContainer /> */}
      <Toaster position="top-center" reverseOrder={false}/>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin routes */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-bookings' element={<AllBookings />} />
          <Route path='/add-vehicle' element={<AddVehicle />} />
          <Route path='/vehicle-list' element={<VehiclesList />} />

          {/* Vehicle routes */}
          <Route path='/vehicle-dashboard' element={<VehicleDashboard />} />
          <Route path='/vehicle-bookings' element={<VehicleBooking />} />
          <Route path='/vehicle-profile' element={<VehicleProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>                {/*and if we dont have token we will disply both login and the toastcontainer*/}
      <Login />
      <Toaster position="top-center" reverseOrder={false}/>
      {/* <ToastContainer /> */}

    </>
  )
}

export default App
