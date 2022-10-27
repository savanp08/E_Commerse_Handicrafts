import axios from "axios";
import React, { useState , useEffect } from "react";
import { useParams } from "react-router";
import './Description.scss';
import Rating from '@mui/material/Rating';

const Description = () =>{

   const [Product,setProduct]=useState();
   const [Count,setCount] = useState(1);

   const params= useParams();
   const ProductId = params.ProductId;
   useEffect(()=>{
      const Port="http://localhost:5000";
     axios.get(`${Port}/Products/Specific/${ProductId}`)
     .then(res=>{
      console.log("Single Product Fetched",res.data);
       setProduct(res.data);
     })
     .catch(err=>{
      console.log("Error fetching Single Product",err);
     })
   },[])
if(Product){
   if(Product.Rating<=0) Product.Rating=1;
   return(
    <div className="DescriptionWrapper">
      <span className="Description-FullName">{Product.FullName}</span>
     <div className="Description-Top">
       <img src={Product.Media[0]} className="Description-Top-Left">
       
       </img>
       <div className="Description-Top-Right">
         <div className="Description-Top-Right-Top">
         <div className="Description-Top-Right-Price">
            Rs: {Product.Price}
             </div>
             <div className="Description-Top-Right-Rating">
             <Rating name="half-rating" defaultValue={Product.Rating} precision={1}/>
             {`(${Product.NumberOfRatings})`}
         </div>
         </div>
         <div className="Description-Top-Right-Bottom">
            <div className="DescriptionPage-QuantityWrapper">
            <div className="DescriptionPage-QuantityButtons Incr"
            onClick={()=>{
               setCount(Count+1);
            }}
            >
            +
            </div>
            <span className="Description-Count">
            {Count}
            </span>
            
            <div className="DescriptionPage-QuantityButtons Decr"
             onClick={()=>{
               setCount(Count-1);
            }}
            >
            -
            </div>
            </div>
         <div className="DescriptionPage-AddToCart">
            <span className="Description-AddCart-Button"  
            onClick={()=>{
               var CartProducts = localStorage.getItem("Cart");
               console.log("Cart Items Fetched from Local Storage",CartProducts);
               Product.Quantity = Count;
               if(!CartProducts || !Array.isArray(CartProducts) || CartProducts.size()===0){ CartProducts=[Product];
                 
               }
               else{
                  CartProducts=JSON.parse(CartProducts);
                  CartProducts.push(Product);
               }
              
               
               localStorage.setItem("Cart",JSON.stringify(CartProducts));
               console.log("Cart Items Added to Local Storage",CartProducts);
               localStorage.clear();
            }}
            >
               Add To Cart
            </span>
         </div>
         </div>
         </div>
     </div>
     <div className="Description-Bottom">
      {Product.Description[0]}
     </div>
    </div>
   )
   }
}


export default Description;
