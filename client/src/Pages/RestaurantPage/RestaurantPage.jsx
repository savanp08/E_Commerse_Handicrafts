import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestCompWithFilter from "../../Components/RestCompWithFilter/RestCompWithFilter";
import ProductCard from "../../Components/ProductComponent/prodCard";
import axios from "axios";
import { restaurant_initialState } from "../../Data/Schemas";
import { useParams } from "react-router";
import './This.css';
import { Rating } from "@mui/material";
import { openForm } from "../../Store/Slices/FormSlice/FormSlice";
import Restreviews from "../../Components/RestReviews/Restreviews";

const RestaurantPage = () =>{

    const params = useParams();
    const restId = params.id;
  const [restaurantMap, setRestaurantMap] = useState(new Map());
  const rest = useSelector(state=>state.restaurant);
    const user = useSelector(state=>state.user);
   const [restaurant,setRestaurant] = useState(rest || restaurant_initialState);
   const [mediaMix,setMediaMix] = useState([]);
   const dispatch = useDispatch();

   useEffect(()=>{
    if(rest && rest._id){
        setRestaurant(rest);
    }
   },[rest]);
  useEffect(()=>{
      if(restaurant && restaurant._id){
        var x=[];
        var count=0;
         restaurant.menu.forEach((product)=>{
            if(count===4) return;
            x=[...x,...product.Media]
            ++count;
         })       
          x.sort(()=>Math.random()-0.5);
            setMediaMix(x);
    }
  },[restaurant])
    useEffect(()=>{
    
        async function fetchOneRest(){
            console.log("restId in restaurant page ",restId);
            await axios.get("/Restaurant/getOne/"+restId)
            .then(res=>{
                console.log("response from get one restaurant ",res);
                if(res.status===200){
                    setRestaurant(res.data);
                }
                
            }).catch(err=>{
                console.log("error from get one restaurant ",err);
            })
        }
        
     fetchOneRest() 
    },[])

    function userHasRated() {
        try{
        if (!user) return true;
        if (!user.ratings) return true;
        if (!restaurant || !restaurant._id) return true;
        var flag=false;
        for(var i=0; i<user.ratings.length; i++){
            try{
            if(user.ratings[i].restaurantId === restaurant._id){
                flag=true;
                break;
            }
        }catch(err){console.log("Err while looping on restaurant user ratings",err)}
        }
        console.log("User has rated?",flag,user.ratings, restaurant._id);
        return flag;
        }catch(err){
            console.log("Error while checking if user rated",err);
        }
    }

    async function updateUserRating(rating,rated){
        if(!user || !user._id) return;
        var tempuser = JSON.parse(JSON.stringify(user));
        var flag=false;
        for(var i =0;i<tempuser.ratings.length;i++){
            try{
            if(tempuser.ratings[i].restaurantId === restaurant._id){
                tempuser.ratings[i].rating = rating;
                flag=true;
                break;
            
            }
        }catch(err){
            console.log("Err while looping on restaurant user ratings",err);
        }
    }
        if(!flag){
            tempuser.ratings.push({
                restaurantId: restaurant._id,
                rating: rating,
            })
        }
          await axios.post("/Auth/updateOne",{

            ...tempuser,
           
            


          }).then(res=>{
                console.log("response from update user rating ",res);
            

          }).catch(err=>{
                console.log("error from update user rating ",err);
          
          })
    }

    async function updateRest(rating,rated){
        var rest = restaurant
         var userRating = 0;
         if(rated){
            for(var i=0;i<user.ratings.length;i++){
                if(user.ratings[i].restaurantId === restaurant._id){
                    userRating = user.ratings[i].rating;
                    break;
                }
            }
         }
            var num_ratings = restaurant.num_ratings;
            if(!rated){
                num_ratings++;
            }
            var newRating = (restaurant.rating/1 - userRating/1 + rating/1);
          try{
            console.log("updating rest ",rest,newRating,userRating,rating,num_ratings);
                 await  axios.post("/Restaurant/editRestaurant",{
                    ...rest,
                    rating: newRating,
                    num_ratings: num_ratings,
                  }).then(res=>{
                        console.log("response from update rest ",res);

                  }).catch(err=>{
                        console.log("error from update rest ",err);
                  
                  })
          }catch(err){
                console.log("error from update rest ",err);
          }
    }

    async function updateRestReviews(rest){
        try{
          await   axios.post("/Restaurant/editRestaurant",{
              ...rest
            }).then(res=>{
                  console.log("response from update rest ",res);

            }).catch(err=>{
                  console.log("error from update rest ",err);
            
            })
        }catch(err){
                console.log("error from update rest ",err);
        }
    }

  useEffect(()=>{
    if(restaurant && restaurant._id){
      var x = new Map();
      x.set(restaurant._id,restaurant);
      setRestaurantMap(new Map(x));
    }
    },[restaurant]);
    var address = "";
    if(restaurant && restaurant.location){
        address = restaurant.location.street1 + ", " + restaurant.location.street2 + ", " + restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.zipcode;
    }

    console.log("restaurant in restaurant page ",restaurant);
    return(
        <div className="prp15-main-wrap">
           
           <div className="prp15-title-wrap">
            <div className="prp15-media-compile-wrap">
               <div className="prp15-media-compile-inner-wrap0">
                {
                    mediaMix && mediaMix.length>0? (
                        <img className="prp15-media-compile-img0" src={mediaMix[0]} alt="restaurant" />
                    ):(
                        <div></div>
                    )                        
                    
                }
               </div>
               <div className="prp15-media-compile-inner-wrap1">
                {
                    mediaMix && mediaMix.length>1? (
                        <img className="prp15-media-compile-img1" src={mediaMix[1]} alt="restaurant" />
                    ):(
                        <div></div>
                    )                        
                    
                }
                {
                    mediaMix && mediaMix.length>2? (
                        <img className="prp15-media-compile-img1" src={mediaMix[2]} alt="restaurant" />
                    ):(
                        <div></div>
                    )
                }
               </div>
               
            </div>
             
           </div>
           <div className="prp15-restaurant-inner-wrap">
            <div className="prp15-restaurant-info-wrap">
                <div className="prp15-restaurant-info-inner-wrap">
                    <div className="prp15-restaurant-group-wrap1">
                        <span className="prp15-restaurant-group-text prp15-rest-name-text">{restaurant.restaurantName}</span>
                        <span className="prp15-restaurant-group-text">{address}</span>
                        <span className="prp15-restaurant-group-text">Mon-Fri 9 AM to 10 PM</span>
                    </div>
                    <div className="prp15-restaurant-group-wrap2">
                        <Rating
                            name="simple-controlled"
                            value={(restaurant.rating/1)/(restaurant.num_ratings/1)}
                            readOnly={user._id? false : true}
                            onClick={(e)=>{
                                if(!user || !user._id) {
                                    alert("Please Login to rate");
                                }
                            }}
                            onChange={(e)=>{
                                if(!user || !user._id) {
                                    alert("Please Login to rate");
                                    return;
                                }
                                console.log("rating ",e.target.value);
                                
                                
                                var rated  = userHasRated()
                                   updateRest(e.target.value, rated);
                                    updateUserRating(e.target.value,rated);
                                
                            }
                            }
                        />
                        <span className="prp15-restaurant-group-text">({restaurant.num_ratings})</span>
                    </div>
                </div>
              <div className="prp15-restaurant-reviews-wrap">
                <div className="prp15-restaurant-reviews-inner-wrap">
                     {
                            restaurant && restaurant.reviews && restaurant.reviews.length>0? (
                                restaurant.reviews.map((review,key)=>{
                                    return(
                                        <div className="prp15-restaurant-review-wrap" key={key}>
                                            
                                            {/* <span className="prp15-restaurant-review-text">{review.name}</span>
                                            <Rating
                                                name="simple-controlled"
                                                value={review.rating/1}
                                                readOnly
                                            />
                                            <span className="prp15-restaurant-review-text">{review.text}</span> */}
                                        </div>
                                    )
                                })
                            ): null
                     }
                </div>
                <div className="prp15-restaurant-reviews-option-wrap">
                    <span className="prp15-restaurant-reviews-option-text"
                    
                    onClick={(e)=>{
                        
                            dispatch(openForm({
                                formName:"reviews",
                                data:null
                            }))
                    }}
                    >View Reviews</span>
                </div>
                
              </div>
            </div>
            <Restreviews restaurantX={restaurant} user={user}/>
            <div className="prp15-restaurant-featured-list-wrap">

            </div>
            <fieldset className="prp15-restaurant-menu-title-wrap">
                <legend className="prp15-restaurant-menu-title-text">Menu</legend>
            </fieldset>
            <div className="prp15-restaurant-all-list-wrap">
             {
                restaurant && restaurant.menu && Array.from(restaurant.menu).map((res,key)=>{
                    return(
                        <ProductCard key={key} product={res} />
                    )
                })
             }
            </div>
           </div>
        </div>
    )
}

export default RestaurantPage;