import validator from "validator";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import vehicleModel from '../models/vehicleModel.js'
import jwt from 'jsonwebtoken'
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";

//API for adding vehicle
const addVehicle = async (req, res) => {
    try {
        const { name, stars, seats, type, gear, fuel, about, fees } = req.body
        const imageFile = req.file

        //checking for all data to add vehicle to database
        if (!name || !stars || !seats || !type || !gear || !fuel || !about || !fees) {
            return res.json({ success: false, message: "Missing Details" });
        }


        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url



        const vehicleData = {
            name,
            stars,
            seats,
            image: imageUrl,
            type,
            gear,
            fuel,
            about,
            fees,
            date: Date.now()
        }

        const newVehicle = new vehicleModel(vehicleData)
        await newVehicle.save()

        res.json({ success: true, message: "Vehicle Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get all vehicles list for admin panel
const allVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleModel.find({}) //.select('-password')
        res.json({ success: true, vehicles })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get all bookings list
const bookingsAdmin = async (req, res) => {

    try {
        const bookings = await bookingModel.find({}) //all the bookings
        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for booking cancellation
const bookingCancel = async (req, res) => {
    try {

        const { bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)


        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        //releasing vehicle slot, as ,if booking is cancelled then vehicle dont have the booking in that particular day or time
        const { vehId, slotDate, slotTime } = bookingData

        const vehicleData = await vehicleModel.findById(vehId)

        let slots_booked = vehicleData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await vehicleModel.findByIdAndUpdate(vehId, { slots_booked })

        res.json({ success: true, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for booking completion
const bookingComplete = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        booking.isCompleted = true;
        await booking.save();

        res.json({ success: true, message: "Booking marked as completed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {

    try {

        const vehicles = await vehicleModel.find({})
        const users = await userModel.find({})
        const bookings = await bookingModel.find({})

        const dashData = {
            vehicles: vehicles.length,
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

export { addVehicle, loginAdmin, allVehicles, bookingsAdmin, bookingCancel,bookingComplete, adminDashboard }