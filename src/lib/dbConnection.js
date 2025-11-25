import mongoose from "mongoose"
import colors from 'colors'

export const dbConnect = async()=>{
    if(mongoose.connection.readyState >=1){
        console.log(`-- Already DB connected --`.bgGreen)
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`-- DB Connected Successfully --`.bgGreen)
    } catch (error) {
        console.log(`-- Err in DB connection --`.bgRed)
    }
}