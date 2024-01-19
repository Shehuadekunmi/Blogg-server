dotenv.config()
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import authrouter from './router/auth.route.js'
import bloggRouter from './router/blogg.router.js'
import userRouter from './router/user.route.js'
import commentRouter from './router/commentroute.js'
const app = express()


// middeleware
app.use(express.json());
app.use(cors());
app.use(cookieparser());


// ?router

app.use('/api/v1', authrouter)
app.use('/api/v1', bloggRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', commentRouter)


const startserver = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        app.listen(4200, () => {
            console.log('Server runing on port 4200');
            console.log('connected to DB');
        })
    } catch (error) {
        console.log(error);
    }
};
startserver()


// error handler

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});


