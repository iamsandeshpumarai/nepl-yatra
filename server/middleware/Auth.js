import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async(req,res,next)=>{
const token = req.headers.authorization;
if(!token){
    return res.status(400).json({success:false,message:'not authorized'})
}
try{
    const userId =  jwt.decode(token)
    if(!userId){
        return res.status(400).json({success:false,message:'not authorized'})
    }
  req.user =   await User.findById(userId).select('-password')
  next()

}
catch(err){
return res.status(400).json({success:false,message:'not authorized'})
}

}