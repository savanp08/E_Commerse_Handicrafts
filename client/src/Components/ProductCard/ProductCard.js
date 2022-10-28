import react, { useState }  from 'react';
import './ProductCard.scss'
import Rating from '@mui/material/Rating';

const ProductCard = (product) =>{

const [Count ,setCount]= useState(1);
const [CartProducts,setCartProducts]= useState([]);


    var Product=product.product;
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


async function AddToCartProduct(){
     setCartProducts (localStorage.getItem("Cart"));
    console.log("Cart Items Fetched from Local Storage",CartProducts);
    Product.Quantity = Count;
    
    if(!CartProducts || !Array.isArray(CartProducts) ){ 
     setCartProducts(new Array([Product]));
      
    }
    if(Array.isArray(CartProducts) && CartProducts.length<=0 ) setCartProducts(new Array([Product]));
    if(CartProducts &&(typeof myVar === 'string' || CartProducts instanceof String)){
       setCartProducts(JSON.parse(CartProducts));
       setCartProducts(CartProducts.push(Product));
    }
   
    
    localStorage.setItem("Cart",JSON.stringify(CartProducts));
    console.log("Cart Items Added to Local Storage",JSON.stringify(CartProducts));
    localStorage.clear();
}




return (
    <div className="ProductCard-Wrapper">
        <div className="ProductCard-Container">
        <div className="ProductCard-FrontSideWrapper"
        onClick={()=>{
            window.location.replace(`/Description/${product.ProductId}`)
          }}
        >
        <img src={Media[0]} alt="NA" className='ProductCard-LeftWrapper'/>
        <div className="ProductCard-RightWrapper">
         <span className="ProductCard-Name">
            {Product.FullName}
         </span>
         <div className="ProductCard-MainInfo-Wrapper">
         <div className="ProductCard-Rating">
         <Rating name="half-rating" defaultValue={0} precision={Product.Rating} readOnly/>
         </div>
         <div className="ProductCard-Price">
             Rs : {Product.Price}
         </div>
         </div>
         <div className="ProductCard-Description">
            {Description[0]}
            </div>
        </div>
        </div>
        <div className="ProductCard-BackSideWrapper">
            <div className="ProductCard-BackSide-TopWrapper">
                <div className="ProductCard-BackSide-ProductSeller">
                   Product By : {Product.SellerId}
                   </div>
                   <div className="ProductCard-BackSide-ProductDescription">
                    {Description[0]}
                   </div>
            </div>
            <div className="ProductCard-BackSide-BottomWrapper">
            <div className="Description-Top-Right-Bottom">
            <div className="DescriptionPage-QuantityWrapper">
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
            </div>
         <div className="DescriptionPage-AddToCart">
            <span className="Description-AddCart-Button"  
            onClick={()=>{
                AddToCartProduct(Product);
              
            }}
            >
               Add To Cart
            </span>
            <div className="Description-AddCart-Button" onClick={()=>{
            window.location.replace(`/Description/${Product.ProductId}`)
          }} >
            View Product
          </div>
         </div>
         </div>
            </div>
        </div>
        </div>
    </div>
)

}

export default ProductCard;