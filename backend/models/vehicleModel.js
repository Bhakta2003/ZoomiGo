import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    stars: { type: Number, required: true },
    seats: { type: Number, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default:true },
    gear: { type: String, required: true },
    fuel: { type: String, required: true },
    fees: { type: Number, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }
}, { minimize: false })     //here minimixe:false means we can use default as empty object in any of the above
//---------------------- if it was true then we couldn't use default:{} as empty object

const vehicleModel = mongoose.models.vehicle || mongoose.model('vehicle', vehicleSchema)

export default vehicleModel