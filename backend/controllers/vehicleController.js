import vehicleModel from "../models/vehicleModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bookingModel from "../models/bookingModel.js"


const changeAvailability = async (req, res) => {
    try {

        const { vehId } = req.body

        const vehData = await vehicleModel.findById(vehId)
        await vehicleModel.findByIdAndUpdate(vehId, { available: !vehData.available })
        res.json({ success: true, message: 'Availablity Changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const vehicleList = async (req, res) => {
    try {
        const vehicles = await vehicleModel.find({}) //.select(['-password', '-email'])
        res.json({ success: true, vehicles })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for vehicle login
// const loginVehicle = async (req, res) => {

//     try {

//         const { email, password } = req.body
//         const vehicle = await vehicleModel.findOne({ email })

//         if (!vehicle) {
//             return res.json({ success: false, message: 'Invalid credentials' })
//         }

//         const isMatch = await bcrypt.compare(password, vehicle.password)

//         if (isMatch) {

//             const token = jwt.sign({ id: vehicle._id }, process.env.JWT_SECRET)
//             res.json({ success: true, token })
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }


//api to get vehicle bookings for vehicle dashboard
const bookingsVehicle = async (req, res) => {

    try {

        const { vehId } = req.body
        const bookings = await bookingModel.find({ vehId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to mark booking completed
const bookingComplete = async (req, res) => {

    try {

        const { vehId, bookingId } = req.body
        const bookingData = await bookingModel.findById(bookingId)

        if (bookingData && bookingData.vehId === vehId) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true })
            return res.json({ success: true, message: 'Booking Completed' })
        } else {
            return res.json({ success: false, message: 'Marking Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to cancel booking for vehicle panel
const bookingCancel = async (req, res) => {

    try {

        const { vehId, bookingId } = req.body
        const bookingData = await bookingModel.findById(bookingId)

        if (bookingData && bookingData.vehId === vehId) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })
            return res.json({ success: true, message: 'Booking Cancelled' })
        } else {
            return res.json({ success: false, message: 'Cancellation Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get dashboard data for vehicle panel
const vehicleDashboard = async (req, res) => {

    try {

        const { vehId } = req.body
        const bookings = await bookingModel.find({ vehId })

        let earnings = 0

        bookings.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let users = []

        bookings.map((item) => {
            if (!users.includes(item.userId)) {
                users.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            bookings: bookings.length,
            users: users.length,
            latestBookings: bookings.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get vehicle profile for vehicle panel
const vehicleProfile = async (req, res) => {

    try {

        const { vehId } = req.body
        const profileData = await vehicleModel.findById(vehId)

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to update vehicle profile for vehicle panel
const updateVehicleProfile = async (req, res) => {

    try {

        const { vehId, fees, stars, available } = req.body
        await vehicleModel.findByIdAndUpdate(vehId, { fees, stars, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailability,
    vehicleList,
    //loginVehicle,
    bookingsVehicle,
    bookingComplete,
    bookingCancel,
    vehicleDashboard,
    vehicleProfile,
    updateVehicleProfile
}