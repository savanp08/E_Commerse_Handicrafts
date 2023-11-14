import mongoose from "mongoose";
import express from "express";

const SellerSchemax = new mongoose.Schema({
    SellerId:{
        type:String,
        default:"GuestId",
        required:true,
        unique:true,
        minlength:1
    },
    SellerName:{
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
    SellHistory:[],
    OrdersAndResquests:[]
});

const SellerSchema= mongoose.model("SellerSchemas",SellerSchemax);
export  {SellerSchema};