import { createSlice } from "@reduxjs/toolkit";


const initialState = "";
const searchSlice = createSlice({
    initialState,
    name:'search',
    reducers:{
        addSearch : (state,action) => {
            return action.payload;
        },
        removeSearch : (state,action) => {
            return initialState
        }
    }

})

export const {
    addSearch,
    removeSearch
} = searchSlice.actions;

export default searchSlice.reducer;