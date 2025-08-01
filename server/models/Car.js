import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const carSchema = new mongoose.Schema({
    owner:{
        type:ObjectId,
        ref:'User'
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    image:{
        type:String,
  
    },
    year:{
        type:Number,
        required:true
    },
    
    category:{
        type:String,
     
    
},
   seating_capacity:{
        type:Number,
        required:true
    
},
 fuel_type:{
        type:String,
        required:true
    
},
transmission:{
        type:String,
        required:true
    
},
pricePerDay:{
        type:Number,
    
    
},
location:{
        type:String,
       
    
},
description:{
        type:String,
        required:true
    
},

isAvailable:{
        type:Boolean,
        

    
},
},{timestamps:true}
)


const Car = mongoose.model('Car',carSchema)
export default Car