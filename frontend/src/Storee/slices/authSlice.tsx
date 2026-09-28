import { createSlice } from "@reduxjs/toolkit";
const initialState = {
     user:null,
     isAuthenticated:false,
     loading:false,
     error:null,
     accessToken:null
};

export const authSlice = createSlice({
name:"auth",
initialState,
reducers:{
    setUser:(state,action)=>{
        state.user = action.payload;
        state.isAuthenticated = true
    },
    setAccessToken:(state,action)=>{
        state.accessToken = action.payload;
        
    },
    logout:(state)=>{
        state.user = null;
        state.accessToken= null;
        state.isAuthenticated=false;
    }
},

});

export const { setUser, setAccessToken, logout} = authSlice.actions;
export default authSlice.reducer;