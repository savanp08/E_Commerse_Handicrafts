import { TextField } from "@mui/material";
import react, { useEffect, useState } from "react";
import { restaurant_initialState } from "../../Data/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "../../Store/Slices/FormSlice/FormSlice";
import axios from "axios";
import './This.css';
import Autocomplete from '@mui/material/Autocomplete';
import { typesOfEstablishment } from "../../Data/Options";

const EditRestaurantComponent = () =>{

    const [restaurant, setRestaurant] = useState(restaurant_initialState);
    const [displayAddress, setDisplayAddress] = useState(restaurant_initialState.location);
    const form = useSelector(state=>state.form.editRest);
    const rest = useSelector(state=>state.restaurant);
    const dispatch = useDispatch();
    async function addRestToDB(){
        await axios.post("/Restaurant/editRestaurant",{
            ...restaurant,
            location: displayAddress,
            name:displayAddress.street2 + " " + displayAddress.street1 + " " + displayAddress.apartment 
            + " " + displayAddress.city + " " + displayAddress.state + " " + displayAddress.zipCode,
        }).then(res=>{
            console.log("response from adding rest ",res);
            if(res.status===200){
                dispatch(closeForm({
                    formName: "editRest",
                    isOpen: false,
                }))
            }
        
        }).catch(err=>{
            console.log("error from adding rest ",err);
        
        })
    }
     useEffect(()=>{
         if(rest && rest._id){
            setRestaurant(rest);
            setDisplayAddress(rest.location)
         }
     },[rest])
     
    if(form.isOpen === false) return(<div></div>)
    return(
        <div className="carc23-main-wrap">
            <div className="carc23-close-button-wrap">
                <button className="carc23-close-button"
                onClick={(e)=>{
                    setDisplayAddress(restaurant_initialState.location);
                    setRestaurant(restaurant_initialState);
                    dispatch(closeForm({
                        formName: "editRest",
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
                    <div className="carc23-item-name-box">
                    <TextField
                    id="restaurant-name"
                    label="Restaurant Name"
                    variant="outlined"
                    required
                    value={restaurant.restaurantName|| ""}
                    sx={{
                        minWidth: "230px",
                        marginBottom: "18px",
                        marginLeft: "20px",
                    }}
                    onChange={(e) => {
                        setRestaurant({
                        ...restaurant,
                        restaurantName: e.target.value,
                        })
                    }}
                    />
                    </div>
                </fieldset>
                <fieldset className="carc23-fieldset-wrap">
                    <legend className="carc23-legend">Restaurant Location</legend>
                    <Autocomplete
                    multiple
                    id="addReport-item-color"
                    options={typesOfEstablishment}
                    disableCloseOnSelect
                    value={restaurant.types}
                    limitTags={3}
                    onChange={(e, values) => {
                      setRestaurant({
                        ...restaurant,
                        types: values,
                      });
                    }}
                    renderInput={(params) => {
                      const { InputProps, ...restParams } = params;
                      const { startAdornment, ...restInputProps } = InputProps;
                      return (
                        <TextField
                          label="Types of Establishment"
                          {...restParams}
                          InputProps={{
                            ...restInputProps,
                            startAdornment: (
                              <div
                                style={{
                                  maxHeight: "70px",
                                  overflowY: "auto",
                                  minWidth: "230px",
                                }}
                                sx={{
                                  minWidth: "230px",
                                }}
                              >
                                {startAdornment}
                              </div>
                            ),
                          }}
                        />
                      );
                    }}
                  />
                </fieldset>
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
                      id="report-item-location-apartment"
                      label="county"
                      variant="outlined"
                      value={displayAddress.apartment || ""}
                      sx={{
                        minWidth: "230px",
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
                      id="report-item-location-State"
                      label="State"
                      variant="outlined"
                      required
                      value={displayAddress.state || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          state: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="carc23-item-location-box carc23-zipCode">
                    <TextField
                      id="report-item-location-zipCode"
                      label="Pin Code"
                      variant="outlined"
                      required
                      value={displayAddress.zipCode || ""}
                      sx={{
                        minWidth: "230px",
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
                id="carc23-edit-rest-submit-button"
                onClick={(e)=>{
                    addRestToDB();
                }}
                >Edit</button>
                </div>
        </div>
    )
}

export default EditRestaurantComponent;