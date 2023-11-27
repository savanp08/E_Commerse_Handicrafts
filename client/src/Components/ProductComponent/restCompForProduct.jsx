import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openForm } from '../../Store/Slices/FormSlice/FormSlice';
import { addRestaurant } from '../../Store/Slices/restaurantSlice/restaurantSlice';
import ProductCard from './prodCard';
import { TextField } from '@mui/material';
import { product_initialState } from '../../Data/Schemas';
import { useNavigate } from 'react-router';
import Rating from '@mui/material/Rating';


const RestauCardForProduct = ({restaurant,productsMap}) => {

    console.log("rest comp for prod debug => props in RestauCardForProduct ",productsMap,restaurant);
    const [prodMap,setProdMap] = useState(new Map());
    const dispatch = useDispatch();
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    const [displayMap,setDisplayMap] = useState(new Map());
    async function deleteCard(){
        await axios.delete("/Restaurant/deleteRestaurant",{
            data: {
                restaurantId: restaurant._id,
            }
        }).then(res=>{
            console.log("response from delete ",res);
        }).catch(err=>{
            console.log("error from delete ",err);
        })

    }
    async function editRest(){
        await axios.post("/Restaurant/editRestaurant",{
            ...restaurant,
        }).then(res=>{
            console.log("response from edit ",res);
        }).catch(err=>{
            console.log("error from edit ",err);
        })
   
    }

    useEffect(()=>{
        console.log("restaurant in restauCardForProduct ",restaurant);
        if(restaurant && restaurant._id && Array.isArray(restaurant.menu)){
            var x = new Map();
            restaurant.menu.forEach((product)=>{
                x.set(product._id,product);
            })
            setProdMap(new Map(x));
        }
    },[restaurant])
    useEffect(()=>{
        if(search.length===0){
            setDisplayMap(new Map(prodMap));
            return;
        }
        var x = new Map();
        Array.from(prodMap.values()).forEach((product)=>{
            if(product.FullName.toLowerCase().includes(search.toLowerCase())){
                x.set(product._id,product);
            }
        })
        setDisplayMap(new Map(x));

    },[search,prodMap,restaurant])

    if(!restaurant) return (<div></div>)
    console.log("restaurant in restauCardForProduct ",restaurant);
    const Address = restaurant.location.street1 +", " + restaurant.location.street2+  ', ' + restaurant.location.city + ', ' + restaurant.location.state + ' ' + restaurant.location.zipCode;
    var restTypes =""
    if(restaurant.types){
    for(let i=0;i<restaurant.types.length;i++){
        restTypes += restaurant.types[i].label + ", ";
    }
}
  return (
    <div className="carcfp34-main-wrap">
        <div className='carcfp34-rest-main-wrap'>
        <div className="carcfp34-details-wrap">
           <div className='carcfp34-restaurant-group-wrap'> 
           <div className='carcfp34-restaurant-group-wrap-column'>
      <span className='carcfp34-restaurant-name prevent-text-overflow-without-width'>{restaurant.restaurantName}</span>
      <span className='crc25-restaurant-types crc25-text-general prevent-text-overflow-without-width'>{restTypes}</span>
      <span className='carcfp34-restaurant-address prevent-text-overflow-without-width'>{Address}</span>
        </div>
      </div>
      <div className='carcfp34-restaurant-group-wrap'>
        <div className='carcfp34-restaurant-rating'>
        <Rating
        name="simple-controlled"
        value={restaurant.rating }
        readOnly
        
      />
        </div>
        <span className='carcfp34-restaurant-rating-count'>({restaurant.num_ratings})</span>
        
        </div>
        <span className='carcfp34-restaurant-menu-count'> Menu Items: {restaurant.menu.length}</span>
        </div>
       
       </div>
       <div className='carcfp34-products-wrap'>
        <div className='carcfp34-options-wrap'>
        <button className='carcfp34-option-button'
        id="carcfp34-option-button-add-product"
        onClick={(e)=>{
            dispatch(openForm({
                formName : "addProd",
                data:null
            }));
            dispatch(addRestaurant(restaurant));
        }}
        >
        <span className='carcfp34-option-button-text'
        
        >Add Product</span>
        </button>
        <button className='carcfp34-option-button'>
            <span className='carcfp34-option-button-text'
            onClick={(e)=>{
                dispatch(addRestaurant(restaurant));
                navigate('/Restaurant/'+restaurant._id);
                
            }}
            >View All</span>
        </button>
        </div>
        <div className='carcfp34-products-main-inner-wrap'>
            <div className='carcfp34-products-filter-wrap'>
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
        <div className='carcfp34-products-list-wrap'>
            {
                Array.from(displayMap.values()).map((product)=>{
                    return(
                        <ProductCard product={product} type={"admin"} restaurant={restaurant}/>
                    )
                })
            }
        </div>
        </div>
       </div>
    </div>
  );
};

export default RestauCardForProduct;
