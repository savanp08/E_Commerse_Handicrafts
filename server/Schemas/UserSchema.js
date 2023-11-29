import mongoose from "mongoose";
import express from "express";

const userSchemax = new mongoose.Schema({
    userId:{
        type:String,
        default:"GuestId",
        required:true,
        unique:true,
        minlength:1
    },
    email:{
      type:String,
        required:true,
        unique:true,

    },
    password:{ 
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
    FullName:{
        type:String,
        default:"Guest",
        required:true,
        unique:false,
        minlength:1
    }, 
    location: {
        university: {
            
            type: 'string',
            
            default: null,
        },
        street1:{
            tyep:String,

        },
        street2: {
           
            type: 'string',
            minlength: 1,
            default: null,
        },
        apartment: {
           
            type: 'string',
            minlength: 1,
            default: null,
        },
        city: {
           
            type: 'string',
            minlength: 1,
            default: null,
        },
        state: {
           
            type: 'string',
            minlength: 1,
            default: null,
        },
        zipCode : {
           
            type: 'string',
            minlength: 1,
            default: null,
            
        },
        coordinates : {
            lat: {
                
                type: String ,
                default: null,
            },
            lng: {
                
                type:  String,
                default: null,
            },
        },
    },
    OrderHistory:[],
    Cart: [],
    cart:[],
    reviews:[],
    ratings:[],
},{timeStamps:true});

const userSchema= mongoose.model("userSchemas",userSchemax);
export  {userSchema};