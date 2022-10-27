import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.scss';

const FOoterStand = () =>{

  return(
    <div className="FooterWrapper">
        <div className="FooterFAQWrapper">
            FAQ
            <NavLink className={"FooterFAQEle"} to="/ProductPage" >
                FAQ 
                </NavLink>
        </div>
        <div className="FooterAboutWrapper">
            About
            <NavLink to="/About" className={"FooterFAQEle"} >
            About
                </NavLink>

        </div>
        <div className="FooterAboutWrapper">
            Contact Us
            <NavLink to="/ContactUs" className={"FooterFAQEle"} >
            Email 
                </NavLink>

        </div>
    </div>
  )

}

export default FOoterStand;