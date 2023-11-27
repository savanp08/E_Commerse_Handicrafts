import axios from "axios";
import React, { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import './Description.scss';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from "react-redux";
import { restaurant_initialState } from "../../Data/Schemas";
import { addCart } from "../../Store/Slices/CartSlice/CartSlice";
import {
   product_initialState,
} from "../../Data/Schemas";

const Description = () =>{

   const [Product,setProduct]=useState();
   const [Count,setCount] = useState(1);
   const [DisplayReviewForm,setDisplayReviewForm] = useState(false);
   const cart = useSelector(state=>state.cart);
   const params= useParams();
   const productId = params.id;
   const [rating,setRating] = useState(0);
   const [numOfReviews,setNumOfReviews] = useState(0);
   const navigate = useNavigate();
const user= useSelector(state=>state.user);
const admin= useSelector(state=>state.admin);
const restId = params.restId;
const [restauarant , setRestaurant] = useState({
   restaurant_initialState
});

function hasRated(){
   if(user && user._id){
      var temp_map = new Map();
      Array.from(Product.reviews).forEach((item)=>{temp_map.set(item.userId,item);});
      if(temp_map.has(user._id)) return true;
   }
   return false;
}
async function submitReview(rating){
  var menu = [];
  var flag = hasRated();
   if(flag){
   for(var i=0;i<restauarant.menu.length;i++){
      if(restauarant.menu[i]._id===Product._id){
         restauarant.menu[i]={
            ...Product,
           reviews:Product.reviews.map((item)=>{
               if(item.userId===user._id){
                   return {
                     ...item,
                     rating:rating
                   }
               }
               else{
                   return item;
               }
             })
         }
         break;
      }
   }
}
else{
   Product.reviews.push({
      userId:user._id,
      rating:rating
   })
   for(var ii=0;ii<restauarant.menu.length;ii++){
      if(restauarant.menu[ii]._id===Product._id){
         restauarant.menu[ii]={
            ...Product,
            reviews:Product.reviews
         }
         break;
      }
   }
}
   await axios.post("/Restaurant/editRestaurant", {
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

   useEffect(()=>{
      if(cart && Product){
         var temp_map = new Map();
         Array.from(cart).forEach((item)=>{
             temp_map.set(item._id,item);
         })
         if(temp_map.has(Product._id)){
            setCount(temp_map.get(Product._id).Quantity);
         }
         else{
            setCount(1);
         }
      }
      if(Product){
         var tempRating = 0;
         var tempCount = 0;
         Array.from(Product.reviews).forEach((item)=>{
            tempRating+=item.rating/1;
            tempCount++;
         });
         setRating(tempRating/tempCount);
         setNumOfReviews(tempCount);
      }

   },[cart, Product])


 
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
      <div className="Description-FullName prevent-text-overflow-without-width">Product: {Product.FullName}</div>
      <div className="Description-Rest-Desc-wrap">
      <span className="Description-FullName prevent-text-overflow-without-width" 
      style={{
         textAlign: "center",
         display: "flex",
         flexFlow:"row wrap",
      }}
      >Sold by : 
      <span className="Description-FullName prevent-text-overflow-without-width" style={{color:'blue',cursor:'pointer'}}
      onClick={(e)=>{
         navigate("/restaurant/"+restId);
      }}
      >
      {restauarant.restaurantName}
      </span>
      </span>

      </div>
      {/* <div className="Description-FullName">{Product.FullName}</div> */}
      </div>
     <div className="Description-Top">
       <img src={Product.Media[0]} className="Description-Top-Left">
       
       </img>
       <div className="Description-Top-Right">
         <div className="Description-Top-Right-Top">
         <div className="Description-Top-Right-Price">
            $: {Product.Price}
             </div>
             <div className="Description-Top-Right-Rating">
             <Rating name="half-rating" 
             onChange={(e)=>{
               if(!user || !user._id) {
                  alert("Please Login to review");
                  return;
               }
               submitReview(e.target.value)
             }}
             value={rating}
             />
             {`(${numOfReviews})`}
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
