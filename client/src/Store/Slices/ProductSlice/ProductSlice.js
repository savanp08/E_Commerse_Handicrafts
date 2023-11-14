import { createSlice } from "@reduxjs/toolkit";
import { product_initialState } from "../../../Data/Schemas";

const initialState = product_initialState;
const productSlice = createSlice({
    initialState,
    name:'product',
    reducers:{
        addProduct : (state,action) => {
            return {...action.payload}
        },
        removeProduct : (state,action) => {
            return {...initialState}
        }
    }

})

export const {
    addProduct,
    removeProduct
} = productSlice.actions;

export default productSlice.reducer;