import Booking from "../models/Booking.js"
import Car from "../models/Car.js"

// function tocheck availability of car for a given date 
const checkAvailability = async (car,pickupDate,returnDate)=>{
const bookings = await Booking.find({
    car,
    pickupDate:{$lte:returnDate},
    returnDate:{$gte:pickupDate},
})

return bookings.length ===0 
}

// api for checking availabilty of cars for the given date and location 

export const checkAvailabilityOfCar = async(req,res)=>{
    try{
const {location,pickupDate,returnDate}= req.body;
//fetch all avaible car for the given  location

const cars = await Car.find({location,isAvailable:true});

//check car available forthe givn date range using promise
const availableCarsPromises = cars.map(async(car)=>{
   const isAvailable =  await CarAvailability(car._id,pickupDate,returnDate);
   return {...car._doc,isAvailable:isAvailable}
})

let availableCars = await Promise.all(availableCarsPromises);
availableCars =availableCars.filter(car =>car.isAvailable === true)

res.json({success:true ,availableCars})

    }
    catch(err){
       console.log(err.message);
       res.json({success:false,message:err.message}); 
    }
}


// api to create bookings 

export const createBooking = async(req,res)=>{

    try{
const {_id} = req.user;
const {car,pickupDate,returnDate} =req.body;
const isAvailable = await checkAvailability(car,pickupDate,returnDate);
if(!isAvailable){
    return res.json({success:false,message:"car is not available"})
}

const carData = await Car.findById(car);

// calculate price based on pickupDate and return date 
const picked = new Date(pickupDate);
const returned = new Date(returnDate);
const noofDays = Math.ceil((returned- picked)/(1000*60*60*24))
const price = carData.pricePerDay * noofDays;
await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})
res.json({success:true,message:"booking created"})
    }

    catch(err){

 return res.json({success:false,message:"car is not available"})
    }
}


//list of user bookings
export const getUserBookings = async(req,res)=>{

try{
const {_id} = req.user;
console.log(_id)
const booking = await Booking.find({user:_id}).populate("car").sort({createdAt:-1});
console.log(booking)
res.json({success:true,booking})

}

catch(err){
 return res.json({success:false,message:"car is not available"})
}

}

//api to get onwer bookings

export const getOwnerBookings = async(req,res)=>{

try{
if(req.user.role !== "owner"){
    return res.json({success:false,message:"Unauthorized"})
}
const bookings = await Booking.find({owner:req.user._id}).populate('car user').select('-user.password').sort({createdAt:-1});
res.json({success:true,bookings})

}

catch(err){
 return res.json({success:false,message:"car is not available"})
}

}

//update bookings status


export const changeBookingStatus = async(req,res)=>{

try{
const {_id} = req.user; 
console.log(_id ,"yes we are in")
const {bookingId,status} = req.body;
const booking = await Booking.findById(bookingId);
if(booking.owner.toString() !== _id.toString()){
    return res.json({success:false,message:"Unauthorized"});
}

booking.status = status;
await booking.save();
res.json({success:true,message:'Status Updated'})
}

catch(err){
 return res.json({success:false,message:"car is not available"})
}

}