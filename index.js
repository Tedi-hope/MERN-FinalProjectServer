import express, { request, response } from 'express';
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import gymRoute from './routes/gymRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';


const gymapp=express();

gymapp.use(express.json());

gymapp.use(cors());

gymapp.get('/',(request,response)=>{
    //console.log(request);
    return response.status(234).send('Welcome to GYM information App');
});

gymapp.use('/gym',gymRoute);

gymapp.use('/user',userRoute);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    gymapp.listen(PORT,()=>{
        console.log(`App is listening to port:${PORT}`);
    });
  })
.catch((error)=>{
    console.log(error);
});
