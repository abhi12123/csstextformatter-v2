import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name : 'styles',
    initialState : {
        value : {}
    },
    reducers:{
        addStyle : (state,action) => {
            const {property, value} = action.payload;
            state.value = {...state.value, [property]:value}
        },
        removeStyle : (state, action) => {
            const {property} = action.payload;
            let dupValue = {...state.value};
            delete dupValue[property];
            state.value = dupValue;
        },
        removeAllStyles : (state) => {
            state.value = {};
        }
    }
})

export const {addStyle, removeStyle, removeAllStyles} = reducer.actions;
export default reducer.reducer