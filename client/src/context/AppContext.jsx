import { createContext, useContext, useState ,useEffect} from "react"
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({children}) =>{
const navigate = useNavigate()
const currency = import.meta.env.VITE_CURRENCY;
const [token,setToken] =useState(null);
const [user,setUser] = useState(null);
const [isOwner,setIsOwner] = useState(false);
const [showLogin,setShowLogin] = useState(false);
const [pickupDate,setPickupDate] = useState('');
const [returnDate,setReturnDate] = useState('');
const [cars,setCars] = useState([]);

//check user is logedin
const fetchUser =async()=>{
    try{
const {data} = await axios.get('/api/user/data');
if(data.success){
    setUser(data.user);
    setIsOwner(data.user.role ==='owner')
}
else{
    navigate('/')
}
    }
    catch(err){
console.log(err)
toast.error(err.message);
    }
}



 //function to fetch all cars from the server
const fetchCars = async()=>{
try{
const {data} = await axios.get('/api/user/cars');
data.success ? setCars(data.cars) : toast.error(data.message);
}
catch(err){
toast.error(err.message)
}


}
//function to logout the user

const logout = ()=>{
    localStorage.removeItem('token');
    setToken(null);
    setUser(null)
    setIsOwner(false)
    axios.defaults.headers.common['Authorization'] = ''
    toast.success('you have been logged out');
}



//useeffect to retrive the token from the localstorage
useEffect(()=>{
    const token  = localStorage.getItem('token');
    setToken(token);
    fetchCars();
},[])


//useeffect to fetch the user data when token is available
useEffect(()=>{

if(token){
    axios.defaults.headers.common['Authorization'] = `${token}`;
    fetchUser();
}
},[token])


    const value = {
navigate,currency,axios,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showLogin,setShowLogin,logout,fetchCars,cars,setCars,pickupDate,returnDate,setPickupDate,setReturnDate,user,

    }
return(

    <AppContext.Provider value={value}>
{children}
</AppContext.Provider>
) 

}


export const UseAppContext =()=> useContext(AppContext);