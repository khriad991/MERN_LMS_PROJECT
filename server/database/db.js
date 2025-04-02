
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await  mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected")
    }catch (e) {
        console.log("error from --->>>DB.js ", e)
    }
}

export default connectDB