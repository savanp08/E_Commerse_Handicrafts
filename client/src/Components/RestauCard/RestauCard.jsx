import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openForm } from '../../Store/Slices/FormSlice/FormSlice';
import { addRestaurant } from '../../Store/Slices/restaurantSlice/restaurantSlice';
import './This.css'
import Rating from '@mui/material/Rating';

const RestauCard = ({restaurant}) => {

    const dispatch = useDispatch();
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
        await axios.put("/Restaurant/editRestaurant",{
            ...restaurant,
        }).then(res=>{
            console.log("response from edit ",res);
        }).catch(err=>{
            console.log("error from edit ",err);
        })
    }

    if(!restaurant) return (<div>loading...</div>)
    console.log("restaurant in restauCard ",restaurant);
    const Address = restaurant.location.street1 +", " + restaurant.location.street2+  ', ' + restaurant.location.city + ', ' + restaurant.location.state + ' ' + restaurant.location.zipCode;
    var restTypes =""
    if(restaurant.types){
    for(let i=0;i<restaurant.types.length;i++){
        restTypes += restaurant.types[i].label + ", ";
    }
}
  return (
    <div className="crc25-main-wrap">
        <div className="crc25-details-wrap">
            <div className='crc25-restaurant-group-wrap-column'>
          
      <span className='crc25-restaurant-name crc25-text-general prevent-text-overflow-without-width'>{restaurant.restaurantName}</span>
      </div>
      <div className='crc25-restaurant-group-wrap-column'>
        <span className='crc25-restaurant-types crc25-text-general prevent-text-overflow-without-width'>{restTypes}</span>
      <span className='crc25-restaurant-address crc25-text-general prevent-text-overflow-without-width'>{Address}</span>
      </div>
      <div className='crc25-restaurant-ratings-wrap'>
        <div className='crc25-restaurant-rating'>
        <Rating
        name="simple-controlled"
        value={restaurant.rating}
        readOnly
        
      />
        </div>
        <span className='crc25-restaurant-rating-count'>({restaurant.num_ratings})</span>
        
        </div>
        <div className='crc25-restaurant-group-wrap'>
            <span className='crc25-restaurant-menu-count'>Menu Items:</span>
        <span className='crc25-restaurant-menu-count crc25-main-text'> {restaurant.menu.length}</span>
        </div>
        </div>
       <div className='crc25-options-wrap'>
        <button className='crc25-option-button'
        id="crc25-edit-button"
        onClick={(e)=>{
            dispatch(openForm({
                formName : "editRest",
                data:null
            }));
            dispatch(addRestaurant(restaurant));
        }}
        >Edit</button>
        <button className='crc25-option-button'
        id="crc25-delete-button"
        onClick={(e)=>{
            deleteCard();
        }}
        >Delete</button>
       </div>
    </div>
  );
};

export default RestauCard;
