import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from 'node:dns';
import userRouter from "./userRouter";

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(cors({
    origin: CLIENT_URL
}));
app.use("/api/users", userRouter);

const startServer = ()=>{
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
}

const connectDB = async()=>{
    try {
        await mongoose.connect(`${DB_URL}`);
        console.log("DB Connected"); 
    } catch (error) {
        console.error("Mongoose connection failed :", error);
        process.exit(1); 
    }
}

startServer();
connectDB();
