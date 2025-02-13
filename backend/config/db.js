import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://mhmdminhaj:219560@cluster0.cezbj.mongodb.net/food-del').then(()=>console.log("DB Conntected"))
}