
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    
    const MONG_URL = 'mongodb://localhost:27017/mydatabase';

    try {
        
        await mongoose.connect(MONG_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection Established with MongoDB");
    } catch (err) {
        console.error("Connection Failed with MongoDB", err);
    }

    mongoose.connection.on('disconnected', () => {
        console.log("Connection Disconnected with MongoDB");
    });

    mongoose.connection.on('error', (err) => {
        console.error("Connection Error with MongoDB", err);
    });
};

export default connectDB;
