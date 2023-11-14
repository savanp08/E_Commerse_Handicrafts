import express from "express";
import mongoose from "mongoose";
import { addMediaToCloudinary } from "../Helpers/Media.js";
import multerUpload from "../MiddleWares/MulterUpload.js";
import dotenv from "dotenv";
import restaurantSchema from "../Schemas/Restaurant.js";

dotenv.config()

const restaurantRouter = express.Router();

restaurantRouter.post("/addRestaurant", async (req,response)=>{

    try{
        console.log("add Restaurant fired", req.body);
       
       
        const newRestaurant = new restaurantSchema({
            ...req.body,
            restaurantId: new mongoose.Types.ObjectId().toString(),
        });
        
        await newRestaurant.save().then(res=>{
            console.log("Saved new restauarnt",res);
            return response.status(200).send(res);
        }).catch(err=>{
            console.log("errow while saving new restauarant",err);
            return response.status(500).send(err);
        })

    }catch(err){
        console.log("Error while adding a restaurant",err);
        return response.status(500).send(err);
    }

})

restaurantRouter.post("/addProduct", multerUpload.fields([
    {
        name:'image',
        maxCount:4
    }
]) , async (req,response)=>{
     try{
        
        console.log(" num of files in add product => ",req.files.image?.length)
        var x = JSON.parse(req.body.product);
        var Id= new mongoose.Types.ObjectId();
        var prod = {
            ...x,
            productId : Id.toString(),
            _id : Id

        };
        console.log("add product fired", prod);
     var media = [];
        if(req.files && req.files.image && req.files.image.length){
            media = await addMediaToCloudinary(req.files.image);
        }
        if(media && media.length){
            prod = {
                ...prod,
                Media:media
            }
        }
        
        await restaurantSchema.updateOne({_id : x.restaurantId},{
            $push : { 
                menu : prod
            }
        }).then(res=>{
            console.log("Added new product to resaurant",res);
            return response.status(200).send(res);
        
        }).catch(err=>{
            console.log("err while adding new product to resaurant",err);
            return response.status(500).send(err);
        });
     }catch(err){
        console.log("err while adding new product to resaurant",err);
        return response.status(500).send(err);
     }
})


    

restaurantRouter.get("/getAllRestaurants", async (req,response)=>{
    try{
      console.log(" get all restaurants fired");
      const result =await restaurantSchema.find({});
      if(result.error){
        console.log("Error while fetching all restaurants",result.error);
        return response.status(500).send(result.error);
      }
      else{
         console.log("Fetched restauran data => ",result);
         return response.status(200).send(result);
      }
      
    }catch(err){
      console.log("Error while fetching all  restaurants",err);
      return response.status(500).send(err);
    }
  }) 
  
restaurantRouter.get("/getOne/:_id", async (req,response)=>{
    try{
      console.log(" get one restaurants fired",req.params._id);
      const result =await restaurantSchema.findOne({_id : req.params._id});
      if(result && result.errors){
        console.log("Error while fetching one restaurants",result.errors);
        return response.status(500).send(result.errors);
      }
      else if(result){
         console.log("Fetched restauran data => ",result);
         return response.status(200).send(result);
      }
      else{
        console.log("Error while fetching one restaurants",result);
        return response.status(500).send(result);
      }
      
    }catch(err){
      console.log("Error while fetching all  restaurants",err);
      return response.status(500).send(err);
    }
  }) 
   restaurantRouter.delete("/deleteRestaurant", async (req,response)=>{
    const data = req.body.restaurantId;
    console.log("delete restaurant fired",data,req.body);
    try{
      const result = await restaurantSchema.deleteOne({_id : data});
      if(result.error){
        console.log("Error while deleting restaurant",result.error);
        return response.status(500).send(result.error);
      } 
      else{
         console.log("Deleted restaurant data => ",result);
         return response.status(200).send(result);
      }
    }
    catch(err){
        console.log("Error in try while deleeting restaurant",err);
        return response.status(500).send(err);
    }
});


restaurantRouter.post("/editRestaurant", async(req,response)=>{
    try{
        var x = req.body;
        var id=req.body._id;
        delete x._id;
         console.log("Edit rest fired",req.body);
         await restaurantSchema.updateOne({_id : id},{
                ...x
            }).then(res=>{
                console.log("Edited rest",res);
                return response.status(200).send(res);
            }).catch(err=>{
                console.log("Error while editing rest",err);
                return response.status(500).send(err);
            
         })
    }catch(err){
        console.log("Error in try while editing rest",err);
        return response.status(500).send(err);
    }
})



   restaurantRouter.post("/updateProduct", multerUpload.fields([ 
    {
        name:'image',
        maxCount:4
    }
]) , async (req,response)=>{
     try{
        console.log(" num of files in update product => ",req.files.image?.length)
        var x = JSON.parse(req.body.product);
        var prod = {
            ...x,
        };
        console.log("update product fired", prod);
        var media = [];
        if(req.files && req.files.image && req.files.image.length){
            media = await addMediaToCloudinary(req.files.image);
        }
        if(media && media.length){
            prod = {
                ...prod,
                Media:media
            }
        }const doc  = await restaurantSchema.findOne({_id : x.restaurantId});
        if(!doc){
            console.log("Error while updating product in restaurant menu",err);
            
        }
        else console.log("doc => ",doc);
        const doc1  = await restaurantSchema.findOne({_id : x.restaurantId, 'menu._id': prod._id});
        if(!doc1){
            console.log("Error while updating product in restaurant menu");
            
        }
        else console.log("doc1 => ",doc1);
        const doc2  = await restaurantSchema.findOne({_id : x.restaurantId, 'menu.productId': prod.productId});
        if(!doc2){
            console.log("Error while updating product in restaurant menu");
            
        }
        else console.log("doc2 => ",doc2);
        await restaurantSchema.updateOne({_id : x.restaurantId, 'menu.productId': prod.productId},
        { $set: { 'menu.$': prod } }).then(res=>{
            console.log("Updated product in restaurant menu",res);
            return response.status(200).send(res);
        }).catch(err=>{
            console.log("Error while updating product in restaurant menu",err);
            return response.status(500).send(err);
        });
     }catch(err){
        console.log("Error while updating product in restaurant menu",err);
        return response.status(500).send(err);
     }
})


  export default restaurantRouter;