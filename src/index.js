import express from 'express'
import { PORT } from './config/server.config.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.get('/ping',(req,res)=>{
    return res.status(200).json({
        message : 'pong'
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})