import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import vehicleModel from '../models/vehicleModel.js'
import bookingModel from '../models/bookingModel.js'
import Razorpay from 'razorpay'
import { OAuth2Client } from 'google-auth-library'



//api to register user
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: 'Missing details' })
        }

        //validating user email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter a valid email' })
        }

        //validating user password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Enter a strong password' })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User Does not exist' })
        }

        // Block password login for Google-authenticated users
        if (user.password === 'google-auth') {
            return res.json({ success: false, message: 'Please sign in with Google' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get user profile data
const getProfile = async (req, res) => {
    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to update user profile
const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file


        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: 'Data Missing' })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            //uploading image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to book booking
const bookBooking = async (req, res) => {
    try {
        const { userId, vehId, slotDate, slotTime } = req.body

        const vehData = await vehicleModel.findById(vehId)

        //console.log(vehData)

        if (!vehData.available) {
            return res.json({ success: false, message: 'Vehicle not available' })
        }

        let slots_booked = vehData.slots_booked

        //checking for slots avilability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete vehData.slots_booked

        const bookingData = {
            userId,
            vehId,
            slotDate,
            slotTime,
            userData,
            vehData,
            amount: vehData.fees,
            date: Date.now()
        }

        const newBooking = new bookingModel(bookingData)
        await newBooking.save()

        //save new slots data in docData
        await vehicleModel.findByIdAndUpdate(vehId, { slots_booked })

        res.json({ success: true, message: 'Vehicle Rented' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get user bookings for frontend my-bookings page
const listBookings = async (req, res) => {
    try {

        const { userId } = req.body
        const bookings = await bookingModel.find({ userId })

        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to cancel booking
const cancelBooking = async (req, res) => {
    try {

        const { userId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)

        //verify booking user
        if (bookingData.userId != userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        //releasing vehicle slot, as if booking is cancelled then vehicle dont have the booking in that particular day or time
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




const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//api to make payment of booking
const paymentRazorpay = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        const amount = booking.vehData.fees * 100; // Convert to paise

        const options = {
            amount,
            currency: "INR",
            receipt: `receipt_${bookingId}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);
        console.log(order);

        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
      
      // Verify payment signature
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
  
      if (expectedSignature === razorpay_signature) {
        // Update booking as paid
        await bookingModel.findByIdAndUpdate(
          req.body.bookingId, 
          { payment: true, paymentId: razorpay_payment_id }
        );
        res.json({ success: true, message: "Payment successful" });
      } else {
        res.status(400).json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


//api to handle Google authentication
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleAuth = async (req, res) => {
    try {
        const { token } = req.body

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const { name, email, picture } = ticket.getPayload()

        // Check if user exists
        let user = await userModel.findOne({ email })

        if (!user) {
            // Create new user if doesn't exist
            user = new userModel({
                name,
                email,
                image: picture,
                isVerified: true,
                password: 'google-auth' // Dummy password, won't be used
            })
            await user.save()
        }

        // Create JWT token (same as regular login)
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token: jwtToken })

    } catch (error) {
        console.error('Google auth error:', error)
        res.status(401).json({ success: false, message: 'Google authentication failed' })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookBooking, listBookings, cancelBooking, paymentRazorpay, verifyRazorpay, googleAuth }