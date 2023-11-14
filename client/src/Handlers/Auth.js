import axios from 'axios';



const AuthFunctions = async () => {
       
        const token = localStorage.getItem("token");
        const res = {
            message : false,
            user : null,
        }
        if(!token){
          console.log("Auth Debug => No token found");
          return res;
        }
        else{
            console.log("Auth Debug => Token Found now verifying...");
         return await verifyToken();
        }
        async function verifyToken(){
          try{
           const Response =  await axios.get('/Auth/TokenValidate', {headers:{"authorization" : `Bearer ${token}`  }})
           
            if(Response.data.message === "Token Validated")
            { 
                
                console.log("Auth Debug => Token Verified", Response);
                 return {
                    message : "success",
                    user : Response.data.user,
                 };
            }
            else{
             console.log("Auth Debug => Token Not Verified", Response.data);
              return res;
            }
          }
          catch(err){
            console.log("Auth Debug => In verify token try catch token verification throwed error", err);
            return res;
          }
            console.log("Auth Debug => Token Verification Failed", Response.data);
          
       
        }
        
    }
    const AdminAuthFunctions = async () => {
       
      const token = localStorage.getItem("admin");
      console.log("Auth Debug => Admin Token Found", token)
      const res = {
          message : false,
          user : null,
      }
      if(!token){
        console.log("Auth Debug => No token found");
        return res;
      }
      else{
          console.log("Auth Debug => Token Found now verifying...");
       return await verifyToken();
      }
      async function verifyToken(){
        try{
         const Response =  await axios.get('/Auth/TokenValidate/Admin', {headers:{"authorization" : `Bearer ${token}`  }})
         
          if(Response.data.message === "Token Validated")
          { 
              
              console.log("Auth Debug => Token Verified", Response);
               return {
                  message : "success",
                  user : Response.data.user,
               };
          }
          else{
           console.log("Auth Debug => Token Not Verified", Response.data);
            return res;
          }
        }
        catch(err){
          console.log("Auth Debug => In verify token try catch token verification throwed error", err);
          return res;
        }
          console.log("Auth Debug => Token Verification Failed", Response.data);
        
     
      }
      
  }

  export default AuthFunctions;

  export {
    AdminAuthFunctions
  };

 