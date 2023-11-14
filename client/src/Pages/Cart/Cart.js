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
    var t=0;
     if(cart){
     
      cart.forEach((product)=>{
        if(x.has(product.restaurantId))
        x.set(product.restaurantId,[...x.get(product.restaurantId),product]);
        else
        x.set(product.restaurantId,[product]);
          t+=product.Price;
      })
     }
      setTotal(t);
      setDisplayRestMap(new Map(x));

   },[cart])

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
                return(
                  <div className="pcart14-cart-restaurant-wrap">
                    <RestCompWithFilter restaurant={
                      {
                        ...restaurantMap.get(product[0].restaurantId),
                        menu:product
                      }
                    }/>
                    <div className="pcart14-cart-restaurant-options-wrap">
                      <button className="pcart14-cart-restaurant-options-button"
                      onClick={(e)=>{
                        e.preventDefault();
                        dispatch(addCheckout({
                          total:total,
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