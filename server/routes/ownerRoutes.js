import express from 'express'
import { protect } from '../middleware/Auth.js'
import { addCar, changedRoleToOwner, delteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from '../controllers/ownerController.js'
import upload from '../middleware/multer.js'

const ownerRouter = express.Router()

ownerRouter.post('/change-role',protect,changedRoleToOwner)
ownerRouter.post('/add-car' ,protect,upload.single("image"),addCar)
ownerRouter.get('/cars',protect,getOwnerCars);
ownerRouter.post('/toggle-car',protect,toggleCarAvailability);
ownerRouter.post('/delete-car',protect,delteCar);
ownerRouter.get('/dashboard',protect,getDashboardData);
ownerRouter.post('/update-image',protect,upload.single('image'),updateUserImage);



export default ownerRouter;