import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CartCard from "../../Components/CartCard/CartCard";
import './Cart.css'

const Cart = () =>{
   const history = useNavigate();
   const params = useParams();
   var UserName = params.UserName || "";

    const [Total,setTotal] = useState(0);
    const [ProductList,setProductList] = useState([]);
    const [Products,setProducts] = useState(new Map());
    const [Cart,setCart] = useState([]);
const [QuantityList,setQuantityList] = useState(new Map());
     useEffect(()=>{
        const Port="http://localhost:5000";
           axios.get(`${Port}/Products/get`)
           .then(res=>{
            console.log("ProductList fetched->",res.data);
            setProductList(res.data);
           })
           .catch(err=>{
            console.log("ProductList error->",err);
           })
     },[])

  useEffect(()=> {
  setQuantityList([]);
    for(var i=0;i<ProductList.length;i++){
        QuantityList.set(ProductList[i].ProductId , ProductList[i].Quantity)
    }
setQuantityList(new Map(QuantityList));
ProductList.forEach(product=>{
    Products.set(product.ProductId , product.Quantity);
})
setProducts(new Map(Products));
console.log("Quantity List -> ", QuantityList);
  },[ProductList])
var count=0;
console.log("Quantity List -> ", QuantityList);


   useEffect(()=>{
     var x = 0;
     ProductList.forEach(product=>{
         x += (product.Price * (QuantityList.get(product.ProductId)));
     })
     setTotal(x);
   },[QuantityList])


    useEffect(()=>{
        const Temp = window.localStorage.getItem("Cart");
        const X = JSON.parse(Temp);
        setCart(X);
      console.log("Cart Items fected from local storage", X);
    },[])
  

    return(
        <div className="CartWrapepr">
            
          <div className="Cart-HeaderWrapper">
            <div className="Cart-Header">
            Products In Your Cart:
          </div>
          <div className="Cart-CheckOutWrapper">
            <div className="Cart-CheckOut-Title">
                Sub Total:
            </div>
            <div className="Cart-CheckOut-SumTotal">
                 Rs: {Total}
            </div>
            <div className="Cart-CheckOut-Button"
            onClick={()=>{
                if(UserName && UserName.length>0){
                window.location.replace(`/Payemnt/${UserName}/${Total}`)
                }
                else{
                    window.location.replace('/Login');
                }
            }}
            >
                Buy Now
            </div>
            </div>
          </div>
          <div className="Cart-ProductList-Wrapper">
            {
                    ProductList.map(product=>{
                       count++;
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
                                    <div className="DescriptionPage-QuantityWrapper InCartQuantityWrapper">
                                <div className="DescriptionPage-QuantityButtons Incr InCartQuantityWrapper"
                                onClick={()=>{
                                   const temp  = QuantityList.get(Product.ProductId) +1 ;
                                   QuantityList.set(Product.ProductId, temp);
                                   setQuantityList(new Map(QuantityList));
                                        //  ProductList[count].Quantity= ProductList[count].Quantity +1;
                                        //  setProductList(ProductList);
                                }}
                                >
                                +
                                </div>
                                <span className="Description-Count InCartQuantityWrapper">
                                {QuantityList.get(Product.ProductId)}
                                </span>
                                
                                <div className="DescriptionPage-QuantityButtons Decr InCartQuantityWrapper"
                                 onClick={()=>{
                                    const temp  = QuantityList.get(Product.ProductId) +1 ;
                                   QuantityList.set(Product.ProductId, temp);
                                   setQuantityList(new Map(QuantityList));
                                }}
                                >
                                -
                                </div>
                                </div>
                                    </div>
                                 </div>
                            </div>
                        )
                        count++;
                    })
            }
          </div>
        </div>
    )
}

export default Cart;