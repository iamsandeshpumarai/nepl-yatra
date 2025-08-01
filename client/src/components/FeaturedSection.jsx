import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { UseAppContext } from '../context/AppContext'
import { motion } from 'motion/react'


const FeaturedSection = () => {
    const navigate = useNavigate()
const {cars} = UseAppContext()


  return (
    <motion.div 
    transition={{duration:1,ease:"easeOut"}}
      initial = {{y:0,opacity:40}}
      whileInView={{opacity:1,y:0}}
     
    className='flex flex-col items-center py-5 px-6 md:px-18 lg:px-24 xl:px-32 '>
        <motion.div
        transition={{duration:1,delay:0.5}}
      initial = {{y:20,opacity:0}}
      whileInView={{opacity:1,y:0}}
        >
             <Title title="Featured Vehicles" subTitle='Explore our selection of premium vehicles available for your next adventure.'/>
       
        </motion.div>
      <motion.div 
      transition={{duration:1,delay:0.5}}
      initial = {{y:100,opacity:40}}
      whileInView={{opacity:1,y:0}}
      className='grid grid-ols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {
            cars.slice(0,6).map((car)=>(
                <motion.div
                transition={{duration:0.4,ease:"easeOut"}}
      initial = {{scale:0.95,opacity:40}}
      whileInView={{opacity:1,scale:1}}
                key={car._id}>
                    <CarCard car={car}/>
                </motion.div>
            ))
        }

      </motion.div>

<motion.button 
transition={{duration:1,delay:0.6}}
      initial = {{y:20,opacity:40}}
      whileInView={{opacity:1,y:0}}

onClick={()=>{ navigate('/cars'); 
    scrollTo(0,0)} }
    className='flex items-center mt-6 justify-center gap-2 px-6 py-2 border border-[#c4c7d2] hover:bg-gray-50 rounded-md mt-18 cursor-pointer' >
    Explore all cars
<img src={assets.arrow_icon} alt="arrow" />
</motion.button>

    </motion.div>
  )
}

export default FeaturedSection
