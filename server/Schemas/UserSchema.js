import mongoose from "mongoose";
import express from "express";

const UserSchemax = new mongoose.Schema({
    UserId:{
        type:String,
        default:"GuestId",
        required:true,
        unique:true,
        minlength:1
    },
    UserName:{
        type:String,
        default:"GuestName",
        required:true,
        unique:true,
        minlength:1
    },
    Password:{
        type:String,
        required:true,
         unique:false,
         minlength:2
    },
    FirstName:{
        type:String,
        default:"Guest",
        required:true,
        unique:false,
        minlength:1
    },
    LastName:{
        type:String,
        default:"Guest",
        required:true,
        unique:false,
        minlength:1
    },
    OrderHistory:[],
    Cart:[]
});

const UserSchema= mongoose.model("UserSchemas",UserSchemax);
export  {UserSchema};