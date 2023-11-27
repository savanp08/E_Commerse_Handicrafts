import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addRest:{
        isOpen: false,
        data:null,
        
    },
    addProd:{
        isOpen: false,
        data:null,
    },
    editRest:{
        isOpen: false,
        data:null,
    },
    editProd:{
        isOpen: false,
        data:null,
    },
    
    editUserDetails:{
        isOpen: false,
        data:null,
    },
    reviews:{
        isOpen: false,
        data:null,
    }
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        openForm: (state, action) => {
            state[action.payload.formName].isOpen = true;
            state[action.payload.formName].data = action.payload.data;
        },
        closeForm: (state, action) => {
            state[action.payload.formName].isOpen = false;
            state[action.payload.formName].data = action.payload.data;
        },
    }
});

export const { openForm, closeForm } = formSlice.actions;

export default formSlice.reducer;

