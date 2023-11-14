import React from "react";
import RestauCardForProduct from "./restCompForProduct";
import AddProduct from "../addProduct/addProduct";
import EditProduct from "../addProduct/editProduct";
import './This.css';

const ProductCompoennt = ({productMap, restaurantMap}) => {

    console.log("productMap in ProductComponent ",productMap,restaurantMap);
    
    

    return(
        <div className="capc32-main-wrap">
           <div className="capc32-title-wrap">
                <span className="capc32-title-text">Products</span>
           </div>
           <div className="capc32-product-wrap">
            {
                Array.from(restaurantMap.values()).map((res,key)=>{
                    return(
                      <RestauCardForProduct key={key} restaurant={res} productsMap={productMap}/>
                    )
                  })
            }
           </div>
           <AddProduct/>
           <EditProduct restaurantMap={restaurantMap}/>
        </div>
    )
}

export default ProductCompoennt;