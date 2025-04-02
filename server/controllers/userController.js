import {User} from "../models/user.js";
import bcrypt from "bcryptjs";
import {genarateToken} from "../utils/genarateToken.js";


export  const Register = async (req,res)=>{
    try {
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }

        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        let hashPassword = await  bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password:hashPassword
        })
        return res.status(201).json({
            success:true,
            message:"Account created successfully."
        })
    } catch (error) {
     return res.status(500).json({
         success:false,
         message:"Failed to register user"
     })
    }
}



export const Login = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            res.status(400).json({success:false, message:"All fields are required"})
        }
        const findUser = await  User.findOne({email});
        if(!findUser){
            res.status(404).json({success:false, message:"Incorrect email or password"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect){
            res.status(400).json({success:false, message:"Incorrect email or password"})
        }


        genarateToken(res, findUser,`Welcome Back ${findUser.name}`)
    }catch (e) {
        console.log(e)
        res.status(500).json({success:false, message:"Failed to login user"})
    }
}