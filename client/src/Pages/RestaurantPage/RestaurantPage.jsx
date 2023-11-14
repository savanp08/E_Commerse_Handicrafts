import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RestCompWithFilter from "../../Components/RestCompWithFilter/RestCompWithFilter";
import ProductCard from "../../Components/ProductComponent/prodCard";
import axios from "axios";
import { restaurant_initialState } from "../../Data/Schemas";
import { useParams } from "react-router";
import './This.css';

const RestaurantPage = () =>{

    const params = useParams();
    const restId = params.id;
  const [restaurantMap, setRestaurantMap] = useState(new Map());
  const rest = useSelector(state=>state.restaurant);
    const user = useSelector(state=>state.user);
   const [restaurant,setRestaurant] = useState(rest || restaurant_initialState);
   const [mediaMix,setMediaMix] = useState([]);


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
                        <span className="prp15-restaurant-group-text prp15-rating-text">{restaurant.rating || ((Math.random() * (5 - 2) + 2).toFixed(1))}</span>
                        <span className="prp15-restaurant-group-text">({restaurant.num_ratings || (Math.floor(Math.random()*50 + 25))})</span>
                    </div>
                </div>

            </div>
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