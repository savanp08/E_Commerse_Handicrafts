import mongoose from "mongoose";
import express from "express";

const adminSchemaX = new mongoose.Schema({
    adminId:{
        type:String,
        default:"GuestId",
        required:true,
        unique:true,
        minlength:1
    },
    adminName:{
        type:String,
        default:"GuestName",
        required:true,
        unique:true,
        minlength:1
    },
    email:{
        typ:String,

    },
    password:{
        type:String, 
        required:true,
         unique:false,
         minlength:2
    },

});

const adminSchema= mongoose.model("adminSchemas",adminSchemaX);
export  default adminSchema;