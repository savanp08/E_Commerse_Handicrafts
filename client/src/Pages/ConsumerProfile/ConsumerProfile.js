import React from "react";
import './ConsumerProfile.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ProductCard from "../../Components/ProductCard/ProductCard";

const ConsumerProfile = () =>{

    const [CartProducts, setCartProducts] = useState([]);
    const [OrderHistory, setOrderHistory] = useState([]);
    const [AllProducts, setAllProducts] = useState([]);
    const params = useParams();
    const UserName = params.userName;



    useEffect(()=>{
        const Port ="http://localhost:5000";
      axios.get(`${Port}/Server/Auth/UserData/${UserName}`)
      .then(res=>{
        console.log("Products fetched for user are ", res.data);
           setAllProducts(res.data);
           setCartProducts(res.data.Cart);
           setOrderHistory(res.data.OrderHistory);
      })
      .catch(err=>{
        console.log("Error fetching products",err);
      })
    },[])

     

    return(
        <div className="ConsumerProfileWrapper">
         <div className="ConsumerProfile-Cart-Wrapper">
          Cart
            {
                CartProducts.map(product=>{
                    return(
                     <ProductCard product={product} />
                    )
                })
            }
         </div>
         <div className="ConsumerProfile-History-Wrapper">
           Order History
               {
                OrderHistory.map(product=>{
                    return(
                        <ProductCard product={product} />
                       )
                })
               }
         </div>
        </div>
    )
}

export default ConsumerProfile;