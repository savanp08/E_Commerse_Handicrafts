import React, { useEffect, useState } from "react";
import './NavBar.css'
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const Left_Menu = () =>{
   
    

    const [openMenu,setOpenMenu] = useState(false);
     useEffect(()=>{
     
        document.addEventListener("click",function(e){
          console.log(" dropdown menu of profile is open?",openMenu);
          if(openMenu===true){
         var x = document.getElementById("NavBar-LeftMenu-OptionsContainer");
         var y = document.getElementById("NavBar-LeftMenu-Button");
         console.log(e.target);
         if(e.target!==x && e.target!==y && !x.contains(e.target)){
            console.log("doesnt contains div so closing resp nav");
            if(openMenu===true)
              setOpenMenu(false);
             
         }
          }
        })
         return ()=>{
               document.removeEventListener("click",function(){

               });
         }
        
     },[])
     
      
    return(
        <div className="NavBar-LeftMenu-Wrapper" id="NavBar-LeftMenu-Wrapper" >
           <IconButton sx={{ p: '10px',
            
        }} aria-label="menu"
           onClick={(e)=>{
            if(openMenu===true)
              setOpenMenu(false);
              else setOpenMenu(true);
           }}
          
           >
        <MenuIcon    id="NavBar-LeftMenu-Button" 
        sx={{
            height:'32px', width:'40px'
        }}
        />
      </IconButton>
      <div className={"NavBar-LeftMenu-OptionsContainer" + (openMenu===true ? "" : " Hide")   }
      id="NavBar-LeftMenu-OptionsContainer"
      >
        <div className="NavBar-LeftMenu-ContentType">
            What Do you want to View
            <span className="DividerHorizontal-Full" />
            <span className="NavBar-LeftMenu-ContentEle">
                Ingredients and Raw Materials
            </span>
            <span className="DividerHorizontal-Half" />
            <span className="NavBar-LeftMenu-ContentEle">
               Products
            </span>
        </div>
      </div>
        </div>
    )
}


export default Left_Menu;