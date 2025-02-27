import express, { request, response } from 'express';
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { getMembershipDuration } from '../utils/userUtils.js';

const router=express.Router();

router.post('/signup',async(request,response)=>{
    try{
      const {email,password}=request.body;
      const existingemail=await User.findOne({email});

      if(existingemail){
        return response.status(400).json({message:'Email already exists'});
      }
      const hashedPassword=await bcrypt.hash(password,10);

      const nuser=await User.create({
        email,
        password:hashedPassword
      });

      return response.status(201).json({message:'Signup Successful!'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/membership-duration/:email',async(req,res)=>{
  try{
     const {email}=req.params;
     const result=await getMembershipDuration(email);
   if(result.error){
     return res.status(404).json({message:result.error});
    }
    //return res.json({message:`User has been a member for ${result.durationInDays} days`})
    return res.json({ durationInDays: result.durationInDays });
 }
catch(error){
 console.log(error.message);
 res.status(500).send({message:error.message});
 //res.status(500).json({ message: error.message, durationInDays: 0 }); // Return duration with an error message
}
});

router.post('/login',async(request,response)=>{
    try{
        const {email,password}=request.body;

        const user=await User.findOne({email});
        if(!user){
            //console.log("No user")
            return response.status(404).json({message:'Email not found' });
        }
        //Check if the password is correct
        const passwordMatch=await bcrypt.compare(password,user.password);
        if (!passwordMatch){
            return response.status(401).json({message:'Invalid password'});
        }

        const token=jwt.sign({userId:user._id,islogged:true},JWT_SECRET,{expiresIn:'1h'});
        return response.status(200).json(
          {
            email:user.email,
            userId:user._id,
            token:token
           });
    }
    catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
     }
})

export default router; 