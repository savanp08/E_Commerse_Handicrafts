import mongoose from "mongoose";

const ProductShemaX = new mongoose.Schema({
FullName:{
    type:String,
        default:"Test Product",
        
        unique:false,
       
},
productId:{
    type:String,
    default:"Guest",
    
    unique:true,
   
},
restaurantId:{
    type:String,
},
Description:
    [
        {
    type:String,
        default:"None",
        
        unique:false,
       
        }
    ]
,
Specifications: [
    {
type:String,
    default:"None",
    
    unique:false,
   
    }
]
,
Rating:{
    type:Number,
    default:"0",
    
    unique:false,
   
},
NumberOfRatings:{
    type:Number,
    default:"0",
    
    unique:false,
   
},
reviews:[],
Price:{
    type:Number,
    default:"NA",
    
    unique:false,
   
},
Offers:[
],
Promos:[],
Media:[],
Quantity:{
    type:Number,
    default:0
},
SellerId:{
    type:String,
    default:"None",
    
    unique:false,
   
},
ProductsSold:{
    type:Number,
    default:0
}
});

 
const ProductShema = mongoose.model("ProductShema",ProductShemaX);
export default ProductShema;