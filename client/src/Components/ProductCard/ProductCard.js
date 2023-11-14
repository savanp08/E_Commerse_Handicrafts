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


async function AddToCartProduct(Product){
    Product.Quantity = Count;
    //  localStorage.setItem("Cart",JSON.stringify(Product));

      let Temp = localStorage.getItem("Cart");
     
        
      if(Temp && Temp.length==0) Temp = "";
      if(Temp && Temp.length)
    console.log("Cart Items Fetched from Local Storage",JSON.parse(Temp));
    
     
      

     var Parsed;
    if(Temp && Temp.length>0){ 
     Parsed = JSON.parse(Temp);
    }
    else Parsed = [];
    if(!Array.isArray(Parsed)){
        Parsed = [Parsed];
      }
    if(Parsed && Array.isArray(Parsed)){
        Parsed.push(Product);
    }
     console.log("Parsed from Cart ->",Parsed , "Of length",Parsed.length);
    console.log("Cart Items Added to Local Storage",JSON.stringify(Parsed));
    window.localStorage.setItem("Cart",JSON.stringify(Parsed));
    
   
}




return (
    <div className="ProductCard-Wrapper">
        <div className="ProductCard-Container">
        <div className="ProductCard-FrontSideWrapper"
        onClick={()=>{
            window.location.replace(`/Description/${product.productId}`)
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
                <div className="ProductCard-BackSide-ProductSeller"
                sx={{ color:'white' }}
                >
                   Product By : {Product.SellerId}
                   </div>
                   <div className="ProductCard-BackSide-ProductSeller" sx={{ color:'white' }}>
                   Quantity : {Product.Quantity}
                   </div>
                   <div className="ProductCard-BackSide-ProductSeller" sx={{ color:'white' }}>
                   Sold : {Product.ProductsSold}
                   </div>
                   <div className="ProductCard-BackSide-ProductDescription" sx={{ color:'white' }}>
                    {Description[0]}
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
            <span className="Description-AddCart-Button CustomButton-GeneralProperties"  
            onClick={()=>{
                AddToCartProduct(Product);
              
            }}
            >
               Add To Cart
            </span>
            </div>
         <div className="DescriptionPage-AddToCart">
            
            <div className="Description-AddCart-Button ProductCart-ViewProductButton CustomButton-GeneralProperties" onClick={()=>{
            window.location.replace(`/Description/${Product.productId}`)
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