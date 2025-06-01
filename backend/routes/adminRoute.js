import express from 'express'
import { addVehicle,adminDashboard,allVehicles,bookingCancel,bookingComplete,bookingsAdmin,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/vehicleController.js'

const adminRouter = express.Router()

adminRouter.post('/add-vehicle',authAdmin, upload.single('image'), addVehicle)
adminRouter.post('/login', loginAdmin )
adminRouter.post('/all-vehicles',authAdmin ,allVehicles )
adminRouter.post('/change-availability',authAdmin ,changeAvailability )
adminRouter.get('/bookings',authAdmin,bookingsAdmin)
adminRouter.post('/cancel-booking',authAdmin,bookingCancel)
adminRouter.post('/complete-booking',authAdmin,bookingComplete)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter