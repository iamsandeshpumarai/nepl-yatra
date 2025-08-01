import React, { useEffect } from 'react'
import NavbarOwner from '../../components/Owner/NavbarOwner'
import SideBar from '../../components/Owner/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { UseAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner,navigate} = UseAppContext();

useEffect(()=>{
if(!isOwner){
  navigate('/')
}
},[isOwner])

  return (
    <div className='flex flex-col '>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>
            <Outlet/>

        </div>
      
    </div>
  )
}

export default Layout
