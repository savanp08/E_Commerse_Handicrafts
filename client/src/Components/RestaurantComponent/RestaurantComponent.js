import React, { useEffect, useState } from 'react';
import RestauCard from '../RestauCard/RestauCard';
import { useDispatch } from 'react-redux';
import { openForm } from '../../Store/Slices/FormSlice/FormSlice';
import AddRestaurantComponent from '../addRestaurant/addRestaurantComponent';
import './This.css';
import EditRestaurantComponent from '../addRestaurant/editRestaurant';
import { restaurant_initialState } from '../../Data/Schemas';
import { TextField } from '@mui/material';

function RestaurantComponent({restaurantsMap}) {
  
  console.log("RestaurantsMap",restaurantsMap,Array.from(restaurantsMap));
  const [displayMap,setDisplayMap] = useState(new Map());
  const [search,setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    if(search.length===0){
        setDisplayMap(new Map(restaurantsMap));
        return;
    }
    var x = new Map();
    Array.from(restaurantsMap.values()).forEach((product)=>{

      var displayAddress = product.location;
      var loc = displayAddress.street2 + " " + displayAddress.street1 + " " + displayAddress.apartment 
      + " " + displayAddress.city + " " + displayAddress.state + " " + displayAddress.zipCode;
      console.log("checking if search matches",product.restaurantName?.toLowerCase() , " or ", loc.toLowerCase())
        if(product.restaurantName?.toLowerCase().includes(search.toLowerCase()) || loc.toLowerCase().includes(search.toLowerCase())){
            x.set(product._id,product);
        }
    })
    setDisplayMap(new Map(x));

},[search,restaurantsMap])

  return (
    <div className="carc12-main-wrap">
        <div className='carc12-addrest-button-wrap'>
      <button className="carc12-addres-Button"
      onClick={(e)=>{
         dispatch(openForm({
          formName:"addRest",
          data:null
         }))
      }}
      >
        Add
      </button>
      
      </div>
      <div className='carc12-restaurant-inner-cards-wrap'>
        <div className='carc12-restaurant-filter-wrap'>
        <TextField
                id="carcfp34-product-filter"
                label="Filter Products"
                variant="outlined"
                sx={{
                  boxShadow:4
                }}
                value={search || ""}
                onChange={(e)=>{
                    setSearch(e.target.value);
                }}
                />
        </div>
      <div className="carc12-restaurant-cards-wrap">
        {
          Array.from(displayMap.values()).map((restaurant) => {
            return <RestauCard restaurant={restaurant}/>
          })
        }
      </div>
      <AddRestaurantComponent />
      <EditRestaurantComponent/>
    </div>
    </div>
  );
}

export default RestaurantComponent;
