import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.tsx"
import productReducer from "./slices/productslice.tsx"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        product: productReducer,

    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;