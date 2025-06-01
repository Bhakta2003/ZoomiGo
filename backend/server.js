import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import vehicleRouter from './routes/vehicleRoute.js'
import userRouter from './routes/userRoute.js'


//app config
const app=express()
const port =process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/admin',adminRouter)  //localhost:4000/api/admin/
app.use('/api/vehicle',vehicleRouter)  //localhost:4000/api/vehicle/
app.use('/api/user',userRouter)  //localhost:4000/api/user/

app.get('/',(req,res)=>{
    res.send('API working!!! woohoo')
})

app.listen(port,()=>console.log("Server started",port))