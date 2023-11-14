import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';


import './Login.css';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addUser } from "../../Store/Slices/UserSlice/UserSlice";


const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const taskState = useSelector(state => state.task);
    const routerState = useSelector(state => state.router);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    async function LoginFun(e){
      e.preventDefault();
    await axios.post('/Auth/Login/user',{
          email: email,
          password: password
     }).then(res=>{
      console.log("Loged in",res);
      const AccessToken  = res.data.AccessToken;
      
      if(AccessToken && (typeof AccessToken === "string" || AccessToken instanceof String)){
        dispatch(addUser(res.data.user));
        localStorage.setItem(`token`, AccessToken);
        const route = "/";
        //if(routerState[routerState.length-1]) dispatch(removeRoute(routerState[routerState.length-1]));
        navigator(route);
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

  function handleForgotPassword(e){
    e.preventDefault();
    axios.post('/Auth/ForgotPassword',{
      email: email
    }).then(res=>{
      console.log("Forgot Password",res);
      
    }).catch(err=>{
      console.log("Failed to send reset link",err);
      
    })
  }

  return (
    <div className="login-wrap">
        <div className="login-sideStyleWrap">
            <img className="login-sideStyleImg"
            src="https://i.pinimg.com/originals/72/c5/e8/72c5e850e209ee68d4a7df97ddb59302.jpg" />
            <span className="login-sideText">
                Order your favourites from your favourite
            </span>
        </div>
      <div className="login-container">
        <div className="login-titleWrap">
      <span className="login-title">
                Welcome to Lost&Found
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
          />
        </FormControl>
        <div className="login-passTextWrap">
            <span className="login-passText"
            onClick={(e)=>{
              email && validateEmail(email)? handleForgotPassword(e) : document.getElementById("login-helperText").innerHTML = "Enter your email to get password reset link";
            }}
            >
                    Forgot Password
            </span>
        </div>
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
            backgroundColor:'rgb(142, 176, 179)',
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
            {"Don't Have an Account? Sign in "}
            <NavLink to="/SignUp" className="login-signUpButton"
            id="user-login-signup-button"
            >
               {"Here"}
            </NavLink>
          </span>
        </div>
      </div>

    </div>
  );

}

export default Login;