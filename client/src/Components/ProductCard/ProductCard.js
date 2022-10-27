import react  from 'react';
import './ProductCard.scss'
import Rating from '@mui/material/Rating';

const ProductCard = (product) =>{

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

return (
    <div className="ProductCard-Wrapper">
        
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
)

}

export default ProductCard;