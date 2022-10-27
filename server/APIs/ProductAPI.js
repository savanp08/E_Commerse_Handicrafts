import express, { response } from 'express';
import ProductSchema from '../Schemas/ProductSchema.js';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';
// import { path } from 'path';
// import { domainToASCII } from 'url';
// const parser = new DatauriParser();

// const formatBufferTo64 = file =>
//   parser.format(path.extname(file.originalname).toString(), file.buffer)


const ProductRouter = express.Router();
dotenv.config();


cloudinary.config({ 
  cloud_name: process.env.cloud_name ,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret 
});
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];
const storage  = multer.memoryStorage();

//   const storage = multer.diskStorage({   
//     destination: function(req, file, cb) { 
//        cb(null, '../client/Test_Images');    
//     },
//     filename: function (req, file, cb) { 
//        cb(null , file.originalname);   
//     }
//  });
const multerUpload = multer({ 
  storage : storage,
  fileFilter: function(req, file, cb) {
      if (ALLOWED_FORMATS.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Not supported file type!'), false);
      }
    }
});


async function addMedia(files){
  return new Promise((resolve,reject)=>{
   try{
  var it=0;
  var count=files.length;
  var MediaLinks=[];
  files.forEach(async(file)=>{ ++it;

    
    const encoded = file.buffer.toString('base64'); 
   // console.log("Base64 ->",encoded);
    if(encoded){
      const ext = file.mimetype.substring(6);
      const dataUri = "data:" + "image/" + ext + ";" + "base64" + "," + encoded;
     
    await cloudinary.uploader.upload(dataUri  ,{ folder : "Ecomm-App" } ) 
    .then(res=>{
    //  console.log("Added New Image",res);
       MediaLinks.push(res.secure_url);
       --count;
    })
    .catch(err=>{
      console.log("Error While uploading image to cloudinary",err);
    })
  }
  if(count===0){
  console.log("Uploaded Links->",MediaLinks);
   resolve(MediaLinks);
  }
  else if(it===files.length && count>0){
    console.log("error while uplaodng pic->");
    reject("err");
  }
    });
  }
  catch(err){
    reject("Error",err);
    console.log("error while uploading pic ",err);
  }
  
  })
}


ProductRouter.post('/add' , multerUpload.array("image",8),   async(req, response)=>{
 console.log(req);
 console.log("Rest of Data->",req.body); 
  console.log(req.body.Sender); 
 console.log("Trying to Upload image ->",req.files);
  var NewProduct = new ProductSchema({
    FullName:req.body.FullName,
    Description:req.body.Description,
    Specifications:req.body.Specifications, 
    Media:[],
    ProductId:new mongoose.Types.ObjectId().toString(), 
    SellerId:req.body.SellerId,
    TimeStamp: Date.now().toString(),
    Price:req.body.Price || 0,
    Quantity:req.body.Quantity || 0,
    Offers:req.body || []
  });
  const files = req.files;
 if(files && files.length>0){
   addMedia(files).then(async (res)=>{
    console.log("response from promise is ->",res);
    NewProduct.Media = res; 
    console.log("New Product about to be Inserted is ->",NewProduct);
    await NewProduct.save()
  .then(result=>{   
    console.log("Added New Post->",result);  
   //console.log("Added New Post->");
    response.status(200).send("Success");  
  })  
  .catch(err=>{ 
    console.log("error while adding new Post",err); 
    response.status(400).send(err); 
  }) 
  }).catch(err=>{console.log(err); 
    response.status(400).send(err); 
  } 
    ); 
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
  console.log("Fetched Products => ".result);
  response.status(200).json(result);
  }) 
  .catch(err=>{
    console.log("error while fetching products query",err);
    response.status(400).json(err);
  })
});

ProductRouter.get('/Specific/:ProductId',async(req,response)=>{
  const query = req.params.ProductId;
  console.log("Fetch products query for ",query);
  const ans = await ProductSchema.findOne({ProductId:query})
  .then(result=>{
  console.log("Fetched Products => ".result);
  response.status(200).json(result);
  }) 
  .catch(err=>{
    console.log("error while fetching products query",err);
    response.status(400).json(err);
  })
});

ProductRouter.post("Update/:ProductId" ,async(req,response)=>{
  const query = req.params.ProductId;
  console.log("update products query for ",query);
  await ProductSchema.replaceOne({ProductId:query}, req.body.Product )
  .then(res=>{
    console.log("update products query response",res);
    response.status(200).json(res);
  })
  .catch(err=>{
    console.log("error while updating products query",err);
  })
})


export default ProductRouter;  








