import React ,{useState,useEffect} from "react";
import './Login.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { Route } from "react-router";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import mongoose from "mongoose";
import { IoMdDisc } from "react-icons/io";
import { FormControlUnstyledContext } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../Store/Slices/UserSlice/adminSlice";


import AccountCircle from '@mui/icons-material/AccountCircle';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


import Input from '@mui/material/Input';
const AdminLogin = () => {
     
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [SecretKey, setSecretKey] = useState("");
    const navigate = useNavigate();
    const [AuthStatus, setAuthStatus] = useState("NotValid");
    const [Message, SetMessage] = useState("");
    const [AccessToken, setAccessToken] = useState("");
    const dispatch =useDispatch();
    const Checkemail = (e) => {
      setEmail(e.target.value);
      console.log(email);
    };
    const CheckPassword = (e) => {
      setPassword(e.target.value);
      console.log(email);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const CheckSecretKey = (e) => {
      setSecretKey(e.target.value);
      console.log(SecretKey);
    };
  
    const [UserType, setUserType] = useState("User");

    async function LoginFun(e) {
        e.preventDefault();
        axios.post('/Auth/Login/adminX86109110213',{
             email: email,
             password: password
        }).then(res=>{
         console.log("Loged in",res);
         const AccessToken  = res.data.AccessToken;
         
         if(AccessToken && (typeof AccessToken === "string" || AccessToken instanceof String)){
           dispatch(addAdmin(res.data.user));
           localStorage.setItem(`admin`, AccessToken);
           const route = "/Admin/Account";
           //if(routerState[routerState.length-1]) dispatch(removeRoute(routerState[routerState.length-1]));
           navigate(route);
         }
        }).catch(err=>{
         console.log("Failed to login",err);
         var x = document.getElementById("login-helperText");
         x.innerHTML = err.response.data.message || err.response.data || "Incorrect Crendentials";
        })
       }
       function validateEmail(email) {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return emailRegex.test(email);
       }
    console.log("state after token validation ");
    console.log(AccessToken);
  



  const createQuickRoom = async() =>{
   var tempUserId = new mongoose.Types.ObjectId().toString();
   tempUserId = tempUserId.toString();
   var roomId = document.getElementById("QuickRoom-Login");
   if(roomId) roomId = roomId.value;
   var tempName = document.getElementById("QuickRoom--UsersName-Login");
   if(tempName) tempName= tempName.value;
   if(roomId.length<1 || tempName.length<1){
   var xx= document.getElementById("Login-HelperText-QuickRoom");
   xx.innerHTML ="Name and RoomId should be atLeast 1 length long";
   }
   else
    window.location.replace(`QuickRoom/QuickUser/${roomId}/${tempUserId}/${tempName}`);
  }

  function validatePassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    if(!passwordRegex.test(password)){
      var x= document.getElementById("pl0090-password-helperText");
      x.innerHTML = "Password must contain atleast 1 uppercase, 1 lowercase, 1 number, and must be atleast 6 characters long";
    }
    else{
      var x= document.getElementById("pl0090-password-helperText");
      x.innerHTML = "";
    }
    return passwordRegex.test(password);
  }

  return (
    <div className="login-wrap">
   
  <div className="login-container">
    <div className="login-titleWrap">
  <span className="login-title">
            Welcome to Troo
        </span>
        </div>
    <div className="login-box">
        
      <div className="login-innerBox">
        <div className="login-credWrap">
      <div className="login-field">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 ,width:'38px' , height:'38px' , marginLeft:'-48px' }} /> */}
          <TextField
            id="user-login-email"
            label="Email"
            variant="standard"
            sx={{
                width:'310px',
                marginTop:'10px',
                height:'60px',
            }}
            autoFocus
            error={email && !validateEmail(email)}
            helperText={email && !validateEmail(email) ? "Enter a valid email" : ""}
            inputProps={{
                fontSize:'30px',
            }}
            InputProps={{
                style: {
                    color: "rgb(133, 140, 141)",
                    fontSize:'17px',
                }
            }}
            value={email}
            onChange ={(e)=>{
              setEmail(e.target.value);
            }}
            />
        </Box>
      </div>
      <div className="login-field">
      <FormControl sx={{  width: '310px',height:'60px', }} 
      variant="standard"
      
      >
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="user-login-password"
        type={showPassword ? 'text' : 'password'}
        sx={{
            style: {
                fontSize:'20px',
                color:'red'
            }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={password}
            onChange ={(e)=>{
              setPassword(e.target.value);
            }}
            error={password && !validatePassword(password)}
      />
    </FormControl>
    <span className="login-helperText" id="pl0090-password-helperText">

    </span>
      </div>
      <div className="login-otherOptionsWrap">
        
      </div>
      </div>
      <div className="login-helperText" id= "login-helperText">
        {}
      </div>
      <Button 
      variant="contained"
      id="user-login-button"
      sx={{
        width:'250px',
        height:'40px',
        borderRadius:'40px',
        backgroundColor:'red',
        display:'flex',
        flexFlow:'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        ":hover" : {
            backgroundColor:'rgb(142, 176, 179)',

        }
      }}
      onClick={(e)=> LoginFun(e) }
      >
        Sign in
        </Button>
    </div>
    </div>
    <div className="login-signUpWrap">
      <span className="login-signUpText">
        
        <NavLink to="/SignUp" className="login-signUpButton"
        id="user-login-signup-button"
        >
          
        </NavLink>
      </span>
    </div>
  </div>

</div>
  );
}

export default AdminLogin;
