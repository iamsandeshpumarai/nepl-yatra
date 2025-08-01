import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { UseAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const CarDetails = () => {
 const {id}=  useParams()
 console.log(id)
 const {cars,axios,setPickupDate,pickupDate,setReturnDate,returnDate,} = UseAppContext(); 
 const navigate = useNavigate()
 const [car,setCar] = useState(null)
 const currency = import.meta.env.VITE_CURRENCY

 const handleSubmit =async(e)=>{
e.preventDefault();
try{
const {data} = await axios.post('/api/bookings/create',{
  car:id,
  pickupDate,returnDate
})
if(data.success){
  toast.success(data.message)
  navigate('/my-bookings')
}
else{
toast.error(data.message)
}
}catch(err){
toast.error(err.message)
}

 }
 useEffect(()=>{
setCar(cars.find(car=>car._id==id))
 },[cars,id])

 return car ?(
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={()=>navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'> 
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' />
        Back to all cars</button>
<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
{/* {left car image and details} */}
<motion.div 
      initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.6}}
className='lg:col-span-2'>
<motion.img
      initial={{scale:0.98,opacity:0}}
    animate={{scale:1,opacity:1}}
    transition={{duration:0.5}}

src={car.image} className='w-full h-[70vh] md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />
<motion.div
      initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:0.2,duration:0.5}}
className='space-y-6'>
  <div>
<h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
<p className='text-gray-500 text-lg'>{car.category} • {car.year} </p>
  </div>
<hr  className='border-[#c4c7d2] my-6'/> 
<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
{[
  {icon:assets.users_icon,text:`${car.seating_capacity} Seats`},
  {icon:assets.fuel_icon,text:`${car.fuel_type}`},
  {icon:assets.car_icon,text:`${car.transmission}`},
  {icon:assets.location_icon,text:`${car.location}`},
].map(({icon,text})=>(
  <motion.div
     initial={{opacity:0,y:10}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.4}}
  key={text} className='flex flex-col items-center bg-light p-4 rounded-lg '>
<img src={icon} alt=""  className='h-5 mb-2'/>
{text}
  </motion.div>

))}
</div>

{/* {description} */}

<div>
  <h1 className='text-xl font-medium mb-3'> Description</h1>
  <p className='text-gray-500'>{car.description}</p>
</div>

{/* {features} */}

<div>

  <h1 className='text-xl font-medium mb-3'>
Features
  </h1>
  <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
    {
      ["360 Camera", "Bluetooth","GPS","Heated Seats","Rare View"].map((item,index)=>(
        <li key={index} className='flex items-center text-gray-500'>
          <img src={assets.check_icon} className='h-4 mr-2' alt="" />
        {item}
        </li>

      ))
    }

  </ul>
</div>


</motion.div>
</motion.div>

{/* {right booking} */}
<motion.form
   initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    transition={{delay:0.3,duration:0.6}}
onSubmit={handleSubmit} className='shadow-lg h-max sticky  top-20 rounded-xl p-6 space-y-6 text-gray-600'>

<p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
{currency}{car.pricePerDay}
<span className='text-base text-gray-400 font-normal'>Per Day </span>
</p>

<hr  className='border border-[#c4c7d2]'/>

<div className='flex flex-col gap-2'>
<label htmlFor="pickup-date">
Pickup Date
</label>
<input
value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
type="date" className='border border-[#c4c7d2] px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toString().split('T')[0]}/>
</div>

<div className='flex flex-col gap-2'>
<label htmlFor="return-date" >
  
Return Date
</label>
<input type="date" className='border border-[#c4c7d2] px-3 py-2 rounded-lg' value={returnDate}  onChange={(e)=>setReturnDate(e.target.value)} min={pickupDate} required id='return-date' />
</div>

<button className='w-full bg-[#2563eb] hover:bg-[#1f58d8] transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>

<p className='text-center text-sm'>No Credit card required to reserve</p>

</motion.form>
</div>

    </div>
  ) : <Loader/>
}

export default CarDetails
