import express, { response } from 'express';
import ProductSchema from '../Schemas/ProductSchema.js';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dotenv from 'dotenv';
import multerUpload from '../MiddleWares/MulterUpload.js';
// import { path } from 'path';
// import { domainToASCII } from 'url';
// const parser = new DatauriParser();

// const formatBufferTo64 = file =>
//   parser.format(path.extname(file.originalname).toString(), file.buffer)


const ProductRouter = express.Router();
dotenv.config();



//   const storage = multer.diskStorage({   
//     destination: function(req, file, cb) { 
//        cb(null, '../client/Test_Images');    
//     },
//     filename: function (req, file, cb) { 
//        cb(null , file.originalname);   
//     }
//  });



ProductRouter.post('/add' , multerUpload.fields([
  {
    name:"image",
    maxCount:4,
  }
]),   async(req, response)=>{
 console.log(req);
 console.log("Rest of Data->",req.body); 
  console.log(req.body.Sender); 
 console.log("Trying to Upload image ->",req.files);
  var NewProduct = new ProductSchema({
    FullName:req.body.FullName,
    Description:req.body.Description,
    Specifications:req.body.Specifications, 
    Media:[],
    productId:new mongoose.Types.ObjectId().toString(), 
    SellerId:req.body.SellerId,
    TimeStamp: Date.now().toString(),
    Price:req.body.Price || 0,
    Quantity:req.body.Quantity || 0,
    Offers:req.body || []
  });
  const files = req.files['image'];
 if(files && files.length>0){
   NewProduct.Media =  await addMedia(files);
  }
else{ 
  console.log("error: req.files is null or undefined");
  
  console.log("New Post about to be Inserted is ->",NewProduct);
    await NewProduct.save()
  .then(result=>{
  //  console.log("Added New Post->",result);
  console.log("Added New Product->");
    response.status(200).send("Success");
  })
  .catch(err=>{
    console.log("error while adding new Post",err);
    response.status(400).send(err);
  })
}
});


ProductRouter.get('/get',async(req,response)=>{
  const query = req.params.Query;
  console.log("Fetch products query for ",query);
  const ans = await ProductSchema.find({})
  .then(result=>{
  console.log("Fetched Products");
  response.status(200).json(result);
  }) 
  .catch(err=>{
    console.log("error while fetching products query",err);
    response.status(400).json(err);
  })
});

ProductRouter.get('/Specific/:productId',async(req,response)=>{
  const query = req.params.productId;
  console.log("Fetch products query for ",query);
  const ans = await ProductSchema.findOne({productId:query})
  .then(result=>{
  console.log("Fetched Products => ");
  return response.status(200).json(result);
  }) 
  .catch(err=>{
    console.log("error while fetching products query",err);
    return response.status(400).json(err);
  })
});

ProductRouter.post("/Update/:_id" ,async(req,response)=>{
  const query = req.params._id;
   console.log("Recived Request from Id" , query, "to update Quantity and soldproducts",req.body.Product);
  // console.log("update products query for ",query);
  await ProductSchema.updateOne({__id:query}, {$set : {
    ...req.body.Product
  }} )
  .then(res=>{
    console.log("update products query response");
    return response.status(200).json(res);
  })
  .catch(err=>{
    console.log("error while updating products query",err);
    return response.status(500).send(err);
  })
})



export default ProductRouter;  








