import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './configs/mongoDB.js';
import { clerkWebhooks, stripeWebhooks } from './Controllers/Webhooks.js';
import educatorRouter from './Routers/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/Cloudinary.js';
import courseRouter from './Routers/courseRoute.js';
import userRouter from './Routers/userRoutes.js';

// initialize Express
const app = express()

// Connect to database
await connectDB()
await connectCloudinary()

// Middleware
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get('/' , (req , res)=> res.send("API working"))
app.post('/clerk' , express.json() , clerkWebhooks)
app.use('/api/educator' , express.json() , educatorRouter)
app.use('/api/course' , express.json() , courseRouter )
app.use('/api/user' , express.json() , userRouter )
app.use('/stripe' , express.raw({ type: 'application/json'}) , stripeWebhooks)

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> {
    console.log(`Server is running on ${PORT}`);
})