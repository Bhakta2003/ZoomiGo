import { createContext, useState } from "react";
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';

export const VehicleContext = createContext()

const VehicleContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [bookings, setBookings] = useState([])
    const [dashData, setDashData] = useState(false)
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(false)

    const getBookings = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/vehicle/bookings', { headers: { dToken } })
            if (data.success) {
                setBookings(data.bookings)
                console.log(data.bookings)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    const completeBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/vehicle/complete-booking', { bookingId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getBookings()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const cancelBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/vehicle/cancel-booking', { bookingId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getBookings()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/vehicle/dashboard', { headers: { dToken } })
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }


    const getProfileData = async () => {
        
        try {

            const { data } = await axios.get(backendUrl + '/api/vehicle/profile', { headers: { dToken } })
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        bookings, setBookings,
        getBookings,
        completeBooking, cancelBooking,
        dashData, setDashData,
        getDashData,
        loading,
        profileData, setProfileData,
        getProfileData
    }

    return (
        <VehicleContext.Provider value={value}>
            {props.children}
        </VehicleContext.Provider>
    )
}

export default VehicleContextProvider