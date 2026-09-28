import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    selectedProduct:null,
    loading:false,
    error:null,
    accessToken:null,
}

export const productSlice = createSlice({
   name: "product",
  initialState,
  reducers: {},

})
export default productSlice.reducer;