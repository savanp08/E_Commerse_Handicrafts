import React, { useEffect, useState } from "react";
import './Payment.css';

import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const Payment = () =>{
    const params = useParams();
    var email = params.email;
const Total = params.Total;
console.log(params);
const Port = "http://localhost:5000";
const [CardNumber,setCardNumber] = useState("");
const [Pin,setPin] = useState("");
const [FullName,setFullName] = useState("");
const [Cart , setCart] = useState([]);
const [ProductList,setProductList] = useState(new Map());
const [UserData,setUserData] = useState();

useEffect(()=>{
    const Temp = window.localStorage.getItem("Cart");
    const X = JSON.parse(Temp);
    setCart(X);
  console.log("Cart Items fected from local storage", X);
},[])

  useEffect( ()=>{
    email = window.localStorage.getItem("email");
    email = JSON.parse(email);
     axios.get(`Server/Auth/USerData/${email}`)
    .then(res=>{
      console.log("User data fetched", res.data);
        setUserData(res.data);
    })
    .catch(err=>{
      console.log("error fetching user data", err);
    })
  },[])


  useEffect( ()=>{
     axios .get(`${Port}/Products/get`)
    .then(res=>{
      console.log("All products fetced ",res.data);
      const Temp = res.data;
          if(Temp && Array.isArray(Temp)){
            Temp.forEach(product=>{
              ProductList.set(product._id, product);
            })
          }
          setProductList(new Map(ProductList));
    })
    .catch(err=>{
      console.log("Error fetching products", err);
    })
  },[])
  
  async function userEdit (){
    
    Cart.forEach(async product=>{
         var temp = ProductList.get(product._id);
         temp.Quantity -= product.Quantity;
         temp.ProductsSold+=product.Quantity;
      await axios.post(`${Port}/Products/Update/${product._id}`,{
          Product: product
      })
      .then(res=>{
             console.log("Product ",product._id ," Successfully updated");
      })
      .catch(err=>{
          console.log("error while updating ",product._id);
      })
    })
    Cart.forEach(product=>{
      UserData.OrderHistory.push(product);
    })
    
            console.log("Debug user update-> Sending USedata for updation",UserData);
               await axios.post(`${Port}/Server/Auth/Update/${email}`,{
                 UserData:UserData
                 
               })
               .then(res=>{
                console.log("USerData updated",UserData);
               })
               .catch(err=>{
                console.log("error while updating userdata",err);
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
                setTimeout(()=>{
                  window.location.replace('/Acknoledgemnt')
                },3000)
                
              }}
              >
                Pay {Total}
              </div>
        </div>
    )
}

export default Payment;