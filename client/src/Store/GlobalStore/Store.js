import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Slices/CartSlice/CartSlice";
import ProductSlice from "../Slices/ProductSlice/ProductSlice";
import restaurantSlice from "../Slices/restaurantSlice/restaurantSlice";
import userSlice from "../Slices/UserSlice/UserSlice";
import adminSlice from "../Slices/UserSlice/adminSlice";
import FormSlice from "../Slices/FormSlice/FormSlice";
import searchSlice from "../Slices/FilterSlice/FilterSlice";
import Checkout from "../Slices/Checkout/Checkout";

const store = configureStore({
    reducer:{
        cart:CartSlice,
        product:ProductSlice,
        restaurant:restaurantSlice,
        user : userSlice,
        admin : adminSlice,
        form : FormSlice,
        search : searchSlice,
        checkout: Checkout
    }
});

export default store;