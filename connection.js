import mongoose from "mongoose";

export default function connectDB(url){
    mongoose.connect(url).then(()=>console.log("mongo connected!")).catch(error => console.log("error occured",error))
}