import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { UseAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import {motion} from 'motion/react'

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = UseAppContext();

  const [input, setInput] = useState('');
  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredCars, setFilteredCars] = useState([]);

  const applyfilter = () => {
    if (input === '') {
      setFilteredCars(cars);
      return;
    }

    const filtered =cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase()) || car.model.toLowerCase().includes(input.toLowerCase()) || car.category.toLowerCase().includes(input.toLowerCase()) || car.transmission.toLowerCase().includes(input.toLowerCase()) 
    })
    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast.error('No cars available');
        }
      }
    } catch (err) {
      toast.error('Error checking car availability');
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSearchData) searchCarAvailability();
  }, [isSearchData]);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      setFilteredCars(cars); // Ensures initial render shows all cars
      applyfilter(); // Filters based on input
    }
  }, [input,cars]);

  return (
    <div>
      {/* Hero section with search input */}
      <motion.div
      initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.6,ease:'easeOut'}}
      
      className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title
          title='Available Cars'
          subTitle='Browse our selection of premium vehicles available for your next adventure'
        />

        {/* Search bar */}
        <motion.div
              initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.3,delay:0.5}}
        className='flex items-center bg-white px-4 mt-6 max-w-[50%] w-full h-12 rounded-full shadow'>
          <img
            src={assets.search_icon}
            alt='search'
            className='w-5 h-5 mr-2'
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Search by make, model, or features'
            className='w-full h-full outline-none text-gray-500'
          />
          <img
            src={assets.filter_icon}
            alt='filter'
            className='w-5 h-5 ml-2'
          />
        </motion.div>
      </motion.div>

      {/* Car list */}
      <motion.div
            initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:0.6,duration:0.5}}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto '>
          Showing {filteredCars.length} Cars
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.length === 0 ? (
            <p className='text-gray-400 col-span-full text-center'>
              No cars found.
            </p>
          ) : (
            filteredCars.map((car, index) => (
              <motion.div 
                    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{delay:0.1*index,duration:0.4}}
              key={index}>
                <CarCard car={car} />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
