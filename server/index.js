
import  express from "express";
import dotenv from "dotenv"
import connectDB from "./database/db.js";


dotenv.config({})
// call database connection
connectDB()



const app = express();




app.get("/", (req, res) => {
    res.send(`
       
                <style>
                    h1 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f4f4f4;
                         color: dodgerblue;
                        font-size: 2.5rem;
                        text-align: center;
                    }
                </style>
            
                <h1>🚀 Server is Running Successfully! 🎉</h1>
      
    `);
});

let PORT = process.env.PORT || 8000
app.listen(PORT , ()=>{
    console.log( `server is running on http://localhost:${PORT}`)
})