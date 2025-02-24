import express, { request, response } from 'express';
import { Gym } from '../models/gyminfoModel.js';
//import { authenticateUser } from '../middleware/authenticateUser.js';

const router=express.Router();

//Route to save new gym info
router.post('/',async(request,response)=>{
   
    try{
     if(!request.body.exerciseSizeTitle || !request.body.load || !request.body.preps)
     {
         return response.status(400).send({
             message:'Send all required fields:exerciseTitle,load,preps',
         });
     }
    
     const newgyminfo={
       exerciseSizeTitle:request.body.exerciseSizeTitle,
       load:request.body.load,
       preps:request.body.preps,
     }
     //console.log(request.user)
     const gyminfo=await Gym.create(newgyminfo);
 
     return response.status(201).send(gyminfo);
    }
    catch(error){
       console.log(error.message);
       response.status(500).send({message:error.message});
    }
 })
 
 router.get('/',async(request,response)=>{
    try{
      const gym=await Gym.find({});
      return response.status(200).json({
        count:gym.length,
        gymdata:gym,
      });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
 })

 router.get('/:id',async(request,response)=>{
    try{
     const { id }=request.params;
     const gym=await Gym.findById(id);
     return response.status(200).json(gym);
    }
    catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
 })

 router.put('/:id',async(request,response)=>{
    try{
      if(
        !request.body.exerciseTitle ||
        !request.body.load || 
        !request.body.preps
      )
      {
        return response.status(400).send({
            message:'Send all required fields:exerciseTitle,load,preps'
        });
      }
     const { id }=request.params;
     const qresult=await Gym.findByIdAndUpdate(id,request.body);

     if(!qresult){
        return response.status(404).json({message:'Gym Info not Found'});
     }
     return response.status(200).send({message:'Gym Info updated successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
 })

 router.delete('/:id',async(request,response)=>{
    try{
       const { id }=request.params;
       const dqresult=await Gym.findByIdAndDelete(id);
       if(!dqresult){
        return response.status(400).json({message:'Gym Info not found'});
       }
       return response.status(200).send({message:'Gym Info Deleted Successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
 })

 export default router;