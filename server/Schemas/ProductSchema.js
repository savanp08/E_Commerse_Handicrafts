import mongoose from "mongoose";

const ProductShemaX = new mongoose.Schema({
FullName:{
    type:String,
        default:"Guest",
        required:true,
        unique:false,
        minlength:1
},
ProductId:{
    type:String,
    default:"Guest",
    required:true,
    unique:true,
    minlength:1
},
Description:
    [
        {
    type:String,
        default:"None",
        required:true,
        unique:false,
        minlength:1
        }
    ]
,
Specifications: [
    {
type:String,
    default:"None",
    required:true,
    unique:false,
    minlength:1
    }
]
,
Rating:{
    type:Number,
    default:"0",
    required:true,
    unique:false,
    minlength:1
},
NumberOfRatings:{
    type:Number,
    default:"0",
    required:true,
    unique:false,
    minlength:1
},
Price:{
    type:Number,
    default:"NA",
    required:true,
    unique:false,
    minlength:1
},
Offers:[
],
Media:[],
Quantity:{
    type:Number
},
SellerId:{
    type:String,
    default:"None",
    required:true,
    unique:false,
    minlength:1
}
});

 
const ProductShema = mongoose.model("ProductShema",ProductShemaX);
export default ProductShema;