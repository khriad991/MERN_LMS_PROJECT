
import  express from "express";
import dotenv from "dotenv"
import connectDB from "./database/db.js";
import userRoute from "./route/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors"



dotenv.config({})
// call database connection
connectDB()

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5050",
    credentials:true
}))

app.use("/api/v3/user", userRoute)


let PORT = process.env.PORT || 5000
app.listen(PORT , ()=>{
    console.log( `server is running on http://localhost:${PORT}`)
})



// end of 2.09