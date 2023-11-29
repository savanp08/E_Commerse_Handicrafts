import { TextField } from "@mui/material";
import React ,{useState,useEffect} from "react";
import { user_initialSchema } from "../../Data/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './this.css';
import { addCheckout } from "../../Store/Slices/Checkout/Checkout";

const Checkout = () => {

    const [displayAddress, setDisplayAddress] = useState({
        ...user_initialSchema.location,
        mobile:""
    });
    const [Address  , setAddress] = useState("");
    const checkout = useSelector(state=>state.checkout);
    const [restaurant, setRestaurant] = useState(null);
    const [orderType, setOrderType] = useState("delivery"); 
     const params = useParams();
     const restId = params.id;
     const dispatch= useDispatch();
     const [cardDetails, setCardDetails] = useState({
            cardNumber:"",
            cardHolderName:"",
            cvv:"",
            expiryDate:""
     })
     const user = useSelector(state=>state.user)
     const navigate = useNavigate();
     var total=0;
     try{
      total=((checkout.total/1) + (8/100)*(checkout.total/1) + 5).toFixed(2);
     }catch(err){
          console.log("error in checkout page ",err);
      
     }
    useEffect(()=>{
        async function fetchOneRest(){
            console.log("restId in restaurant page ",restId);
            await axios.get("/Restaurant/getOne/"+restId)
            .then(res=>{
                console.log("response from get one restaurant ",res);
                if(res.status===200){
                    setRestaurant(res.data);
                   
                   if(res.data && res.data.location){
                    var add="";
                    if(res.data.location.street1) add+=res.data.location.street1;
                    if(res.data.location.street2) add+=" "+res.data.location.street2;
                    if(res.data.location.apartment) add+=" "+res.data.location.apartment;
                    if(res.data.location.city) add+=" "+res.data.location.city;
                    if(res.data.location.state) add+=" "+res.data.location.state;
                    if(res.data.location.zipCode) add+=" "+res.data.location.zipCode;
                    setAddress(add);
                   }
                }
                
            }).catch(err=>{
                console.log("error from get one restaurant ",err);
            })
        }
        
     fetchOneRest() 
    },[])

    function validateLuhnAlgorithm(cardNumber) {
        var regExp = /^[0-9]{16}$/;
        if (!regExp.test(cardNumber)) return false;
        return true;
    }
    function validateMobile(mobile) {
        const mobilePattern = /^[0-9]{10}$/;
        return mobilePattern.test(mobile);
    }

    function detectCardType(cardNumber) {
        const patterns = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        };
    
        for (const cardType in patterns) {
            if (patterns[cardType].test(cardNumber)) {
                return cardType;
            }
        }
    
        return "Unknown";
    }
    function validateHolderName(name) {
        const namePattern = /^[a-zA-Z ]{2,30}$/;
        return namePattern.test(name);  
    }

    function validateExpirationDate(expirationMonth, expirationYear) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const currentMonth = (currentDate.getMonth() + 1).toString(); // January is 0
        expirationYear = expirationYear.toString();
        expirationMonth = parseInt(expirationMonth);
        expirationMonth+=1;
        expirationMonth = expirationMonth.toString();
        console.log("XXXXXX =>",expirationYear, expirationMonth,currentYear,currentMonth)
       if(expirationYear.length<4) return true;
        if (expirationYear > currentYear) {
            return true;
        } else if (expirationYear === currentYear && expirationMonth >= currentMonth) {
            return true;
        }
    
        return false;
    }
    function validateCVV(cvv) {
        const cvvPattern = /^[0-9]{3,4}$/;
        return cvvPattern.test(cvv);
    }

    async function handleCheckout(){
        let order = {
            restaurantId : restId,
            orderType : orderType,
            paymentDetails : cardDetails,
            address : displayAddress,
            orderDetails : checkout,
            data : checkout.data,
            date : new Date(),
            total: checkout.total
        }
        console.log("order in checkout page ",order)
        await axios.post("/Auth/updateOne",{
            ...user,
            OrderHistory : [...user.OrderHistory,order]
        }).then(res=>{
            console.log("response from update user ",res);
            if(res.status===200){
                dispatch(addCheckout({
                    data: order
                }))
                navigate("/Acknoledgemnt/"+orderType);
            }
        
        }).catch(err=>{
            console.log("error from update user ",err);
        })
    }

    console.log("checkout in checkout page ",checkout)
    return(
        <div className="pc17-main-wrap">
          <div className="pc17-title-wrap">
            <span className="pc17-title-text">Checkout</span>
          </div>
          <div className="pc17-content-wrap">
            <div className="pc17-content-location-main-wrap">
                <fieldset className="pc17-content-fieldset">
                    <legend className="pc17-content-fieldset-legend">Location</legend>
                    <div className="pc17-content-location-options-wrap">
                        <button className="pc17-content-location-option-button"
                        onClick={(e)=>{
                            setOrderType("delivery");
                        
                        }}
                        >
                            Delivery

                        </button>
                        <button className="pc17-content-location-option-button"
                        onClick={(e)=>{
                            setOrderType("pickup");
                        }}
                        >
                            Pickup
                        </button>
                    </div>
                    <div className={"pc17-content-location-address-wrap" + (orderType==="delivery"? "" : " Hide")}>
                        <div className="pc17-content-location-address-input-wrap">
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
                      label="County"
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
                        
                  <div className="carc23-item-location-box carc23-mobile">
                    <TextField
                      id="report-item-location-mobile"
                      label="Mobile Number"
                      variant="outlined"
                      required
                      error={displayAddress.mobile && validateMobile(displayAddress.mobile)? false : true}
                      value={displayAddress.mobile || ""}
                      helperText={displayAddress.mobile && validateMobile(displayAddress.mobile)? "" : "Invalid Mobile Number"}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          mobile: e.target.value,
                        })
                      }}
                    />
                  </div>
                   </div>
                   </div>
                </fieldset>

                <fieldset className={"pc17-content-fieldset"+ (orderType==="delivery"? " Hide" : "")}>
                    <legend className="pc17-content-fieldset-legend">
                        Pick Up Location
                    </legend>
                    <div className="pc17-content-pickup-location-wrap">
                        <span className="pc17-content-pickup-location-text">
                            {
                                restaurant && restaurant.location? (
                                   Address
                                ) : ""
                            }
                        </span>
                    </div>
                </fieldset>
            </div>
            <div className="pc17-content-order-details-main-wrap">
                <fieldset className="pc17-content-fieldset">
                    <legend className="pc17-content-fieldset-legend">
                        Order Details
                    </legend>
                    <div className="pc17-content-order-details-item-wrap">
                        <div className="pc17-content-order-details-item-name-wrap">
                            <span className="pc17-content-order-details-item-name-text">
                                Order Cost : 
                            </span>
                            <span className="pc17-content-order-details-item-name-text pc17-order-details-text-main">
                                {checkout.total}$
                                </span>

                        </div>
                        <div className="pc17-content-order-details-item-name-wrap">
                            <span className="pc17-content-order-details-item-name-text">
                                Taxes : 
                            </span>
                            <span className="pc17-content-order-details-item-name-text pc17-order-details-text-main">
                                {(8/100)*checkout.total}$
                                </span>

                        </div>
                        <div className="pc17-content-order-details-item-name-wrap">
                            <span className="pc17-content-order-details-item-name-text">
                                Delivery Charges : 
                            </span>
                            <span className="pc17-content-order-details-item-name-text pc17-order-details-text-main">
                                5$
                                </span>
                        </div>
                        <div className="pc17-content-order-details-item-name-wrap">
                            <span className="pc17-content-order-details-item-name-text">
                                Promo : 
                            </span>
                            <span className="pc17-content-order-details-item-name-text pc17-order-details-text-main">
                                {0}$
                                </span>

                        </div>
                        <div className="pc17-content-order-details-item-name-wrap">
                            <span className="pc17-content-order-details-item-name-text">
                                Total : 
                            </span>
                            <span className="pc17-content-order-details-item-name-text pc17-order-details-text-main">
                                {
                                total
                                }$
                                </span>

                        </div>
                    </div>
                </fieldset>
                </div>
                
                <div className="pc17-content-payment-main-wrap">
                    <fieldset className="pc17-content-fieldset">
                        <legend className="pc17-content-fieldset-legend">
                            Payment
                        </legend>
                        <div className="pc17-content-payment-input-wrap">
                            <div className="pc17-content-payment-input-box">
                                <TextField
                                id="report-item-location-zipCode"
                                label={"Card Number" +  (cardDetails.cardNumber.length>0? " (" + detectCardType(cardDetails.cardNumber) + ")" : "")}
                                error={ validateLuhnAlgorithm(cardDetails.cardNumber) ? false : true}
                                helperText={ validateLuhnAlgorithm(cardDetails.cardNumber) ? "" : "Invalid Card Number"}
                                variant="outlined"
                                required
                                onChange={(e)=>{
                                    setCardDetails({
                                        ...cardDetails,
                                        cardNumber: e.target.value
                                    })
                                
                                }}
                                sx={{
                                    minWidth: "230px",
                                }}
                                />
                            </div>
                            <div className="pc17-content-payment-input-box">
                                <TextField
                                id="report-item-location-zipCode"
                                label="Card Holder Name"
                                
                                variant="outlined"
                                required
                                sx={{
                                    minWidth: "230px",
                                }}
                                onChange={(e)=>{
                                    setCardDetails({
                                        ...cardDetails,
                                        cardHolderName: e.target.value
                                    })
                                
                                }}
                                error={cardDetails.cardHolderName && validateHolderName(cardDetails.cardHolderName)? false : true}
                                helperText={cardDetails.cardHolderName && validateHolderName(cardDetails.cardHolderName)? "" : "Invalid Card Holder Name"}
                                />
                            </div>
                            <div className="pc17-content-payment-input-box">
                                <TextField
                                id="report-item-location-zipCode"
                                label="CVV"
                                error={ validateCVV(cardDetails.cvv) ? false : true}
                                helperText={ validateCVV(cardDetails.cvv) ? "" : "Invalid CVV"}
                                variant="outlined"
                                required
                                type="password"
                                onChange={(e)=>{
                                    setCardDetails({
                                        ...cardDetails,
                                        cvv: e.target.value
                                    })
                                }}
                                sx={{
                                    minWidth: "230px",
                                }}
                                />
                            </div>
                            <div className="pc17-content-payment-input-box">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker 
                              format="MM/YYYY"
                                label="Expiry Date"
                                value={cardDetails.expiryDate}
                                onChange={(newValue) => {
                                  var date = new Date();
                                  var year = date.getFullYear();
                                  var month = date.getMonth()+1;
                                  console.log("SSSSSSSSSSSSSSSSSSSSSSS, ",newValue.$M,month,year,newValue.$y)
                                  if(!validateExpirationDate(newValue.$M,newValue.$y)) {
                                    var x= document.getElementById("pc17-expiry-date-helper-text");
                                    x.innerHTML="Invalid Expiry Date";
                                    return;
                                  }
                                  else{
                                    var x= document.getElementById("pc17-expiry-date-helper-text");
                                    x.innerHTML="";
                                  }
                                    console.log("new value ",newValue);
                                    setCardDetails({
                                        ...cardDetails,
                                        expiryDate: newValue.$M + "/" + newValue.$y
                                    })
                                }}
                              
                              />

                            </LocalizationProvider>
                            <span id="pc17-expiry-date-helper-text">

                            </span>
                                </div>
                               
                        </div>
                    </fieldset>
                </div>
                <span className="pc17-content-order-helper-text">
                    *All fields are mandatory
                </span>
            <div className="pc17-content-order-main-wrap">
                <button className="pc17-content-order-button"
                disabled={!(validateLuhnAlgorithm(cardDetails.cardNumber) && validateCVV(cardDetails.cvv) && validateHolderName(cardDetails.cardHolderName) && validateExpirationDate(cardDetails.expiryDate.split("/")[0],cardDetails.expiryDate.split("/")[1]) 
                &&  ((displayAddress.street2?.length>0 && displayAddress.city?.length>0 && displayAddress.state?.length>0 && displayAddress.zipCode?.length>0 && validateMobile(displayAddress.mobile)) || orderType!=="delivery")
    )}
    onClick={(e)=>{
        handleCheckout();
    }}
                >
                    Place Order
                </button>
                </div>
          </div>
        </div>
    )
}

export default Checkout;