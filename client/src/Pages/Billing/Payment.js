import React, { useEffect, useState } from "react";
import './Payment.css';

import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const Payment = () =>{
    const params = useParams();
    const UserName = params.UserName;
const Total = params.Total;
console.log(params);
const [CardNumber,setCardNumber] = useState("");
const [Pin,setPin] = useState("");
const [FullName,setFullName] = useState("");
const [Cart , setCart] = useState([]);

useEffect(()=>{
    const Temp = window.localStorage.getItem("Cart");
    const X = JSON.parse(Temp);
    setCart(X);
  console.log("Cart Items fected from local storage", X);
},[])
  
  async function userEdit (){
    const Port = "http://localhost:5000";
    Cart.forEach(async product=>{
      await axios.post(`${Port}/Products/Update/${product.ProductId}`,{
        
      })
      .then(res=>{
             
      })
      .catch(err=>{
         
      })
    })
    
       
  }

    return(
        <div className="PaymentPage-Wrapper">
            Enter Payment Deatils
              <div className="Payment-Container">
              <TextField
          id="Seller-Description-TypeArea"
          label="Card Number"
          placeholder="Card Number"
          onChange={(e)=>{
            setCardNumber(e.target.value);
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Enter Pin"
          placeholder="Pin"
          
          onChange={(e)=>{
           setPin(e.target.value)
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Account Holdee Full Name"
          placeholder="Account Holdee Full Name"
          onChange={(e)=>{
            setFullName(e.target.value)
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
              </div>
              <div className="Payment-SubmitButton"
              onClick={()=>{
                userEdit();
                window.location.replace('/Acknoledgemnt')
              }}
              >
                Pay {Total}
              </div>
        </div>
    )
}

export default Payment;