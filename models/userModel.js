import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        startDate:{type:Date,default:Date.now}//Auto set when user signs up
    },
    {
        timestamps:true,
    }
);

export const User=mongoose.model('User',userSchema);