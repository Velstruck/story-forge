import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state,action)=>{
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state)=>{
            state.status = false;
     }
    }
})

export default authSlice.reducer;
export const {login,logout} = authSlice.actions;

//post ka slice bhi bana skte hai