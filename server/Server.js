import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'; 
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ProductRouter from './APIs/ProductAPI.js';
import UserRouter from './APIs/UserAPI.js';
import restaurantRouter from './APIs/Restaurant.js';
import adminSchema from './Schemas/adminSchema.js';
import { sendPasswordResetMail } from './Helpers/Mailer.js';
dotenv.config();

const expressServer= express();
const port = process.env.PORT || 5000;


expressServer.use(cors({
    // origin:["write allowed urls here"]
 }));
 expressServer.use(express.json());
 expressServer.use(bodyParser.json());
 expressServer.use(bodyParser.urlencoded({ extended: true }));

// add API rouets to express
const httpServer = expressServer.listen(port, ()=>{
    console.log("Server connected to Port" ,port);
}); 
  


mongoose.connect( process.env.DbUri,
    {
        useNewUrlParser: true,  
    useUnifiedTopology: true
    }
    ) 
.catch((error) => {   
    console.log(error.message); 
});
 
const DBconnection = mongoose.connection;  
DBconnection.once('open',   ()=> {
    console.log(`Data Base Connection Established Successfully`);
});
 
expressServer.use('/Products',ProductRouter);
expressServer.use('/Auth',UserRouter); 
expressServer.use('/Server/Auth',UserRouter);
expressServer.use('/Restaurant',restaurantRouter);  
 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// if(process.env.NODE_ENV === 'production'){
//     expressServer.use(express.static(path.join(__dirname,"../","client/build")));
// }
// expressServer.use(express.static(path.join(__dirname,"../","client/build")));
// console.log(path.join(__dirname,"../","client/build"));

// expressServer.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
