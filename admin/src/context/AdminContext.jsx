import { createContext, useState } from "react";
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllVehicles = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-vehicles', {}, { headers: { aToken } })
            if (data.success) {
                setVehicles(data.vehicles)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    const changeAvailability = async (vehId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { vehId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllVehicles()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllBookings = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })
            if (data.success) {
                setBookings(data.bookings)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const completeBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/complete-booking', { bookingId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllBookings()
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

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-booking', { bookingId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllBookings()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getDashData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl,
        vehicles,
        getAllVehicles,
        changeAvailability,
        loading,
        bookings, setBookings,
        getAllBookings,
        completeBooking,
        cancelBooking,
        dashData, getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider