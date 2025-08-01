import React from 'react'
import { assets} from '../../assets/assets'
import { Link } from 'react-router-dom';
import { UseAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
const {user} = UseAppContext() ;

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-[#c4c7d2] relative transition-all'>
      <Link to='/'>
      <img src={assets.logo} alt="" className='h-8' />
      </Link>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner
