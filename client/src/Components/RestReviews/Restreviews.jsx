import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './RestReviews.css';
import { Rating, TextField } from "@mui/material";
import axios from "axios";
import { closeForm } from "../../Store/Slices/FormSlice/FormSlice";


const Restreviews = ({restaurantX,user}) =>{
    var [restaurant,setRestaurant] = useState(restaurantX);

    const form = useSelector(state=>state.form.reviews);
    const dispatch = useDispatch();
    const [newReview , setNewReview] = useState({
        name:"",
        rating:0,
        text:"",
    })

    useEffect(()=>{
         setRestaurant(restaurantX);
    },[restaurantX])
   
    async function updateRestReviews(){
        try{
            if(!user || !user._id) {
                alert("login to add review");
                return;
            }
          await axios.post("/Restaurant/editRestaurant",{
              ...restaurant,
                reviews:[
                    ...restaurant.reviews,
                    {
                        ...newReview,
                        user:{
                           userId: user._id,
                            name: user.FullName,
                        }
                    }
                ]
            }).then(res=>{
                  console.log("response from update rest ",res);
                  if(res && res.status=== 200){
                    var x= document.getElementById("crr003-add-review-form-wrap");
                    x.classList.toggle("Hide");
                    setRestaurant({
                        ...restaurant,
                        reviews:[
                            ...restaurant.reviews,
                            {
                                ...newReview,
                                user:{
                                   userId: user._id,
                                    name: user.FullName,
                                }
                            }
                        ]
                    })
                  }

            }).catch(err=>{
                  console.log("error from update rest ",err);
            
            })
        }catch(err){
                console.log("error from update rest ",err);
        }
    }
    console.log("restaurant in restreviews ",restaurant, "form", form);
    if(form.isOpen===false || !restaurant) return null;    
    return (
        <div className="crr003-main-wrap">
            <div className="crr003-close-wrap">
                <span className="crr003-close-button"
                onClick={(e)=>{
                    dispatch(closeForm({
                        formName : "reviews",
                        data:null,
                    }))
                
                }}
                >X</span>
            </div>
                  <div className="crr003-add-review-wrap">
                    <button type="button" className="crr003-add-review-button">
                      <span className="crr003-add-review-button-text"
                      onClick={
                        (e)=>{
                           var x = document.getElementById("crr003-add-review-form-wrap");
                            x.classList.toggle("Hide");
                        }
                      }
                      >Add Review</span>
                      </button>
                      <div className="crr003-add-review-form-wrap Hide"
                      id="crr003-add-review-form-wrap"
                      >
                        <div className="crr003-add-review-form-inner-wrap">
                          <div className="crr003-add-review-form-input-wrap">
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                className="crr003-add-review-form-input"
                                value={newReview.name}
                                onChange={(e)=>{
                                    setNewReview({
                                        ...newReview,
                                        name:e.target.value
                                    })
                                }}

                                sx={{
                                    marginBottom:2,
                                    marginTop:2
                                }}
                            />
                          </div>
                          <div className="crr003-add-review-form-input-wrap">
                            <TextField
                                id="outlined-basic"
                                label="Review"
                                variant="outlined"
                                className="crr003-add-review-form-input"
                                value={newReview.text}
                                onChange={(e)=>{
                                    setNewReview({
                                        ...newReview,
                                        text:e.target.value
                                    })
                                }}
                                sx={{
                                    marginBottom:2,
                                    marginTop:2
                                }}
                            />
                          </div>
                          <div className="crr003-add-review-form-input-wrap">
                            <Rating
                            name="simple-controlled"
                            value={newReview.rating}
                            onChange={(e)=>{
                                setNewReview({
                                    ...newReview,
                                    rating:e.target.value
                                })
                            
                            }}
                            sx={{
                                marginBottom:2,
                                marginTop:2
                            }}
                            />
                          </div>
                          <div className="crr003-add-review-form-input-wrap">
                            <button type="button" className="crr003-add-review-form-submit-button"
                            onClick={(e)=>{
                                updateRestReviews()
                            }}
                            >
                              <span className="crr003-add-review-form-submit-button-text">Submit</span>
                            </button>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="crr003-reviews-list-wrap">
                    {
                        restaurant.reviews.map((review)=>{
                            return (
                            <div className="crr003-review-wrap">
                                <div className="crr003-review-user-wrap">
                                <span className="crr003-review-user-name">{review.name}</span>
                                <Rating
                                                name="simple-controlled"
                                                value={review.rating/1}
                                                readOnly
                                />
                                </div>
                                <div className="crr003-review-text-wrap">
                                <span className="crr003-review-text">{review.text}</span>
                                </div>
                            </div>
                            )
                        })
                    }
                  </div>
        </div>
    )
}

export default Restreviews