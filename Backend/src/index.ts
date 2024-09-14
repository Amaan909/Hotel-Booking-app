import express,{Request,Response} from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieparser from "cookie-parser"
import path from 'path'
// mongoose.connect(process.env.Mongodb_connection_string as string)
const mongoURI = process.env.Mongodb_connection_string as string;

mongoose.connect(mongoURI)
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
});
const app=express()
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'https://your-frontend-url.onrender.com',
    credentials:true
}))
app.use(express.static(path.join(__dirname,"../../frontend/dist")))
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.listen(7000,()=>{
    console.log("server running on localhost 7000")
})