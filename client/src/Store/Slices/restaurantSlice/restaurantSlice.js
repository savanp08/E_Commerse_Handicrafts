import { createSlice } from "@reduxjs/toolkit";
import { restaurant_initialState } from "../../../Data/Schemas";

const initialState = restaurant_initialState;
const restaurantSlice = createSlice({
    initialState,
    name:'restaurant',
    reducers:{
        addRestaurant : (state,action) => {
            return {...action.payload}
        },
        removeRestaurant : (state,action) => {
            return {...initialState}
        }
    }

})

export const {
    addRestaurant,
    removeRestaurant
} = restaurantSlice.actions;

export default restaurantSlice.reducer;