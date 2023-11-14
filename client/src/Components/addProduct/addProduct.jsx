import React, { useEffect, useState } from "react";
import { product_initialState } from "../../Data/Schemas";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { closeForm } from "../../Store/Slices/FormSlice/FormSlice";
import './This.css'

const AddProduct = () =>{
    
    const restaurant  = useSelector(state=>state.restaurant);
    const form = useSelector(state=>state.form.addProd);
    const dispatch=  useDispatch();
    const [product,setProduct] = useState({
        ...product_initialState,
        restaurantId : restaurant._id || null,
    }
    );
    useEffect(()=>{
      if(restaurant && restaurant._id){
        setProduct({
            ...product,
            restaurantId: restaurant._id
        })
      }
    },[restaurant]);

  async function addProductToDB(){
    const formData = new FormData();
    var files = document.getElementById("caap31-media").files;
    
    console.log("files =>",files)

    for (const file of files) {
      console.log("Each Image =>",file,file.name);
      formData.append("image", file, file.name);
    }
    formData.append('product',JSON.stringify(product));
     console.log("adding product =>",product," to => ",restaurant);
    await axios.post('/Restaurant/addProduct',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }
).then(res=>{
    console.log("response from adding product ",res);
    if(res.status===200){
        dispatch(closeForm({
            formName: "addProd",
            isOpen: false,
        }))
    }
}).catch(err=>{
    console.log("error from adding product ",err);
});

  }

  console.log("Add Product form is ",form)


  if(form && form.isOpen===false) return (<></>)
    return(
       <div className="caap31-main-wrap">
        <div className="caap31-close-button-wrap">
            <button className="caap31-close-button"
            onClick={(e)=>{
                setProduct(product_initialState);
                dispatch(closeForm({
                    formName: "addProd",
                    isOpen: false,
                }))
            }}
            >X</button>
        </div>
        <div className="caap31-title-wrap">
            <span className="caap31-title-text"> add Product</span>
        </div>
        <div className="caap31-input-wrap">
            <fieldset className="caap31-fieldset-wrap">
                <legend className="caap31-legend-wrap">
                    Product Name
                </legend>
                <TextField
                id="caap31-product-name"
                value={product.FullName || ""}
                onChange={(e)=>{
                    setProduct({
                        ...product,
                        FullName:e.target.value
                    })
                }}
                error={!product.FullName}
                helperText={!product.FullName? " Enter a Name for the Product" : ""}
                />
            </fieldset>
            <fieldset className="caap31-fieldset-wrap">
                <legend className="caap31-legend-wrap">
                    Price
                </legend>
                <TextField
                id="caap31-product-price"
                value={product.Price || ""}
                onChange={(e)=>{
                    setProduct({
                        ...product,
                        Price:e.target.value
                    })
                }}
                error={!product.Price}
                helperText={!product.Price? " Enter a Name for the Product" : ""}
                />
            </fieldset>
            <fieldset className="caap31-fieldset-wrap">
                <legend className="caap31-legend-wrap">
                    Description
                </legend>
                <TextField
                id="caap31-product-dexription"
                value={product.Description[0] || ""}
                onChange={(e)=>{
                    setProduct({
                        ...product,
                        Description: [e.target.value]
                    })
                }}
                
                />
            </fieldset>
             <fieldset className="caap31-fieldset-wrap">
                <legend className="caap31-legend-wrap">
                    Media
                </legend>
                <div className="caap31-media-wrap">
                    <input type="file" id="caap31-media" 
                    accept="image/*"
                    name="files[]"
                    multiple
                    onChange={(e) => {
                      console.log(e.target.files);
                      console.log(
                        document.getElementById(
                          "caap31-media"
                        ).files
                      );
                      var files = document.getElementById(
                        "caap31-media"
                      );
                      var media = [];
                      if (
                        files &&
                        files.files &&
                        Object.keys(files.files).length > 0
                      ) {
                        Object.keys(files.files).forEach((index) => {
                          console.log(
                            "Debug MessageMedia->",
                            files.files[index],
                            files.files
                          );
                          media.push(
                            URL.createObjectURL(files.files[index])
                          );
                        });
                      }
                      setProduct({
                        ...product,
                        Media: media,
                      });
                    }}
                    />
                </div>
                <div className="caap31-media-preview-wrap">
                    {
                        product.Media && product.Media.length>0 && product.Media.map((media,index)=>{
                            return(
                                <div className="caap31-media-preview-box" key={index}>
                                    <img src={media} alt="media" className="caap31-media-preview"/>
                                </div>
                            )
                        })
                    }
                </div>
             </fieldset>
        </div>
        <div className="caap31-submit-button-wrap">
            <button className="caap31-submit"
            id="caap31-add-product-button"
            onClick = {(e)=>{
                addProductToDB()
            }}
            >
                Add
            </button>
        </div>
       </div>
    )
}

export default AddProduct