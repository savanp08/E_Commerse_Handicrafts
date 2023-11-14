import React from "react";
import './SellerProfile.scss';
import { useState, useEffect } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios'; 
import TextField from '@mui/material/TextField';
import mongoose from "mongoose";
import {  useParams } from 'react-router-dom';
import ProductCard from "../../Components/ProductCard/ProductCard";


const SellerProfile = () =>{
    const [SoldProducts,setSoldProducts] =useState([]);
    const [AddProductsForm,setAddProductForm] = useState(false);
    const params=useParams();
    const [NewProduct, setNewProduct] = useState({
        FullName:"",
        Description:[],
        Specification:[],
        TimeStamp:"",
        Price:0,
        Quantity:0,
        Offers:[],
        Media:[],
        Rating:0,
        productId:"",
        SellerId: params.email || ""
        
    });
   const email= params.email;



    const addProduct = async() =>{
        var TempData = NewProduct;
        console.log("Debugging FileUpload-> New Post->",TempData);
        if(TempData){
         
         var files = document.getElementById("Post-ImageAttach-Input");
         
         TempData.productId = new mongoose.Types.ObjectId().toString();
         
         console.log("Debugging FileUpload-> Files->",files.files);
         
         const formData  = new FormData();
         if(files && files.files && files.files.length>0){
          console.log("Debugging FileUpload-> Files Found->",files.files);
          const NewFiles=[];
          var x = files.files;
          console.log("Debug->",x,Array.isArray(x),Object.keys(x))
          Object.keys(x).forEach(index=>{
           formData.append("image",x[index],x[index].path);
          })
          console.log("Debugging FileUpload->  Type of ->",)
        //  formData.append("image",NewFiles);
          console.log("Debugging FileUpload-> New Files Array->",NewFiles);
        }
         formData.append("FullName",TempData.FullName);
         formData.append("Description",TempData.Description);
         formData.append("productId",TempData.productId);
         formData.append("Price",TempData.Price);
         formData.append("Quantity",TempData.Quantity);
         formData.append("Rating",TempData.Rating);
         formData.append("SellerId",TempData.SellerId);
         
         for (var pair of formData.entries()) {
          console.log("Debug-> FormData->",pair[0]+ ', ' + pair[1]); 
      }
      const Port ="http://localhost:5000";
         await axios.post(`${Port}/Products/add`,
         formData,
         {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
         )
         .then(res=>{
          console.log("Post Insertion Response->",res);
          
      
         })
         .catch(err=>{
          console.log("Post Insertion Error->",err);
         })
      
      
      
        }
        
      }

       useEffect(()=>{
        const Port ="http://localhost:5000";
              axios.get(`${Port}/Products/get`)
              .then(res=>{
                console.log("Products fected",res);
                setSoldProducts(res.data);
              })
              .catch(err=>{
                console.log("error while getting products",err)
              })
       },[])

   console.log("Products being displayed in seller profile",SoldProducts);
    return(
        <div className="SellerProfileWrapper">
        <div  className="SellerProfileDetailsWrapper">

        </div>
        <div className="SellerProfile-AddProductWrapperTotal">
        <div className="SellerProfile-AddProductIcon">
            <span className="SellerProfile-AddProductButton"  onClick={()=>{
               setAddProductForm(true);
            }}  >  Add Product </span>

        </div>
        <div  className={"SellProductFormWrapper"  + (AddProductsForm===true? "" : " Hide")}>
        <TextField
          id="Seller-Product-FullName-TypeArea"
          label="Full Name"
          placeholder="Full Name"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.FullName= e.target.value;
            setNewProduct(NewProduct);
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Description"
          placeholder="Description"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.Description= e.target.value;
            setNewProduct(NewProduct);
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Price"
          placeholder="Price"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.Price= e.target.value;
            setNewProduct(NewProduct);
          }}

          sx={{width:'20%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Quantity"
          placeholder="Quantity"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.Quantity= e.target.value;
            setNewProduct(NewProduct);
          }}
          sx={{width:'20%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <div className="Seller-MediaButton">
        <label htmlFor="Post-ImageAttach-Input">
                     <input accept="image/*" id="Post-ImageAttach-Input" multiple type="file"   className="AttachFile-InputBar Hide" 
                     onChange={(e)=>{
                     
                      
                        var files = document.getElementById("Post-ImageAttach-Input");
                        var media=[];
                        if(files && files.files && Object.keys(files.files).length>0){
                          Object.keys(files.files).forEach(index=>{
                            console.log("Debug PostMedia->",files.files[index],files.files)
                            media.push(URL.createObjectURL(files.files[index]));
                          })
                        }
                        NewProduct.Media = media;
                        setNewProduct(NewProduct);
                     }}
                     />
                    <AttachFileIcon 
                    sx={{
                      width:'40px' , height:'35px' ,  cursor:'pointer'
                    }}
                                />
                       </label>
        </div>
        <div className="Seller-AddForm-Button">
            <span  onClick={()=>{
                addProduct();
            }} >Add Product</span>
        </div>
            </div>
            </div>
        <div className="SellerProfile-SoldProducts-Wrapper">
         {
            SoldProducts.map(product=>{
              if(product.SellerId === email){
                return(
                    <ProductCard product={product} />
                )
              }
            })
          
         }
        </div>
        </div>
    )
}

export default SellerProfile;