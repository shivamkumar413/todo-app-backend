import express from 'express'
import { PORT } from './config/server.config.js';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/index.js'
import { connectDB } from './config/db.config.js';
import { isAuthenticated } from './middlewares/auth.middlewares.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

app.use('/api',apiRouter);

app.get('/ping',isAuthenticated,(req,res)=>{
    return res.status(200).json({
        message : 'pong'
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB()
})