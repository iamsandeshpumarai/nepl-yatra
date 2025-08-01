import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv()


const connectDB = async () =>{

    try{
        mongoose.connection.on(`connected`,()=>console.log('db connect3ed'))
await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`)

    }
    catch(err){
console.log(err.message)
    }
}
export default connectDB