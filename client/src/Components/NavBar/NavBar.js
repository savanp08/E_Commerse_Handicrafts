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
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../Store/Slices/FilterSlice/FilterSlice";
import { addCart, removeCart } from "../../Store/Slices/CartSlice/CartSlice";
import { removeUser } from "../../Store/Slices/UserSlice/UserSlice";
import { removeAdmin } from "../../Store/Slices/UserSlice/adminSlice";



var menuStatus = false;
function closeMenuFun(){

}
 
const NavBar = () => {

  const [SearchQuery, setSearchQuery] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const history = useNavigate();
  const user = useSelector(state => state.user);
  const admin = useSelector(state=>state.admin);
  const cart = useSelector(state=>state.cart);
  const [cartMap, setCartMap] = useState(new Map());
  const [Error_search, setError_search] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function searchFun(){
   if(SearchQuery && SearchQuery.length===0){
      setError_search(true);
      return;
   }
   dispatch(addSearch(SearchQuery));
   navigate('/Search/Query/'+SearchQuery);
  }

  console.log(" rerender debug => navbar => ");
  
  const params = useParams();

  const [TempStatus, setTempStatus] =useState(false);

  function funRouteToProfile (){
    
                
  }
  function reverse(s){
    return s.split("").reverse().join("");
}

useEffect(()=>{
  if(cart){
    var x = new Map();
    if(Array.isArray(cart)){
      cart.forEach((ele)=>{
        if(x.has(ele._id))
        x.set(ele._id,{...x.get(ele._id),Quantity:x.get(ele._id).Quantity+ele.Quantity});
        else
        x.set(ele._id,ele);
      })
      setCartMap(new Map(x));
      setItemCount(cart.length);
    }
  }
},[cart])

useEffect(()=>{
   if(user && user._id){
          dispatch(addCart(user.cart));
   }
},[user])
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
        type="search"
        placeholder="Search .."
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e)=>{
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e)=>{
          if(e.key==="RETURN" || e.key==="Enter"){
            searchFun();
          }
        }}
        error={Error_search? true : false}
      />
        </div>
    <div className={"NavBar-LoginOptions" + (user._id || admin._id? " Hide" : "")}>
    <NavLink to="/Login" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
        Login
        </NavLink>
    </div>
    <div className={"NavBar-AccountOptions" + (user._id || admin._id? "" : " Hide")}>
  <AccountOptions />
    </div>
    <div className="NavBar-CartIcon"
    onClick={()=>{
      navigate('/Cart');
    }}
    >
    <Badge color="secondary" badgeContent={itemCount}
  
    >
          <ShoppingCartIcon  className="cnm1220-cartIcon"
            sx={{
              width:35,
              height:35,
              cursor:'pointer'
            }}
          />
        </Badge>
        </div>
        <div className={"NavBar-LoginOptions" + (user._id || admin._id? "" : " Hide")}
        id="navBar45-main-logout"
        onClick={(e)=>{
          dispatch(removeUser());
          dispatch(removeAdmin());
          dispatch(removeCart());
          localStorage.removeItem('token');
          localStorage.removeItem('admin');
          navigate('/Login');
        }}
        >
    <NavLink to="/Login" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
        Logout
        </NavLink>
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
}const navigate = useNavigate()

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
               navigate('/Account');
                
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
              
            </div>
    </div>
  )
}

const RespNavBar = () =>{
  
  const [SearchQuery, setSearchQuery] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const history = useNavigate();
  const user = useSelector(state => state.user);
  const admin = useSelector(state=>state.admin);
  const cart = useSelector(state=>state.cart);
  const [cartMap, setCartMap] = useState(new Map());
  const [Error_search, setError_search] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function searchFun(){
   if(SearchQuery && SearchQuery.length===0){
      setError_search(true);
      return;
   }
   dispatch(addSearch(SearchQuery));
   navigate('/Search/Query/'+SearchQuery);
  }

  console.log(" rerender debug => navbar => ");
  
  const params = useParams();

  const [TempStatus, setTempStatus] =useState(false);

  function funRouteToProfile (){
    
                
  }
  function reverse(s){
    return s.split("").reverse().join("");
}

useEffect(()=>{
  if(cart){
    var x = new Map();
    if(Array.isArray(cart)){
      cart.forEach((ele)=>{
        if(x.has(ele._id))
        x.set(ele._id,{...x.get(ele._id),Quantity:x.get(ele._id).Quantity+ele.Quantity});
        else
        x.set(ele._id,ele);
      })
      setCartMap(new Map(x));
      setItemCount(cart.length);
    }
  }
},[cart])

useEffect(()=>{
   if(user && user._id){
          dispatch(addCart(user.cart));
   }
},[user])

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
      onKeyDown={(e)=>{
        if(e.key==="RETURN" || e.key==="Enter"){
          searchFun();
        }
      }}
      error={Error_search? true : false}
      />
            </div>
            <div className="NavBarResp-LoginOptions">
            <NavLink to="/Login" className={"NavBar-LinkEle" + (user._id || admin._id? " Hide" : " AHSAUSHBSHHSHSHS")} >
        Login
        </NavLink>
   
            </div>
            <div className="NavBarResp-Account">
           <AccountOptions />
           <div className="NavBar-CartIcon"
    onClick={()=>{
      navigate('/Cart');
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
        </div>
    )
}

export default NavBar;
export { RespNavBar } ;