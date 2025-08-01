import React, { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './Pages/Home'
import CarDetails from './Pages/CarDetails'
import Cars from './Pages/Cars'
import MyBookings from './Pages/MyBookings'
import Footer from './components/Footer'
import Layout from './Pages/Owner/Layout'
import Dashboard from './Pages/Owner/Dashboard'
import AddCar from './Pages/Owner/AddCar'
import ManageCars from './Pages/Owner/ManageCars'
import ManageBookings from './Pages/Owner/ManageBookings'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { UseAppContext } from './context/AppContext'

const App = () => {
const {showLogin} = UseAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
  <>
  <Toaster />

  {
    showLogin &&  <Login />
  }
    {!isOwnerPath && <Navbar/>}
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/owner' element={<Layout/>}>
<Route index element={<Dashboard/>}/>
<Route path='add-car' element={<AddCar/>}/>
<Route path='manage-cars' element={<ManageCars/>}/>
<Route path='manage-bookings' element={<ManageBookings/>}/>

      </Route>
    </Routes>

    {!isOwnerPath && <Footer/>}

  </>
  )
}

export default App
