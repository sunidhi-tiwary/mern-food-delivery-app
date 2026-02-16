import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:31204020@cluster0.g1ymvbk.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}