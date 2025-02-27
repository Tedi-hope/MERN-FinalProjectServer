import {User} from '../models/userModel.js';

export const getMembershipDuration=async(email)=>{
    const user=await User.findOne({email});
    if(!user){
        return {error:"User Not found"};
    }
    const startDate=user.startDate;
    const currentDate=new Date();
    const durationInDays=Math.floor((currentDate-startDate)/(1000*60*60*24));

    return {durationInDays};
}