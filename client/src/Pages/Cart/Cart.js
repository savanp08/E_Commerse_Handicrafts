import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CartCard from "../../Components/CartCard/CartCard";
import './Cart.css'
import { useDispatch, useSelector } from "react-redux";
import RestCompWithFilter from "../../Components/RestCompWithFilter/RestCompWithFilter";
import { addCheckout } from "../../Store/Slices/Checkout/Checkout";

const Cart = () =>{
  const cart = useSelector(state=>state.cart);
  const user = useSelector(state=>state.user);
  const [restaurantMap,setRestaurantMap] = useState(new Map());
  const [totalsMap, setTotalsMap] = useState(new Map());
  const [displayMap,setDisplayMap] = useState(new Map());
  const [displayRestMap, setDisplayRestMap] = useState(new Map());
  const [total,setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   useEffect(()=>{
    async function fetchAllRest(){
    await axios.get(`/Restaurant/getAllRestaurants`)
      .then(res=>{
        console.log("Products retrieved",res.data);
          if(Array.isArray(res.data)){
                var x = new Map();
                res.data.forEach((product)=>{
                    x.set(product._id,product);
                })
                setRestaurantMap(new Map(x));
  
            
          }
      }).catch(err=>{
        console.log("Error while getting products from queries",err);
      })
    }
     fetchAllRest();
   },[])


   useEffect(()=>{
    var x= new Map();
    var temp_totals= new Map();
    var t=0;
     if(cart){
     console.log("cart in cart page ",cart);
      cart.forEach((product) => {
        if (!restaurantMap.has(product.restaurantId)) return null;
        var prod = restaurantMap.get(product.restaurantId).menu.find((item) => {
          return item._id === product._id;
        });
        if (prod) {
          try {
            if (x.has(product.restaurantId))
              x.set(product.restaurantId, [...x.get(product.restaurantId), product]);
            else x.set(product.restaurantId, [product]);
            if(temp_totals.has(product.restaurantId)){
              temp_totals.set(product.restaurantId, temp_totals.get(product.restaurantId) + (product.Price/1 * product.Quantity/1));
            }
            else{
              temp_totals.set(product.restaurantId, product.Price/1 * product.Quantity/1);
            }
          } catch (err) {
            console.log("Error in cart page ", err);
          }
        }
      });

     
      
     }
     if(user && user._id){
      
     }
      setTotalsMap(new Map(temp_totals));
      setTotal(t);
      setDisplayRestMap(new Map(x));

   },[cart,user,restaurantMap])

    return(
      <div className="pcart14-main-wrap">
         <div className="pcart14-cart-header-wrap">
          <span className="pcart14-cart-header">
            Cart
          </span>
         </div>
          <div className="pcart14-cart-inner-wrap">
            {
              displayMap && Array.from(displayRestMap.values()).map((product)=>{
                if(!restaurantMap.has(product[0].restaurantId)) return null;
                var ttl  = totalsMap.get(product[0].restaurantId);
                if(!ttl) ttl=0;
                ttl=ttl/1;
                ttl=ttl.toFixed(2);
                return(
                  <div className="pcart14-cart-restaurant-wrap">
                    <div className="pcart14-cart-restaurant-header-wrap">
                      <span className="pcart14-cart-restaurant-header">
                        Total : {ttl}
                      </span>
                    </div>
                    <RestCompWithFilter restaurant={
                      {
                        ...restaurantMap.get(product[0].restaurantId),
                        menu:product
                      }
                    }/>
                    <div className="pcart14-cart-restaurant-options-wrap">
                      <button className="pcart14-cart-restaurant-options-button"
                      onClick={(e)=>{
                        var ttl  = totalsMap.get(product[0].restaurantId);
                if(!ttl) ttl=0;
                ttl=ttl/1;
                ttl=ttl.toFixed(2);
                        e.preventDefault();
                        dispatch(addCheckout({
                          total:ttl,
                          restaurantId:product[0].restaurantId,
                          data:{
                            ...restaurantMap.get(product[0].restaurantId),
                            menu:product
                          }
                        }))
                        navigate('/Checkout/'+product[0].restaurantId)
                      }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>
      </div>
    )
}

export default Cart;