import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { error } from "console"
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js"
const generateToken =(userId)=>{
const payload = userId
return jwt.sign(payload,process.env.JWT_SECRET)

}

// registeruser 
export const registerUser = async(req,res)=>{
try{
const {name,email,password} = req.body
if(!name || !email || !password.length>8){
    return res.status(400).json({success:false,message:'fill all the fields'})
}
const userExists = await User.findOne({email})
if(userExists){
   return res.json({message:"User already exists"})
}
const hasedPassword = await bcrypt.hash(password,10)
const user = await User.create({name,email,password:hasedPassword})
const token = generateToken(user._id.toString())
res.json({success:true,token})
}
catch(err){
console.log(err.message)
res.status('400').json({success:false,message:err.message})
}
}

// Loginuser
export const loginUser = async(req,res)=>{
try{
const {email,password} = req.body
const user = await User.findOne({email})

if(!user){
   return res.json({success:false,message:"User not found"})
}
const isMatched = await bcrypt.compare(password,user.password)
if(!isMatched){
    return res.json({success:false,message:"Invalid Password"})
}

const token = generateToken(user._id.toString())
res.json({success:true,token})


}
catch(err){
console.log(err.message)
res.status('400').json({success:false,message:err.message})
}
}
// get user data 
export const getUserData = async(req,res)=>{
    try{
        const {user} = req
        res.status(200).json({success:true,user})
    }
    catch(err){
res.status(400).json({success:false,message:error.message})
    }
}

// get all cars for the react

export const getCars = async(req,res)=>{
    try{
        
        const cars = await Car.find({isAvailable:true});
        res.status(200).json({success:true,cars})
    }
    catch(err){
res.status(400).json({success:false,message:error.message})
    }
}