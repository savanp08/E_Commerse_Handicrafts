import mongoose from "mongoose";
import express from "express";

const restaurantSchemaX = new mongoose.Schema({
    restaurantId:{
        type:String,
        default:"GuestId",
        required:true,
        unique:true,
        minlength:1
    },
    restaurantName:{
        type:String,
        default:"GuestName",
        
    },
    types:[],
    name:{
        type:String,
    },
    
    location: {
       
        street1:{
            type:String,

        },
        street2: {
           
            type: 'string',
           
            default: null,
        },
        apartment: {
           
            type: 'string',
           
            default: null,
        },
        city: {
           
            type: 'string', 
           
            default: null,
        },
        state: {
           
            type: 'string',
           
            default: null,
        },
        zipCode : {
           
            type: 'string',
           
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
    orders:[],
    menu:[],
    media:[],
    promos:[],
    rating:{
        type:Number
    },
    num_ratings:{
        type:Number
    },
    reviews:[],
});

const restaurantSchema= mongoose.model("restaurantSchemas",restaurantSchemaX);
export  default restaurantSchema;