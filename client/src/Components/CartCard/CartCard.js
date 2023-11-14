import React from "react";
import './CartCard.css';


const CartCard = (product)=>{

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
    return(
        <div className="CartCard-Wrapper">
             <img src={Product.Media[0]} className="CartCard-LeftSide-Wrapper">

             </img>
             <div className="CartCard-RightSide-Wrapper">
                <div className="CartCard-LeftSide-Details">
                      <div className="CartCard-Name">
                        {Product.FullName}
                      </div>
                      <div className="CartCard-Price">
                        {Product.Price}
                      </div>
                      <div className="CartCard-Description">
                        {Description}
                      </div>
                </div>
                <div className="CartCard-RightSide-QuantityWrapper">

                </div>
             </div>
        </div>
    )
}

export default CartCard;
