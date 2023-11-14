import { createSlice } from "@reduxjs/toolkit";
import { admin_initialSchema } from "../../../Data/Schemas";


const initialState = admin_initialSchema;
const adminSlice = createSlice({
    initialState,
    name:'admin',
    reducers:{
        addAdmin : (state,action) => {
            return action.payload
        },
        removeAdmin : (state,action) =>{
            return initialState
        }

    }
})

export const {
    addAdmin,
    removeAdmin
} = adminSlice.actions;

export default adminSlice.reducer
