import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    total:0,
    restaurantId:null,
    products:[],
    data:null,
}
const checkoutSlice = createSlice({
    initialState,
    name:'checkout',
    reducers:{
        addCheckout : (state,action) => {
        
            return action.payload;
        },
        removeCheckout : (state,action) => {
            return initialState
        }
    }

})

export const {
    addCheckout,
    removeCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;