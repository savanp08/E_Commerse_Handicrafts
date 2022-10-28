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

const Login = () => {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [SecretKey, setSecretKey] = useState("");
   
    const [AuthStatus, setAuthStatus] = useState("NotValid");
    const [Message, SetMessage] = useState("");
    const [AccessToken, setAccessToken] = useState("");
    const CheckUserName = (e) => {
      setUserName(e.target.value);
      console.log(UserName);
    };
    const CheckPassword = (e) => {
      setPassword(e.target.value);
      console.log(UserName);
    };
    const CheckSecretKey = (e) => {
      setSecretKey(e.target.value);
      console.log(SecretKey);
    };
  
    const [UserType, setUserType] = useState("User");
    async function submitLogin(e) {
      console.log(UserName);
      console.log("Password is ",Password);
      var CheckMessage = "";
      await axios
        .post(
          `http://localhost:5000/Server/Auth/User/Login`,
          {
                UserName: UserName,
                Password: Password,
              }
        )
        .then((Response) => { 
          console.log(Response.data);
          if (
            typeof Response.data.resval === "string" ||
            Response.data.resval instanceof String
          )
            SetMessage(Response.data.resval);
          const accessToken = Response.data.token;
          if (accessToken) {
            console.log("token from login->");
            console.log(Response.data.token);
            try {
              console.log(UserName);
              localStorage.setItem(`User ${UserName}`, accessToken);
            } catch (error) {
              console.log("error->");
              console.log(error);
            }
            setAccessToken(localStorage.getItem(`User ${UserName}`));
          }
          if (Response.data.resval) SetMessage(Response.data.resval);
          CheckMessage = Response.data.resval;
  
          console.log(AccessToken);
        })
  
        .catch((error) => {
          console.log("error while Logging in");
          console.log(error);
        });
  
      const token = localStorage.getItem(`User ${UserName}`);
      console.log("fetched from local->");
      console.log(token);
      if (token && CheckMessage === "Matched")
        await axios
          .get("http://localhost:5000/Server/Auth/TokenValidate", {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((Response) => {
            if (Response.data.resval === "TokenVerified") {
              window.location.replace(`/Shop/${UserName}`);
            }
            console.log(Response.data);
          })
          .catch((error) => {
            console.log(error);
          });
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

  return (
    <div className="LoginPage-Wrapper">
   <div className="Login-Wrapper">
       <div className='Login-Container'>
           <div className='User-Pass-Container'>
           <TextField id="outlined-basic" 
           label="UserName" 
           variant="outlined" 
           onChange={(e) => {
            CheckUserName(e);
          }}
          inputProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 },
          }}
          InputLabelProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5
            , color:'white'
            },
          }}
          sx={{boxShadow: 4 }}
           />
           
           <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          inputProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 },
          }}
          InputLabelProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 
              , color:'white'
            },
          }}
          onChange={(e) => {
            CheckPassword(e);
          }}
          sx={{  boxShadow: 4,  }}
          
        />
           </div>
           <div className="LoginSubmit-Div">
   <Button variant="contained"
   className="LoginSubmit"
   onClick={(e) => {
    
    if(UserName.length<1 || UserName.length>20)  document.getElementById("Login-HelperText-Overall").innerHTML="Length Of UserName should be >1 and <21";
    else if(Password.length<1 || Password.length>20)  document.getElementById("Login-HelperText-Overall").innerHTML="Length Of Password should be >1 and <28";
    else
    submitLogin(e);
  }}
   >Login</Button>
   <span className="CreateAccount-Button"
onClick = {()=>{
  window.location.replace("/SignUp");
}}
sx={{
 marginTop:'4vh'
}}
>Create New Account
</span>
</div>
<p id="Login-HelperText-Overall"></p>



       </div>
   </div>
  
</div>
  );
}

export default Login;
