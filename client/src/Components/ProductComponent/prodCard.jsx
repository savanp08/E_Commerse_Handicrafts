import react, { useEffect, useState }  from 'react';

import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../Store/Slices/CartSlice/CartSlice';
import { openForm } from '../../Store/Slices/FormSlice/FormSlice';
import './This.css';
import { addRestaurant } from '../../Store/Slices/restaurantSlice/restaurantSlice';
import { restaurant_initialState } from '../../Data/Schemas';
import { addProduct } from '../../Store/Slices/ProductSlice/ProductSlice';
import { useNavigate } from 'react-router';

const ProductCard = ({product,type,restaurant}) =>{

    console.log("product => ",product);
const [Count ,setCount]= useState(1);
const [CartProducts,setCartProducts]= useState([]);
const dispatch = useDispatch();
const cart = useSelector(state=>state.cart);
const user= useSelector(state=>state.user);
const admin= useSelector(state=>state.admin);
const navigate = useNavigate();
useEffect(()=>{
    if(product && product._id && cart && cart.length>0){
        var id = product._id;
        var c=0;
        if(Array.isArray(cart)){
            cart.forEach(item=>{
                if(item._id === id){
                    c+=item.Quantity;
                }
            })
        }
        if(c>0) setCount(c);

    }
},[product,cart])
    var Product=product;
    console.log(Product);
if(Product &&  Product.Media && Product.Media[0])
var x=5;
else Product.Media=[""];
var Description=[""];
if(Product && Product.Description && Product.Description[0])
Description=Product.Description;
var Media=[""];
if(Product && Product.Media && Product.Media[0])
Media=Product.Media;
if(Product.Rating<=0) Product.Rating=1;


async function AddToCartProduct(ProductX){
    var Product = {...ProductX};
    Product.Quantity = Count+0;
    var tUser = {...user};
    var temp_map = new Map();
    Array.from(cart).forEach((item)=>{
        temp_map.set(item._id,item);
    })
    temp_map.set(Product._id,Product);
    tUser.cart = Array.from(temp_map.values());

    if(user && user._id){
        await axios.post("/Auth/updateOne", {
           ...tUser
        }).then(res=>{
            console.log("response from update user ",res);
        
        }).catch(err=>{
            console.log("error from update user ",err);
        
        })
    }
    var newuniqueArr = Array.from(temp_map.values());
    dispatch(addCart(newuniqueArr));
}

async function deleteCard(){
    await axios.post("/Restaurant/editRestaurant", {
        ...restaurant,
        menu: restaurant.menu.filter((item)=>{
            return item._id!==product._id;
        })
    }).then(res=>{
        console.log("response from delete ",res);
    }).catch(err=>{
        console.log("error from delete ",err);
    })


}
const address = restaurant? restaurant.location.street1 +", " + restaurant.location.street2+  ', ' + restaurant.location.city + ', ' + restaurant.location.state + ' ' + restaurant.location.pinCode : "";
if(type && type==="admin")
return (
    <div className="ProductCard-Wrapper">
        <div className="ProductCard-Container">
        <div className="ProductCard-FrontSideWrapper"
        onClick={()=>{
           navigate('/Description/'+product._id);
          }}
        >
        <img src={Media[0]} alt="NA" className='ProductCard-LeftWrapper'/>
        <div className="ProductCard-RightWrapper">
        <div className="ProductCard-MainInfo-Wrapper">
            <div className='ProductCard-group-wrap'>
         <span className="ProductCard-Name">
            {Product.FullName}
         </span>
         <span className='ProductCard-location-text'>{address}</span>
         </div>
         
         <div className="ProductCard-group-wrap">
         <span className='ProductCard-rating-text'>{Product.Rating}</span>
         
         <span className="ProductCard-Price">
              {Product.Price}$
         </span>
         </div>
         </div>
        
        </div>
        </div>
        <div className="ProductCard-BackSideWrapper">
            <div className="ProductCard-BackSide-TopWrapper">
                
                   <div className="ProductCard-BackSide-product-description" sx={{ color:'white' }}>
                   {product.Description[0]}
                   </div>
                   
            </div>
            <div className="ProductCard-BackSide-BottomWrapper">
            <div className="Description-Top-Right-Bottom _300px">
            <div className="DescriptionPage-QuantityWrapper InProductCardQuantityWrapper">
            <div className="DescriptionPage-QuantityButtons Incr"
            onClick={()=>{
               setCount(Count+1);
            }}
            >
            +
            </div>
            <span className="Description-Count">
            {Count}
            </span>
            
            <div className="DescriptionPage-QuantityButtons Decr"
             onClick={()=>{
               setCount(Count-1);
            }}
            >
            -
            </div>
            <button className="ppc90-addtocart-button"  
            onClick={()=>{
                AddToCartProduct(Product);
              
            }}
            >
               Add To Cart
            </button>
            </div>
         <div className="DescriptionPage-AddToCart">
            
            <button className="ppc90-addtocart-button" 
            onClick={()=>{
            navigate('/Description/'+product._id +"/"+product.restaurantId)
          }} >
            View Product
          </button>
         </div>
         </div>
            </div>
        </div>
        </div>
        <div className='cpapc33-ProductCard-options-wrap'>
        <button className='cpapc33-ProductCard-option-button'>
            <span className='ProductCard-option-button-text'
            onClick={(e)=>{
                dispatch(openForm({
                    formName : "editProd",
                    data:product
                }));
                dispatch(addRestaurant({
                ...restaurant_initialState,
                _id:product.restaurantId
                }))
                 dispatch(addProduct(product));
            }}
            >Edit</span>
        </button>
        <button className='cpapc33-ProductCard-option-button'>
            <span className='ProductCard-option-button-text'
            onClick={(e)=>{
                deleteCard();
            }}
            >Delete</span>
        </button>
        </div>
    </div>
)
else 
return(
    <div className="ProductCard-Wrapper">
        <div className="ProductCard-Container">
        <div className="ProductCard-FrontSideWrapper"
        onClick={()=>{
           navigate('/Description/'+product._id);
          }}
        >
        <img src={Media[0]} alt="NA" className='ProductCard-LeftWrapper'/>
        <div className="ProductCard-RightWrapper">
        <div className="ProductCard-MainInfo-Wrapper">
            <div className='ProductCard-group-wrap'>
         <span className="ProductCard-Name">
            {Product.FullName}
         </span>
         <span className='ProductCard-location-text'>{address}</span>
         </div>
         
         <div className="ProductCard-group-wrap">
         <span className='ProductCard-rating-text'>{Product.Rating}</span>
         
         <span className="ProductCard-Price">
              {Product.Price}$
         </span>
         </div>
         </div>
        
        </div>
        </div>
        <div className="ProductCard-BackSideWrapper">
            <div className="ProductCard-BackSide-TopWrapper">
                
                   <div className="ProductCard-BackSide-product-description" sx={{ color:'white' }}>
                   {product.Description[0]}
                   </div>
                   
            </div>
            <div className="ProductCard-BackSide-BottomWrapper">
            <div className="Description-Top-Right-Bottom _300px">
            <div className="DescriptionPage-QuantityWrapper InProductCardQuantityWrapper">
            <div className="DescriptionPage-QuantityButtons Incr"
            onClick={()=>{
               setCount(Count+1);
            }}
            >
            +
            </div>
            <span className="Description-Count">
            {Count}
            </span>
            
            <div className="DescriptionPage-QuantityButtons Decr"
             onClick={()=>{
               setCount(Count-1);
            }}
            >
            -
            </div>
            <button className="ppc90-addtocart-button"  
            onClick={()=>{
                AddToCartProduct(Product);
              
            }}
            >
               Add To Cart
            </button>
            </div>
         <div className="DescriptionPage-AddToCart">
            
            <button className="ppc90-addtocart-button" 
            onClick={()=>{
            navigate('/Description/'+product._id +"/"+product.restaurantId)
          }} >
            View Product
          </button>
         </div>
         </div>
            </div>
        </div>
        </div>
      
    </div>
)

}

export default ProductCard;