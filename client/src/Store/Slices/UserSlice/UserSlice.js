import { createSlice } from "@reduxjs/toolkit";
import { user_initialSchema } from "../../../Data/Schemas";


const initialState = user_initialSchema;
const userSlice = createSlice({
    initialState,
    name:'user',
    reducers:{
        addUser : (state,action) => {
            return {...action.payload}
        },
        removeUser : (state,action) =>{
            return {...initialState}
        }

    }
})

export const {
    addUser,
    removeUser
} = userSlice.actions;

export default userSlice.reducer
