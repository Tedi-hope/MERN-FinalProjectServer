import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authenticateUser=(req,res,next)=>{
    const authHeader=req.headers.authorization;
      // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      console.log("No authorization header found or incorrect format.");
      return res.status(401).send({message:'Unauthorized:No token provided'});
    }

    const token=authHeader.split(' ')[1];
     try{
        const decoded=jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.islogged ||decoded.userId){
             //console.log("Decoded token:", decoded, decoded.islogged,decoded.userId); 
            return res.status(403).json({message:'Invalid token payload'});
        }
        //request.user=decoded;
        req.user = { userId: decoded.userId };
        console.log('Authenticated User:', req.user); 
        next();
     }
     catch(error){
        console.log(error.message);
        return res.status(403).send({message:'Unauthorized:Invalid or expired token'});
      }
}