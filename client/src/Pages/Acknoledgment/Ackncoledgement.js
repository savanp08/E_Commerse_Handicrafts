import React, { useEffect } from 'react';
import './Acknoloedgement.css';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Acknoledgemnt = () =>{
    const params = useParams();
    const orderType = params.orderType;
    const order = useSelector(state=>state.checkout.data);
    const user = useSelector(state=>state.user);
     const navigate = useNavigate();
    async function sendConfimration(){
        axios.post("/Auth/OrderConfirmation",{
            order:order,
            user:user
        }).then(res=>{
            console.log("Order Confirmed");
            
        }).catch(err=>{
            console.log("Error in sending order confirmation");
        
        })
    }
    
    console.log("BSBSBBSBSBSBBS order => ",order);
    useEffect(()=>{
       
        if(user && user._id && order && order.data){
              sendConfimration()
        }
    },[user,order])

    return(
        <div className='AcknoledgemntPageWrapper'>
            <div className='Acknoledgemnt-Container'>
              <div className="pack333-success-text-wrap">
                <span className='pack333-success-text-1'>
                           Your Order has been placed successfully
                </span>
              </div>
              <div className='pack333-additional-info-wrap'>
                <span className='pack333-additional-info-text'>
                    A mail has been sent to your registered email address with the pin number.
                
                </span>
              </div>
              <button className='pack333-continue-shopping-btn' onClick={()=>{
                navigate('/');
              }}>
                Back to Home
              </button>
                 </div>
        </div>
    )
}
export default Acknoledgemnt;