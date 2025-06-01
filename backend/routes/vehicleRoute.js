import express from 'express'
import { bookingCancel, bookingComplete, bookingsVehicle, vehicleDashboard, vehicleList, vehicleProfile, updateVehicleProfile } from '../controllers/vehicleController.js'

const vehicleRouter = express.Router()

vehicleRouter.get('/list', vehicleList)
vehicleRouter.get('/bookings', bookingsVehicle)
vehicleRouter.post('/complete-booking', bookingComplete)
vehicleRouter.post('/cancel-booking', bookingCancel)
vehicleRouter.get('/dashboard', vehicleDashboard)
vehicleRouter.get('/profile', vehicleProfile)
vehicleRouter.post('/update-profile', updateVehicleProfile)

export default vehicleRouter