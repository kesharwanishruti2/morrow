import { createSlice } from "@reduxjs/toolkit";
const storedToken = localStorage.getItem("accessToken");
let storedUser = null;
try {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    storedUser = JSON.parse(userJson);
  }
} catch {
  storedUser = null;
}

const initialState = {
     user: storedUser,
     isAuthenticated: Boolean(storedToken),
     loading: false,
     error: null,
     accessToken: storedToken
};

export const authSlice = createSlice({
name:"auth",
initialState,
reducers:{
    setUser:(state,action)=>{
        state.user = action.payload;
        state.isAuthenticated = true;
        if (action.payload) {
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
    },
    setAccessToken:(state,action)=>{
        state.accessToken = action.payload;
        if (action.payload) {
            localStorage.setItem("accessToken", action.payload);
        }
    },
    logout:(state)=>{
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    }
},
});

export const { setUser, setAccessToken, logout} = authSlice.actions;
export default authSlice.reducer;