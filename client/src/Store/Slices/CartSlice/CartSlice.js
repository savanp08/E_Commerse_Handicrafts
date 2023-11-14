import { createSlice } from "@reduxjs/toolkit";
import { cart_initialState } from "../../../Data/Schemas";

const initialState = cart_initialState;
const cartSlice = createSlice({
    initialState,
    name:'cart',
    reducers:{
        addCart : (state,action) => {
        
            return action.payload;
        },
        removeCart : (state,action) => {
            return initialState
        }
    }

})

export const {
    addCart,
    removeCart
} = cartSlice.actions;

export default cartSlice.reducer;