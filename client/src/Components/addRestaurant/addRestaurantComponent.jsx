import { TextField } from "@mui/material";
import react, { useState } from "react";
import { restaurant_initialState } from "../../Data/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "../../Store/Slices/FormSlice/FormSlice";
import axios from "axios";


const AddRestaurantComponent = () =>{

    const [restaurant, setRestaurant] = useState(restaurant_initialState);
    const [displayAddress, setDisplayAddress] = useState(restaurant_initialState.location);
    const form = useSelector(state=>state.form.addRest);
    const dispatch = useDispatch();
    async function addRestToDB(){
        await axios.post("/Restaurant/addRestaurant",{
            ...restaurant,
            restaurantName : displayAddress.street2 + " " + displayAddress.street1 + " " + displayAddress.apartment 
            + " " + displayAddress.city + " " + displayAddress.state + " " + displayAddress.zipCode,
            location: displayAddress,
        }).then(res=>{
            console.log("response from adding rest ",res);
            if(res.status===200){
                dispatch(closeForm({
                    formName: "addRest",
                    isOpen: false,
                }))
            }
        
        }).catch(err=>{
            console.log("error from adding rest ",err);
        
        })
    }
    if(form.isOpen === false) return(<div></div>)
    return(
        <div className="carc23-main-wrap">
            <div className="carc23-close-button-wrap">
                <button className="carc23-close-button"
                onClick={(e)=>{
                    setDisplayAddress(restaurant_initialState.location);
                    setRestaurant(restaurant_initialState);
                    dispatch(closeForm({
                        formName: "addRest",
                        isOpen: false,
                    }))
                }}
                >X</button>
            </div>
            <div className="carc23-title-wrap">
                <span className="carc23-title">Add Restaurant</span>
            </div>
            <div className="carc23-form-wrap">
                <fieldset className="carc23-fieldset-wrap">
                    <legend className="carc23-legend">Restaurant Location</legend>
                    
                </fieldset>
                <div className="carc23-item-location-box carc23-street">
                    <TextField
                      id="report-item-location-street1"
                      label="Street1"
                      variant="outlined"
                      value={displayAddress.street1 || ""}
                      required
                      sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          street1: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="carc23-item-location-box carc23-street">
                    <TextField
                      id="report-item-location-street2"
                      label="Street2"
                      variant="outlined"
                      value={displayAddress.street2 || ""}
                      required
                      sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          street2: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="carc23-item-location-box carc23-apartment">
                    <TextField
                      id="report-item-location-county"
                      label="county"
                      variant="outlined"
                      value={displayAddress.apartment || ""}
                      sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          apartment: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="carc23-item-location-box carc23-city">
                    <TextField
                      id="report-item-location-city"
                      label="City"
                      variant="outlined"
                      required
                      value={displayAddress.city || ""}
                      sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          city: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="carc23-item-location-box carc23-state">
                    <TextField
                      id="report-item-location-state"
                      label="State"
                      variant="outlined"
                      required
                      value={displayAddress.state || ""}
                      sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          state: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="carc23-item-location-box carc23-pincode">
                    <TextField
                      id="report-item-location-pinCode"
                      label="Pin Code"
                      variant="outlined"
                      required
                      value={displayAddress.zipCode || ""}
                      sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          zipCode: e.target.value,
                        })
                      }}
                    />
                  </div>
            </div>
            <div className="carc23-submit-button-wrap">
                <button className="carc23-submit-button"
                id="carc23-add-rest-submit-button"
                onClick={(e)=>{
                    addRestToDB();
                }}
                >Add</button>
                </div>
        </div>
    )
}

export default AddRestaurantComponent;