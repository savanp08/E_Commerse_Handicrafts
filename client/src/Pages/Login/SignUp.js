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

const SignUp = () => {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [FullName, setFullName] = useState("");
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

    async function submitLogin(e) {
      console.log(UserName);
      console.log("Password is ",Password);
      var CheckMessage="";
      await  axios.post(`http://localhost:5000/Server/Auth/User/SignUp`,  {
        UserName:UserName,
        Password:Password,
        FullName:FullName
    }).then(Response=>{
        console.log(Response.data);   
        if (typeof Response.data === 'string' || Response.data instanceof String)
        SetMessage(Response.data);
        console.log("response is " ,Message);
        const accessToken=Response.data.AccessToken;
        if(accessToken){
        localStorage.setItem(`User ${UserName}`, accessToken);
        
    }
        if(Response.data.resval)
        SetMessage(Response.data.resval);
   const AccessToken = localStorage.getItem(`USer ${UserName}`);
   console.log(AccessToken);
    })

  
     .catch(error=>{
           console.log("error while Signing Up");
               console.log(error);
     })
    

const token = localStorage.getItem(`User ${UserName}`);
console.log("fetched from local->")
   console.log(token);
    
 await axios.get('http://localhost:5000/Server/Auth/TokenValidate', {headers:{"authorization" : `Bearer ${token}`  }}).then(Response=>{
        
      if(Response.data.resval === "TokenVerified")
      { 
        localStorage.setItem('UserName', JSON.stringify(UserName));
        window.location.replace(`/Shop/${UserName}`);
        
       
      }
    console.log(Response.data); 
    
 }).catch(error=>{
    console.log(error);
 })

  }
  












  return (
    <div className="LoginPage-OverAll">
    <div className="LoginPage-Wrapper">
   <div className="Login-Wrapper">
       <div className='Login-Container'>
           <div className='User-Pass-Container SignUpContainer'>
           <TextField id="outlined-basic" 
           label="UserName" 
           variant="outlined" 
           onChange={(e) => {
            CheckUserName(e);
          }}
          inputProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 
              , color:'white'
            },
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
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 
            
              , color:'white'
            },
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
         <TextField
          id="outlined-password-input"
          label="Full Name"
          
          inputProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 
              , color:'white'
            },
          }}
          InputLabelProps={{
            style: { fontSize: 18, wordSpacing: 17, lineHeight: 1.5 
              , color:'white'
            },
          }}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          sx={{  boxShadow: 4,  }}
          
        />

        
         
           </div>
              
       </div>
       
   </div>
   <div className="LoginSubmit-Div">
   <Button variant="contained"
   className="LoginSubmit"
   onClick={(e) => {
    submitLogin(e);
  }}
  sx={{
    marginTop:'40px'
  }}
   >SignUp</Button>
</div>
</div>
</div>
  );
}

export default SignUp;
