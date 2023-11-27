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
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/Slices/UserSlice/UserSlice";
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [FullName, setFullName] = useState("");
    const [SecretKey, setSecretKey] = useState("");
    const [AuthStatus, setAuthStatus] = useState("NotValid");
    const [Message, SetMessage] = useState("");
    const [AccessToken, setAccessToken] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Checkemail = (e) => {
      setEmail(e.target.value);
      console.log(email);
    };
    const CheckPassword = (e) => {
      setPassword(e.target.value);
      console.log(email);
    };
    const CheckSecretKey = (e) => {
      setSecretKey(e.target.value);
      console.log(SecretKey);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    async function submitLogin(e) {
      console.log(email);
      console.log("Password is ",password);
      var CheckMessage="";
      var resp=null;
      var sts=403;
      await  axios.post(`http://localhost:5000/Server/Auth/SignUp`,  {

        user :{
        email:email,
        password:password,
        FullName:FullName 
    }}).then(Response=>{
      
        console.log(Response.data);   
         resp={...Response.data};
         sts=Response.status;
         Response.data = Response.data.message;
        if (typeof Response.data === 'string' || Response.data instanceof String)
        SetMessage(Response.data);
        console.log("response is " ,Message);
        const accessToken=Response.data.AccessToken;
        if(accessToken){
        localStorage.setItem(`token`, accessToken);
    }
        if(Response.data.resval)
        SetMessage(Response.data.resval);
   const AccessToken = localStorage.getItem(`token`);
   console.log(AccessToken);
    })

  
     .catch(error=>{
           console.log("error while Signing Up");
           SetMessage(error.response.data,error.response)
               console.log(error);
     })
    
      if(resp && resp.user){
        dispatch(addUser(resp.user));
        console.log("user is ",resp.user);

      }
      
      if(sts===200) navigate('/');




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
        <div className="login-box"
        style={{
          'height':'auto',
        }}
        >
            
          <div className="login-innerBox"
          style={{
            'height':'auto',
          }}
          >
            <div className="login-credWrap"
            style={{
              "height":"auto"
            }}
            >
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
            error={password && !validatePassword(password)}
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
          <span className="login-helperText" id="pl0090-password-helperText">

          </span>
        </FormControl>
       
          </div>
          <div className="login-field">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 ,width:'38px' , height:'38px' , marginLeft:'-48px' }} /> */}
              <TextField
                id="user-login-fullName"
                label="Full Name"
                variant="standard"
                sx={{
                    width:'310px',
                    marginTop:'10px',
                    height:'60px',
                }}
                
                error={false}
                helperText={""}
                inputProps={{
                    fontSize:'30px',
                }}
                InputProps={{
                    style: {
                        color: "rgb(133, 140, 141)",
                        fontSize:'17px',
                    }
                }}
                value={FullName}
                onChange ={(e)=>{
                  setFullName(e.target.value);
                }}
                />
            </Box>
          </div>
          <div className="login-otherOptionsWrap">
            
          </div>
          </div>
          <div className="login-helperText" id= "login-helperText">
            {Message}
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
          onClick={(e)=> {
            submitLogin();
          } }
          disabled={!(email && password && FullName && validateEmail(email) && validatePassword(password))}
          >
            Sign Up
            </Button>
        </div>
        </div>
        <div className="login-signUpWrap">
          <span className="login-signUpText">
            {"Have an Account? Sign in "}
            <NavLink to="/Login" className="login-signUpButton"
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

export default SignUp;
