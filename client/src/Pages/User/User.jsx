import React, { useState ,Component,useEffect} from "react";
import "./User.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tabs from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate, useParams } from "react-router";

import mongoose from "mongoose";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AuthFunctions from "../../Handlers/Auth";
import { addUser } from "../../Store/Slices/UserSlice/UserSlice";
import RestCompWithFilter from "../../Components/RestCompWithFilter/RestCompWithFilter";


const User =  () => {
  
    const topBG="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5PC1feIrzpT2KQ8jA8UBOLTZR9CnKH5D1GQ&usqp=CAU";
   
  

  const [value, setValue] = React.useState("1");
  const [ LoadData ,setLoadData] = useState(0);
  const[ xArray ,setxArray]=useState([0,1,2]);
  const handleChange = (event, newValue) => {
    setValue(newValue);   setLoadData(newValue);
     xArray[0]=newValue;
  };
  const [StoryStatus,setStoryStatus]=useState("");
    const [ProductData , setProductData] =useState([]);
    const [UserData , setUserData] =useState({
      OrderHistory:[]
    });
    const [UserStatus, setUserStatus] = useState('Not Auth');
    
    const user  = useSelector(state=>state.user);
    const [SoldProducts,setSoldProducts] =useState([]);
    const [AddProductsForm,setAddProductForm] = useState(false);
    const [HelperText,setHelperText] = useState("");
    const [totalsMap,setTotalsMap] = useState(new Map());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [NewProduct, setNewProduct] = useState({
        FullName:"",
        Description:[],
        Specification:[],
        TimeStamp:"",
        Price:0,
        Quantity:0,
        Offers:[],
        Media:[],
        Rating:0,
        productId:"",
        SellerId:  user.email || ""
        
    });
    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
    
      return `${month}/${day}/${year}`;
    }
    
 useEffect(()=>{
  async function verifyUser(){
    const res = await AuthFunctions();
    if(res.message === "success" && res.user && res.user.userId){
      dispatch(addUser(res.user));
    }
    else {
      navigate('/Login');
    }
  }
   if(!user._id){
      verifyUser();
   }
 },[])
  useEffect(()=>{
    try{
       if(user && user._id){
        if(Array.isArray(user.OrderHistory)){
          var x = new Map();

        }
       }
    }catch(err){
      console.log("error in useEffect ",err);
    }
  },[user]);
  if(!user || !user._id) return null
  return (
    <div className="Admin-Wrapper">
      <div className="Top-Pane">
        <img src="" alt="" />
      </div>
      <div className="Raised-Pane">
        <div className="Admin-Header">
          <div className="Avatar-Holder">
            <img className="Avatar Hidden" src="" alt="" />
          </div>
          <div className="User-Name-Holder">
            <span className="User-Name">{user.FullName}</span>
            <span className="Basic-Info-Text">Profile</span>
          </div>
        </div>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            marginTop: "10vh",
            display: "flex",
            flexFlow: "column nowrap",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="Admin-Tab-Switch"
                centered
              >
                <Tab label="Purchase History" value="1" sx={{fontSize:'16px',fontWeight:'320'}} />
                
                
              </TabList>
            </Box>
            <TabPanel value="1"  sx={{display:'flex', flexFlow:'row wrap', alignItems:'center',justifyContent:'center' }}>
              <div className="pu19-order-list-wrap">
                {
                         user.OrderHistory.map((item,index)=>{
                          console.log(item,item.data);
                          return(
                            <div className="pu19-order-list-item-each">
                              <div className='pu19-order-list-item-each-header'>
                                <span className="pu19-order-list-item-each-header-id">Order Total {item.total}</span>
                                <span className="pu19-order-list-item-each-header-id">{formatDate(item.date)}</span>
                              </div>
                            <RestCompWithFilter key={index} restaurant={item.orderDetails.data} />
                            </div>
                          )
                          return null
                         })
                  
                }
              </div>
            
            </TabPanel>
         
          </TabContext>
        </Box>
      </div>
    </div>
  );

};

export default User;