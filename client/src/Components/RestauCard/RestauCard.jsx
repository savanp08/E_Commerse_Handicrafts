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
    const Address = restaurant.location.street1 +", " + restaurant.location.street1+  ', ' + restaurant.location.city + ', ' + restaurant.location.state + ' ' + restaurant.location.pinCode;
  return (
    <div className="crc25-main-wrap">
        <div className="crc25-details-wrap">
            <div className='crc25-restaurant-group-wrap'>
            <span className='crc25-restaurant-nameH'>Located at</span>
      <span className='crc25-restaurant-name crc25-text-general'>{restaurant.restaurantName}</span>
      </div>
      <span className='crc25-restaurant-address crc25-text-general'>{Address}</span>
      <div className='crc25-restaurant-ratings-wrap'>
        <div className='crc25-restaurant-rating'>
        <Rating
        name="simple-controlled"
        value={restaurant.rating || (Math.random()*5 + 1).toFixed(1)}
        readOnly
        
      />
        </div>
        <span className='crc25-restaurant-rating-count'>({restaurant.num_ratings || (Math.floor(Math.random() * (70 - 25 + 1)) + 25)})</span>
        
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
