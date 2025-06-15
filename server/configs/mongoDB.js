import mongoose from "mongoose";

// connect to mongoDB database

const connectDB = async ()=> {
    mongoose.connection.on('connected' , () => {
        console.log("data base connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connectDB