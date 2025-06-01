import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile,bookBooking, listBookings, cancelBooking, paymentRazorpay, verifyRazorpay, googleAuth} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('imageFile'), authUser, updateProfile)
userRouter.post('/book-vehicle',authUser,bookBooking)    //changed to book-vehicle from book-booking
userRouter.get('/bookings',authUser,listBookings)
userRouter.post('/cancel-booking',authUser,cancelBooking)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-razorpay',authUser,verifyRazorpay)
userRouter.post('/google',googleAuth)

export default userRouter