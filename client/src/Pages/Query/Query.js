
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../../Components/ProductComponent/prodCard";
import './Query.scss';
import { useSelector } from "react-redux";
import RestCompWithFilter from "../../Components/RestCompWithFilter/RestCompWithFilter";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tabs from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

const Query =() =>{
  const params= useParams();
  const quer = params.SearchQuery;
const search = quer;
const [restauarantMap,setRestaurantMap] = useState(new Map());
const [FilteredProducts,setFilteredProducts] = useState([]);
const [displayMap,setDisplayMap] = useState(new Map());
const [displayRestMap, setDisplayRestMap] = useState(new Map());
const [value, setValue] = React.useState("1");
console.log(" rerender debug => query => ");
useEffect(()=>{
//  axios.get(`/Products/:${SearchedQuery}`)
//  .then(res=>{
//      setProducts(res);
//  })
//  .catch(err=>{
//     console.log("Error while getting products from queries");
//  })
async function fetchAllRest(){
await axios.get(`/Restaurant/getAllRestaurants`)
 .then(res=>{
  console.log("Products retrieved",res.data);
     if(Array.isArray(res.data)){
          var x = new Map();
          res.data.forEach((product)=>{
              x.set(product._id,product);
          })
          setRestaurantMap(new Map(x));

      
     }
 })
 .catch(err=>{
    console.log("Error while getting products from queries",err);
 })
}
fetchAllRest();
},[])


useEffect(()=>{

  var x = new Map();
  Array.from(restauarantMap.values()).forEach((product)=>{

    var displayAddress = product.location;
    var loc = displayAddress.street2 + " " + displayAddress.street1 + " " + displayAddress.apartment 
    + " " + displayAddress.city + " " + displayAddress.state + " " + displayAddress.zipCode;
    console.log("checking if search matches",product.restaurantName?.toLowerCase() , " or ", loc.toLowerCase())
      if(product.restaurantName?.toLowerCase().includes(search.toLowerCase()) || loc.toLowerCase().includes(search.toLowerCase())){
          x.set(product._id,product);
      }
  })
  console.log(" Filter debug => Rest after filter",x);
  setDisplayRestMap(new Map(x));
  x = new Map();
 
  Array.from(restauarantMap.values()).forEach((product)=>{
var prods = product.menu;
var y = new Map();
var tempArr =[];
if(prods && prods.length){
  prods.forEach((prod)=>{
    if(prod.FullName.toLowerCase().includes(search.toLowerCase())
    ){
      console.log("Filter debug => Prod ", prod, " matched with name ",search);
      tempArr.push(prod);
    }
    else if(prod.Description[0].toLowerCase().includes(search.toLowerCase())){
      console.log("Filter debug => Prod ", prod, " matched with description ",prod.Description[0],search);
      tempArr.push(prod);
    }
  })

}
if(tempArr.length){
  x.set(product._id,{
    ...product,
    menu:tempArr
  });
}
  })
  console.log(" Filter debug =>Prods  after filter",x);
  var newArr=[]
  x.forEach((value,key)=>{
    value.menu.forEach((prod)=>{
      newArr.push(prod);
    });
  })
  setFilteredProducts(newArr);
  setDisplayMap(new Map(x));

},[search,restauarantMap])
const handleChange = (event, newValue) => {
  setValue(newValue);   
};

 console.log("FilteredProducts",FilteredProducts);

  return(
    <div className="QueryWapper">
        <div className="QueryHeader">
            <div className="Query-HeaderTitle">
              Searching for {search}
            </div>
            <div className="Query-Filters">
             
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
                <Tab label="Products" value="1" sx={{fontSize:'16px',fontWeight:'320'}} />
                <Tab label="Restaurants" value="2" sx={{fontSize:'16px',fontWeight:'320'}}/>
                
                
              </TabList>
            </Box>



            <TabPanel value="1"  sx={{display:'flex', flexFlow:'row wrap', alignItems:'center',justifyContent:'center' }}>
            <div className="pq11-prod-list-main-wrap">

            <div className="pq11-prod-list-title">
            <span className="pq11-prod-list-title-text">Products</span>
          </div>
          <div className="pq11-prod-list-wrap">
            {
              Array.from(FilteredProducts).map((product,key) =>{
                return(
                 
                    <ProductCard restaurant={restauarantMap.get(product.restaurantId)} product={product}/>
                  
                )
              })
            }
          </div>
        </div>
            </TabPanel>




            <TabPanel value="2"  sx={{display:'flex', flexFlow:'row wrap', alignItems:'center' ,
            justifyContent:'center'
        }}>
           <div className="pq11-rest-list-main-wrap">
          <div className="pq11-rest-list-title">
            <span className="pq11-rest-list-title-text">Restaurants</span>
          </div>
          <div className="pq11-rest-list-wrap">
            {
              Array.from(displayRestMap.values()).map((product,key) =>{
                return(
                 
                    <RestCompWithFilter restaurant={product} key={key}/>
                  
                )
              })
            }
          </div>
        </div>
      
            </TabPanel>
          </TabContext>
        </Box>
         
       
    </div>
  )

}

export default Query;