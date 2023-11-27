import React, { useState ,Component,useEffect} from "react";
import "./Admin.css";
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
import { product_initialState, restaurant_initialState } from "../../Data/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { AdminAuthFunctions } from "../../Handlers/Auth";
import { addAdmin } from "../../Store/Slices/UserSlice/adminSlice";
import RestaurantComponent from "../../Components/RestaurantComponent/RestaurantComponent";
import RestauCardForProduct from "../../Components/ProductComponent/restCompForProduct";
import ProductCompoennt from "../../Components/ProductComponent/ProductComponent";


const Admin =  () => {
  
    const topBG="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5PC1feIrzpT2KQ8jA8UBOLTZR9CnKH5D1GQ&usqp=CAU";
   
  

  const [value, setValue] = React.useState("1");
  const [ LoadData ,setLoadData] = useState(0);
  const[ xArray ,setxArray]=useState([0,1,2]);
  const handleChange = (event, newValue) => {
    setValue(newValue);   setLoadData(newValue);
     xArray[0]=newValue;
  };
  
    const [ProductData , setProductData] =useState([]);
    const [UserData , setUserData] =useState({
      OrderHistory:[]
    });
    const [UserStatus, setUserStatus] = useState('Not Auth');
    
    const admin = useSelector(state=>state.admin);
    const [restaurants , setRestaurants] = useState([]);
    const [restaurantsMap, setRestaurantsMap] = useState(new Map());
    const [newRestaurant, setNewRestaurant] = useState(restaurant_initialState);
    const [productsMap, setProductsMap] = useState(new Map());
    
    const [SoldProducts,setSoldProducts] =useState([]);
    const [AddProductsForm,setAddProductForm] = useState(false);
    const [HelperText,setHelperText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [NewProduct, setNewProduct] = useState(product_initialState);


    useEffect(()=>{
      async function verify(){
      const adminRes = await AdminAuthFunctions();
      if(adminRes.message==="success" && adminRes.user && adminRes.user.adminId){
        dispatch(addAdmin(adminRes.user));
      }
      else{
         navigate('/Admin/Login');
      }
    }
    verify();
    },[])


    useEffect(()=>{
      async function fetchAllRestaurants(){
        await axios.get("/Restaurant/getAllRestaurants").then(res=>{
          console.log("Admin Fetch Restaurants Debug =>",res.data);
                
                var temp_map = new Map()
                if(Array.isArray(res.data)){
                  res.data.forEach(restaurant => {
                         temp_map.set(restaurant._id , restaurant);
                  })
                  console.log("Temp =>", temp_map)
                  setRestaurantsMap(new Map(temp_map));
                  setRestaurants(res.data);
                }
        }).catch(err=>{
          console.log("Admin Fetch Restaurants Debug => Error => ",err);
        }) 
      }
      fetchAllRestaurants();
      
    },[])

    const addProduct = async() =>{
        var TempData = NewProduct;
        console.log("Debugging FileUpload-> New Post->",TempData);
        if(TempData){
         
         var files = document.getElementById("Post-ImageAttach-Input");
         
         TempData.productId = new mongoose.Types.ObjectId().toString();
         
         console.log("Debugging FileUpload-> Files->",files.files);
         
         const formData  = new FormData();
         if(files && files.files && files.files.length>0){
          console.log("Debugging FileUpload-> Files Found->",files.files);
          const NewFiles=[];
          var x = files.files;
          console.log("Debug->",x,Array.isArray(x),Object.keys(x))
          Object.keys(x).forEach(index=>{
           formData.append("image",x[index],x[index].path);
          })
          console.log("Debugging FileUpload->  Type of ->",)
        //  formData.append("image",NewFiles);
          console.log("Debugging FileUpload-> New Files Array->",NewFiles);
        }
         formData.append("FullName",TempData.FullName);
         formData.append("Description",TempData.Description);
         formData.append("productId",TempData.productId);
         formData.append("Price",TempData.Price);
         formData.append("Quantity",TempData.Quantity);
         formData.append("Rating",TempData.Rating);
         formData.append("SellerId",TempData.SellerId);
         
         for (var pair of formData.entries()) {
          console.log("Debug-> FormData->",pair[0]+ ', ' + pair[1]); 
      }
      const Port ="http://localhost:5000";
         await axios.post(`/Products/add`,
         formData,
         {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
         )
         .then(res=>{
          console.log("Post Insertion Response->",res);
          const temp = ProductData;
          temp.push(TempData);
          setProductData(new Array(temp));
          setLoadData("5");
          setLoadData("2");
          setHelperText("Product Added To Shop");
         })
         .catch(err=>{
          console.log("Post Insertion Error->",err);
          setHelperText( "Image Format Not Supported Please Change and try again");
         })
           
      
      
        }
        
      }



 
  const NewProductForm = () =>{
    return(
        <>
        <div className="AddProduct-UserPage">
            <div className="SellerProfile-AddProductWrapperTotal">
        
        <div  className={"SellProductFormWrapper"  + (AddProductsForm===true? "" : " Hide")}>
        <TextField
          id="Seller-Product-FullName-TypeArea"
          label="Full Name"
          placeholder="Full Name"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.FullName= e.target.value;
            setNewProduct(NewProduct);
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Description"
          placeholder="Description"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.Description= e.target.value;
            setNewProduct(NewProduct);
          }}
          sx={{width:'90%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Price"
          placeholder="Price"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.Price= e.target.value;
            setNewProduct(NewProduct);
          }}

          sx={{width:'20%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <TextField
          id="Seller-Description-TypeArea"
          label="Quantity"
          placeholder="Quantity"
          multiline 
          maxRows={3}
          onChange={(e)=>{
            NewProduct.Quantity= e.target.value;
            setNewProduct(NewProduct);
          }}
          sx={{width:'20%',margin:'10px', maxWidth:'700px'  , boxShadow:4}}
        /> 
        <div className="Seller-MediaButton">
        <label htmlFor="Post-ImageAttach-Input">
                     <input accept="image/*" id="Post-ImageAttach-Input" multiple type="file"   className="AttachFile-InputBar Hide" 
                     onChange={(e)=>{
                     
                      
                        var files = document.getElementById("Post-ImageAttach-Input");
                        var media=[];
                        if(files && files.files && Object.keys(files.files).length>0){
                          Object.keys(files.files).forEach(index=>{
                            console.log("Debug PostMedia->",files.files[index],files.files)
                            media.push(URL.createObjectURL(files.files[index]));
                          })
                        }
                        NewProduct.Media = media;
                        setNewProduct(NewProduct);
                     }}
                     />
                    <AttachFileIcon 
                    sx={{
                      width:'40px' , height:'35px' ,  cursor:'pointer'
                    }}
                                />
                       </label>
        </div>
        <div className="Seller-AddForm-Button CustomButton-GeneralProperties AddProductButton-X">
            <div  onClick={()=>{
                addProduct();
            }} >Add Product</div>
        </div>
        <div className="HelperText" id="AddProduct-HelperText">{HelperText}</div>
            </div>
            </div>
              </div>
              </>
    )
  }


console.log(admin);

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
            <span className="User-Name"></span>
            <span className="Basic-Info-Text">Admin</span>
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
                <Tab label="Restaurants" value="1" sx={{fontSize:'16px',fontWeight:'320'}} />
                <Tab label="Products" value="2" sx={{fontSize:'16px',fontWeight:'320'}} className="pa31-tab-select-2" />
                <Tab label="Promotions" value="3" sx={{fontSize:'16px',fontWeight:'320'}}/>
                
              </TabList>
            </Box>



            <TabPanel value="1"  sx={{display:'flex', flexFlow:'row wrap', alignItems:'center',justifyContent:'center' }}>
              <div className="pa31-rest-cards-main-wrap">
                <RestaurantComponent restaurantsMap={restaurantsMap} />
              </div>
            </TabPanel>




            <TabPanel value="2"  sx={{display:'flex', flexFlow:'row wrap', alignItems:'center' ,
            justifyContent:'center'
        }}>
            
       <div className="pa31-prod-cards-main-wrap">
              {
              <ProductCompoennt productMap={productsMap} restaurantMap={restaurantsMap}/>
              }
       </div>
            </TabPanel>



            <TabPanel value="3"  sx={{display:'flex', flexFlow:'row wrap', alignItems:'center' }}>
             <TextField
             label="Promo Name"
             placeholder="Promo Name"
             sx={{
              width:'40%',margin:'10px', maxWidth:'700px'  , boxShadow:4
             }}
             />
             <TextField
             label="Promo on"
             placeholder="Enter minimum amount"
             sx={{
              width:'50%',margin:'10px', maxWidth:'700px'  , boxShadow:4
             }}
             />
             <TextField
             label="Maximum Discount"
             placeholder="Maximum Discount"
             sx={{
              width:'80%',margin:'10px', maxWidth:'700px'  , boxShadow:4 , marginLeft:'10%'
             }}
             multiline
             maxRows={6}
             />
             <div className="SubmitElemenets-Request-Body">
             <Button 
             onClick={()=>{
               const x = document.getElementById("RequestSubmit-HelperText");
               x.innerHTML="Request Submmited Successfully";
             }}
             sx={{
                  backgroundColor:'gold' , boxShadow:4 
             }}> Submit Request</Button>
             <div className="RequestSubmit-HelperText" id="RequestSubmit-HelperText"   
             sx={{
              display:'block', marginLeft:'40%'
             }}

             ></div>
             </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );

};

export default Admin;