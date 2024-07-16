import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'http'
import cors from 'cors'
import { handleSocket } from './controllers/handleSocket.js'
import dotnenv from 'dotenv'
// intializing app
const app=express();

const server=createServer(app);
app.use(cors())
const io=new Server(server,{
    cors:{
        origin:"*"
    }
});
dotnenv.config();

// This is the controller that handles messaging features
handleSocket(io)

server.listen(process.env.PORT | 4000,()=>{
    console.log(`listening at port ${process.env.PORT}`)
})

