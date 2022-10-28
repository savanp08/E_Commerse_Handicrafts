import React ,{useState,useEffect} from "react";
import './NavBar.css'
import { useNavigate, useParams } from "react-router";
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
    window.location.replace(`/Query/${SearchQuery}`);
  }
  
  const params = useParams();

  const [TempStatus, setTempStatus] =useState(false);

  function funRouteToProfile (){
    
                
  }
  function reverse(s){
    return s.split("").reverse().join("");
}






 
  useEffect(()=>{
    const UserName = params.UserName;
    if(!UserName){
    let Temp = localStorage.getItem("Cart");
     
        
      
    console.log("Cart Initial -> Cart Items Fetched from Local Storage",JSON.parse(Temp));
    
     
      

     var Parsed;
    if(Temp && Temp.length>0){ 
     Parsed = JSON.parse(Temp);
    }
    else Parsed = [];
    if(!Array.isArray(Parsed)){
        Parsed = [Parsed];
      }
     console.log("Cart Initial -> Parsed from Cart ->",Parsed , "Of length",Parsed.length);
    if(Parsed && Array.isArray(Parsed)) setItemCount(Parsed.length);
    }

    
  },[])

  useEffect(()=>{
    const localStorageSetHandler = function(e) {
      let Temp = localStorage.getItem("Cart");
     
        
      
      console.log("Cart Count -> Cart Items Fetched from Local Storage",JSON.parse(Temp));
      
       
        
  
       var Parsed;
      if(Temp && Temp.length>0){ 
       Parsed = JSON.parse(Temp);
      }
      else Parsed = [];
      if(!Array.isArray(Parsed)){
          Parsed = [Parsed];
        }
       console.log("Cart Count -> Parsed from Cart ->",Parsed , "Of length",Parsed.length);
      if(Parsed && Array.isArray(Parsed)) setItemCount(Parsed.length);
    };
    
    document.addEventListener("itemInserted", localStorageSetHandler, false);
  },[])

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
    <div className="NavBar-CartIcon"
    onClick={()=>{
      var UserName = params.UserName || "";
                
      console.log("Params",params);
      console.log("Url",window.location.href);
      const url= window.location.href;
      const len= url.length;
      var str="";
      for(var i=len-1;i>=0;i--){
        if(url[i]==='/') break;
        str+=url[i];
      }
      if(str.length>1 && str!=="Shop" || str!=="localhost:3000" || str!=="Query"){
        UserName=reverse(str);
      }
      console.log(UserName , " -> UserName");
      window.location.replace(`/Cart/${UserName}`)
    }}
    >
    <Badge color="secondary" badgeContent={itemCount}
  
    >
          <ShoppingCartIcon 
            sx={{
              width:35,
              height:35,
              cursor:'pointer'
            }}
          />
        </Badge>
        </div>
    </div>
  )

}

const AccountOptions = () =>{

  const history = useNavigate();
  const params = useParams();

  const [TempStatus, setTempStatus] =useState(false);

  function funRouteToProfile (){
    
                
  }
  function reverse(s){
    return s.split("").reverse().join("");
}

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
              <div className="AccountOptionsEle" 
              onClick={()=>{
                var UserName = params.UserName || "";
                
                console.log("Params",params);
                console.log("Url",window.location.href);
                const url= window.location.href;
                const len= url.length;
                var str="";
                for(var i=len-1;i>=0;i--){
                  if(url[i]==='/') break;
                  str+=url[i];
                }
                if(str.length>1 && str!=="Shop"){
                  UserName=reverse(str);
                }
                console.log(UserName , " -> UserName");
                window.location.replace(`/User/${UserName}`);
                funRouteToProfile()
                
              }}
              >
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
    window.location.replace(`/Query/${SearchQuery}`);
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