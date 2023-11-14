import express from 'express';
import {userSchema} from '../Schemas/userSchema.js';
import jwt from "jsonwebtoken"; 
import mongoose from 'mongoose';
import { userExists, SignUp } from '../Helpers/User.js';
import adminSchema from '../Schemas/adminSchema.js';
import { sendOrderConfirmationMail, sendPasswordResetMail } from '../Helpers/Mailer.js';

const UserRouter = express.Router(); 
// JWT token implementation without libraries ->
//https://www.telerik.com/blogs/json-web-token-jwt-implementation-using-nodejs

UserRouter.post('/SignUp', async (req,response)=>{
  console.log("SignUp Called -> ",req.body);

  //validate using joi

  try{ 
   const existsResponse = await userExists(req.body.user);
   const exists = existsResponse.message;

   if(exists==="true"){
    console.log("Account Already Exists",exists);
    return response.status(400).send("Account Already Exists");
   }
   if(exists==="error"){
    console.log("Error in userExists");
    return response.status(400).send("Error in userExists");
   }
   else if(exists === "false"){
    console.log("Reponse from userExists",exists);
    const x = await SignUp(req);
    if(x.message==="success"){
      console.log("Account Created Successfully");

      try{
            sendSignUpConfirmationMail(x.user);
      }
      catch(err){
        console.log("APIs/Auth/Auth.js 1 => Error in sending signup confirmation mail",err);     //    1
      }



      return response.status(200).send({
        message : "Account Created Successfully",
        user: x.user,
        token : fetchToken(req.body.user.email.toLowerCase())
      });

      
     }
     else{
      console.log("Error in SignUp");
      return response.status(400).send("Error in SignUp");
     }
   }
  
   
   
}
catch(err){
  console.log("Error in Try while creating new User Account",err);
  response.status(400).send("Account Already Exists");
}
})




UserRouter.get("/TokenValidate", async (req, response) => {
  try{
    console.log("TokenValidate Called->");
 // console.log(req.headers);
    const HeaderToken = req.headers["authorization"];
    const Token = HeaderToken && HeaderToken.split(" ")[1];
    console.log("This is Acquired Token->");
    //console.log(Token);
    var x = null;
    try{
      x =  jwt.verify(Token, process.env.RefreshToken);
    }
    catch(err){

    }
     
     if(x){
        console.log("Token Validated",x);
        var xy = x.email || x.email;
        xy = xy.toLowerCase();
        console.log("xy",xy);
        const y = await userExists({email :  xy});
        if(y.user) {
      //    console.log("userExists reponse=>>> ",y);
        return response.status(200).send(
          {
            message : "Token Validated",
             user : y.user 
        }
          );
      }
      else{
        return response.status(403).send("Token Not Validated");
      }
     }
     else{
      console.log("Token Not Validated",x);
      return response.status(403).send("Token Not Validated");
     }
    }
    catch(err){
      console.log("Error in Try while validating Token",err);
      return response.status(403).send({
        message: null,
        user:null
      });
    }
  });
  UserRouter.get("/TokenValidate/Admin", async (req, response) => {
    try{
      console.log("Admin TokenValidate Called->");
    console.log(req.headers);
      const HeaderToken = req.headers["authorization"];
      const Token = HeaderToken && HeaderToken.split(" ")[1];
      console.log("This is Acquired Token->");
      console.log(Token);
      var x = null;
      try{
        x =  jwt.verify(Token, process.env.RefreshToken);
      }
      catch(err){
  
      }
       
       if(x){
          console.log("Token Validated",);
          var xy = x.email || x.email;
          xy = xy.toLowerCase();
          console.log("xy",xy);
          const y = await adminSchema.findOne({email :  xy});
          if(y) {
            console.log("adminExists reponse=>>> ",y);
          return response.status(200).send(
            {
              message : "Token Validated",
               user : y
          }
            );
        }
        else{
          console.log("Admin not found Token Not Validated",y);
          return response.status(403).send("Token Not Validated");
        }
       }
       else{
        console.log("Token Not Validated",x);
        return response.status(403).send("Token Not Validated");
       }
      }
      catch(err){
        console.log("Error in Try while validating Token",err);
        return response.status(403).send({
          message: null,
          user:null
        });
      }
    });

  
function fetchToken(email) {
    return jwt.sign({ email }, process.env.RefreshToken, { expiresIn: "6h" });
  }

  UserRouter.get("/:UserType/RefreshToken", async (req, res) => {
    const UserType = req.params.UserType;
    const email = req.body.email.toLowerCase();

    const AccessToken = fetchToken({ email });
    res.status(202).json({ AccessToken: AccessToken });
  });


  UserRouter.post('/Login/:userType' , async (req, response) => {
    const type  = req.params.userType;
    if(type === "adminX86109110213") {
        var password ="";
        var exists =false,verified;
          try{
            console.log("Login tried for admin",req.body);
            await adminSchema.findOne({ email: req.body.email.toLowerCase() },{ password:1  })
            .then(res=>{
                console.log("Admin Log in response => ",res);
                if(res){
                exists = true;
                password = res.password;
                
                }
            }).catch(err=>{
                console.log("Error in Admin Login ",err);

            });
            console.log("admin found",exists);
            
            if(exists){
                if(password === req.body.password){
                    console.log("User Successfully logged in")
                    const AccessToken = fetchToken(req.body.email.toLowerCase());
                    const adminResponse = await adminSchema.findOne({ email: req.body.email.toLowerCase() });
                    if(adminResponse)
                    return response.status(200).send({message : "Logined in", AccessToken : AccessToken,admin : adminResponse });
                  else return response.status(500).send("Error in fetching admin");
            }
            else{
                console.log("Password Wrong");
                response.status(500).send("Incorrect Password");
            }
            }
          }catch(err){
            console.log("Error while logging in for admin",err);
          }
    }
    else{
    console.log("Login tried for user",req.body);
    try{
      
    const x = await userExists(req.body);
    
    if(x.message==="true" && x.user){
     
      const password = x.user.password;
        if(password === req.body.password){
            console.log("User Successfully logged in")
            const AccessToken = fetchToken(req.body.email.toLowerCase());
            return response.status(200).send({message : "Logined in", AccessToken : AccessToken
            ,user : x.user
          
          });

    }
    else{
        console.log("Password Wrong");
        return response.status(500).send("Incorrect Credentials");
    }
    }
    else{
        console.log("User Does Not Exists");
        return response.status(500).send("Account Does Not Exists");
    }
}
    catch(err){
        console.log("Error in try while login",err);
    }
}
 })
UserRouter.get("/CheckUser/:email", async (req, response) => {
 
  const email = req.params.email;
  console.log("Checking for user->",email);
  const count  =await userSchema.find({email : email})
 .then(res=>{
  if(res.length>0){
  console.log("While adding User , Check Success : email found->",email,res);
  response.status(200).send("Found");
  }
  else{
    console.log("While adding User , Check Failed No email found->",email,res);
    response.status(400).send("NotFound");
  }
 }).catch(err=>{
    console.log("While adding User , Check Failed , email found->",email,err);
    response.status(400).send("NotFound");
  })

})

UserRouter.get("/UserData/:email" , async(req,response)=>{
  const email = req.params.email;
 await  userSchema.findOne({email: email})
  .then(res=>{
    console.log("USerData of User", email, " found");
    response.status(200).json(res);
  })
  .catch(err=>{
    console.log("USerData not found error occurred",err);
    response.status(400).send("Error: " + err.message);  
  })
})

UserRouter.post("/updateOne", async(req,response)=>{
  const email = req.body.email;
  var x= {...req.body};
  delete x.email
  delete x._id;
  delete x.userId;
  
  console.log("Recived Request to update order history for user: ", req.body);
    await userSchema.updateOne({_id : req.body._id}, {$set: { 
      ...x
    }})
    .then(res=>{
      console.log("Result from User Data update",res);
      response.status(200).send(res);
    })
    .catch(err=>{
      console.log("Error while updating User Data",err); 
    })
})



UserRouter.post("/updateCart", async(req,response)=>{
  const email = req.body.email;
  var x= {...req.body
  ,cart: req.body.cart
  };
  delete x.email
  delete x._id;
  delete x.userId;
  
  console.log("Recived Request to update order history for user: ", req.body);
    await userSchema.updateOne({_id : req.body._id}, {$set: { 
      
    }})
    .then(res=>{
      console.log("Result from User Data update",res);
      response.status(200).send(res);
    })
    .catch(err=>{
      console.log("Error while updating User Data",err); 
    })
})



UserRouter.post("/ResetPassword", async (req, response) => {
  try{
    console.log("ForgotPassword Called->");
  console.log(req.body);
  const user = await userSchema.findOne({ email: req.body.email.toLowerCase() });
  if(user){
    console.log("User Found");
    const updatePassword = await userSchema.updateOne({email : req.body.email.toLowerCase()},{
      $set
      : { 
        password : req.body.newPassword
      }
    });
    if(updatePassword.error){
      console.log("Error in updating password",updatePassword.error);
      return response.status(500).send("Error in updating password");
    }
    else{
      console.log("Password Updated Successfully",updatePassword);
      return response.status(200).send("Password Updated Successfully");
    }
  }
  else{
    console.log("User Not Found");
    return response.status(403).send("User Not Found");
  }
  }
  catch(err){
    console.log("Error in Try while validating Token",err);
    return response.status(403).send({
      message: null,
      user:null
    });
  }
});


UserRouter.post("/ForgotPassword", async (req, response) => {
  try{
    console.log("ForgotPassword Called->");
  console.log(req.body);
  const user = await userSchema.findOne({ email: req.body.email.toLowerCase() });
  if(user && user._id){
    console.log("User Found",user);
    sendPasswordResetMail({
      email : user.email,
     user : "user"
    });
    return response.status(200).send("User Found");
  }
  else{
    console.log("User Not Found");
    return response.status(403).send("email Not Found");
  }
  }
  catch(err){
    console.log("Error try again later",err);
    return response.status(403).send({
      message: null,
      user:null
    });
  }
});


UserRouter.post("/OrderConfirmation", async (req, response) => {
  try{
    console.log("OrderConfirmation Called->");
  console.log(req.body);
  const user = await userSchema.findOne({ email: req.body.user.email.toLowerCase() });
  if(user && user._id){
    console.log("User Found");
    sendOrderConfirmationMail({
      user : req.body.user,
      order: req.body.order
    })
    return response.status(200).send("User Found");
  }
  else{
    console.log("User Not Found");
    return response.status(403).send("email Not Found");
  }
  }
  catch(err){
    console.log("Error try again later",err);
    return response.status(403).send({
      message: null,
      user:null
    });
  }
});

export default UserRouter;

