import axios from "axios";
import React, { useState , useEffect } from "react";
import { useParams } from "react-router";
import './Description.scss';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from "react-redux";
import { restaurant_initialState } from "../../Data/Schemas";
import { addCart } from "../../Store/Slices/CartSlice/CartSlice";


const Description = () =>{

   const [Product,setProduct]=useState();
   const [Count,setCount] = useState(1);
   const [DisplayReviewForm,setDisplayReviewForm] = useState(false);
   const params= useParams();
   const productId = params.id;
   const cart = useSelector(state=>state.cart);
const user= useSelector(state=>state.user);
const admin= useSelector(state=>state.admin);
const restId = params.restId;
const [restauarant , setRestaurant] = useState({
   restaurant_initialState
});

async function submitReview(){
  var menu = [];
   for(var i=0;i<restauarant.menu.length;i++){
      if(restauarant.menu[i]._id===Product._id){
         restauarant.menu[i]={
            ...Product,
            Rating:(Product.Rating/1)+(restauarant.menu[i].Rating/1),
            NumberOfRatings:1+(restauarant.menu[i].NumberOfRatings/1),

         }
         break;
      }
   }
   await axios.post("/Restaurant/updateOne", {
      ...restauarant,


   }).then(res=>{
       console.log("response from update user ",res);
   
   }).catch(err=>{
       console.log("error from update user ",err);
   
   })
}

const dispatch = useDispatch();

   useEffect(()=>{
      async function fetchOneRest(){
         console.log("restId in restaurant page ",restId);
         await axios.get("/Restaurant/getOne/"+restId)
         .then(res=>{
             console.log("response from get one restaurant ",res);
             if(res.status===200){
                 setRestaurant(res.data);
                 setProduct(res.data.menu.find((product)=>{
                    return product._id===productId;
                 }))
             }
             
         }).catch(err=>{
             console.log("error from get one restaurant ",err);
         })
     }
     
  fetchOneRest() 
   },[])



 
async function AddToCartProduct(ProductX){
   var Product = {...ProductX};
   Product.Quantity = Count+0;
   var tUser = {...user};
   var temp_map = new Map();
   Array.from(cart).forEach((item)=>{
       temp_map.set(item._id,item);
   })
   temp_map.set(Product._id,Product);
   tUser.cart = Array.from(temp_map.values());

   if(user && user._id){
       await axios.post("/Auth/updateOne", {
          ...tUser
       })
   }
   var newuniqueArr = Array.from(temp_map.values());
   dispatch(addCart(newuniqueArr));
}


console.log("Product in description page ",Product);


if(Product){
   if(Product.Rating<=0) Product.Rating=1;
   return(
    <div className="DescriptionWrapper">
      <div className ="DescriptionPage-TopDetails">
      <div className="Description-FullName">Product: {Product.FullName}</div>
      <div className="Description-FullName">Sold by : {Product.SellerId}</div>
      {/* <div className="Description-FullName">{Product.FullName}</div> */}
      </div>
     <div className="Description-Top">
       <img src={Product.Media[0]} className="Description-Top-Left">
       
       </img>
       <div className="Description-Top-Right">
         <div className="Description-Top-Right-Top">
         <div className="Description-Top-Right-Price">
            Rs: {Product.Price}
             </div>
             <div className="Description-Top-Right-Rating">
             <Rating name="half-rating" 
             onChange={(e)=>{
               var val  = e.target.value/1;
                  console.log("rating changed ",val);
                  if(user && user._id){
                     var userReviewd = false;
                     var temp_map = new Map();
                     Array.from(user.reviews).forEach((item)=>{
                        temp_map.set(item._id,item);
                     });
                     if(temp_map.has(Product._id)) 
                     userReviewd = true;
                  if(!userReviewd){
                  setProduct({...Product, 
                     Rating:(e.target.value)/1
                  ,NumberOfRatings:1
                  });
               }
               }
               else{
                  alert("Please Login to review");
               }
             }}
             defaultValue={(Product.Rating/1)/(Product.NumberOfRatings)} precision={1}/>
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
            <button className="pd191-addtocart-button"  
            onClick={()=>{
              AddToCartProduct(Product);
            }}
            >
               Add To Cart
            </button>
         </div>
         </div>
         </div>
     </div>
     <div className="Description-Bottom">
      {Product.Description[0]}
     </div>
     <div className="Description-SubmitReviewWrapper">
      <div className="Description-SubmitReviewButton CustomButton-GeneralProperties"
      onClick={()=>{
         submitReview();
      }}
      >
         Submit Review
      </div>
     </div>
    </div>
   )
   }
}


export default Description;
