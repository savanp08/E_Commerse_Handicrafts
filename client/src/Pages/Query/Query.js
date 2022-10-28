
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../../Components/ProductCard/ProductCard";
import './Query.scss';

const Query =() =>{
    var params = useParams();
    var Query=params.Query.toLowerCase();
const [Products,setProducts] =useState([]);
const [FilteredProducts,setFilteredProducts] = useState([]);

console.log("Searching for ",Query);

useEffect(()=>{
//  axios.get(`/Products/:${SearchedQuery}`)
//  .then(res=>{
//      setProducts(res);
//  })
//  .catch(err=>{
//     console.log("Error while getting products from queries");
//  })
axios.get(`/Products/get`)
 .then(res=>{
  console.log("Products retrieved",res.data);
     setProducts(res.data);
    //  Products.map(product=>{
    //   if(product.FullName.toLowerCase().includes(Query.toLowerCase()) || product.Description.toLowerCase().includes(Query.toLowerCase()) )
    //   FilteredProducts.push(product);
    // })
    // setFilteredProducts(FilteredProducts);
 })
 .catch(err=>{
    console.log("Error while getting products from queries");
 })
},[])

useEffect(()=>{
  
  Products.map(product=>{
    console.log("Searching for ", Query , " in ", product.FullName.toLowerCase() , );
    if(product.FullName.toLowerCase().includes(Query.toLowerCase()) || product.Description[0].toLowerCase().includes(Query.toLowerCase()) )
    FilteredProducts.push(product);
  })
  setFilteredProducts(FilteredProducts);
},[Products]);
 console.log("FilteredProducts",FilteredProducts);

  return(
    <div className="QueryWapper">
        <div className="QueryHeader">
            <div className="Query-HeaderTitle">
              Searching for {Query}
            </div>
            <div className="Query-Filters">
             
            </div>
        </div>
        <div className="QueryCOntainer">
            {
              FilteredProducts.map(product =>{
                return(
                 
                    <ProductCard product={product} />
                  
                )
              })
            }
        </div>
    </div>
  )

}

export default Query;