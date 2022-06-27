import express from 'express';
import { connect } from 'mongoose'
import { config } from 'dotenv' 
import AuthRoutes from './Routes/Auth.routes.js'
import cors from 'cors'
import VideoRoutes from './Routes/Video.routes'
config();

const server = express();

//===================================================MONGODB CONNECTION========================================
server.use(cors())

//===================================================MONGODB CONNECTION========================================
const mongoURI = process.env.mongoURI

connect(mongoURI, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Connection to MongoDB was successful');
})

//===================================================Server Endpoints========================================
server.use(AuthRoutes)
server.use(VideoRoutes)

server.get('/',(req,res)=>{
    res.send('Home page');
})

const PORT = process.env.POR ?? 5000

server.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})