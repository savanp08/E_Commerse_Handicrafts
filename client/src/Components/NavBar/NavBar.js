import React ,{useState,useEffect} from "react";
import './NavBar.css'
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Left_Menu from "./LeftSideRespNav";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge';



var menuStatus = false;
function closeMenuFun(){

}
 
const NavBar = () => {

  const [SearchQuery, setSearchQuery] = useState();
  const [itemCount, setItemCount] = useState(0);
  const history = useNavigate();
  async function searchFun(){
    history(`/Query/${SearchQuery}`);
  }


  window.addEventListener('storage', () => {
    // When local storage changes, dump the list to
    // the console.
    console.log("Local storage changed");
    console.log(JSON.parse(window.localStorage.getItem('Cart')));
    const items=localStorage.getItem("Cart");
    if(items && Array.isArray(items)) setItemCount(items);
  });


  return(
    <div className="NavBar-Wrapper">
        <div className="NavBar-ContentType">
       <NavLink to="/" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
         Home
        </NavLink>
      
        </div>
        <div className="NavBar-SearchBarWrapper">
        <InputBase
        sx={{ ml: 1, flex: 1 , color: "white" 
        
        }}
        placeholder="Search .."
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e)=>{
          setSearchQuery(e.target.value);
        }}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
           if(!ev.shiftKey){ searchFun();
            ev.preventDefault();
           }
          }
        }}
      />
        </div>
    <div className="NavBar-LoginOptions">
    <NavLink to="/Login" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
        Login
        </NavLink>
    </div>
    <div className="NavBar-AccountOptions">
  <AccountOptions />
    </div>
    <Badge color="secondary" badgeContent={itemCount}
  
    >
          <ShoppingCartIcon 
            sx={{
              width:35,
              height:35
            }}
          />{" "}
        </Badge>
    </div>
  )

}

const AccountOptions = () =>{
  const [TempStatus, setTempStatus] =useState(false);
  return(
    <div className="AccountOptions-Wrapper">
       <AccountCircleIcon 
            sx={{ 
              height:'45px',
              width:'45px',
              cursor:'pointer'
            }} 
            onClick={()=>{
              menuStatus=!menuStatus;
              console.log(" MenuStatus is " , TempStatus);
              setTempStatus(menuStatus);
            }}
            />
            <div className={"AccountOptionsMenuContainer" + (TempStatus===true? "" : " Hide")} id="AccountOptionsMenuContainer" >
              <div className="AccountOptionsEle" >
                Profile
              </div>
              <div className="AccountOptionsEle" >
                Your Orders
              </div>
              <div className="AccountOptionsEle" >
               View Cart
              </div>
              <div className="AccountOptionsEle" >
                See History
              </div>
              <div className="AccountOptionsEle" >
                Related Search
              </div>
            </div>
    </div>
  )
}

const RespNavBar = () =>{
  

  const [SearchQuery, setSearchQuery] = useState();
  const history = useNavigate();
  async function searchFun(){
    history(`/Query/${SearchQuery}`);
  }

    return(
        <div className="NavBarResp-Wrapper">
            <div className="NavBarResp-LeftsideOptionsMenu">
             <Left_Menu />
                </div>
            <div className="NavBarResp-SearchBarWrapper">
            <InputBase
       sx={{ ml: 1, flex: 1 , color: "white" 
        
      }}
      placeholder="Search .."
      inputProps={{ 'aria-label': 'search' }}
      onChange={(e)=>{
        setSearchQuery(e.target.value);
      }}
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
         if(!ev.shiftKey){ searchFun();
          ev.preventDefault();
         }
        }
      }}
      />
            </div>
            <div className="NavBarResp-LoginOptions">
            <NavLink to="/Login" className={isActive=> "NavBar-LinkEle" + (isActive ? "" : " ActiveEle-NavBar")} >
        Login
        </NavLink>
   
            </div>
            <div className="NavBarResp-Account">
           <AccountOptions />
            </div>
        </div>
    )
}

export default NavBar;
export { RespNavBar } ;