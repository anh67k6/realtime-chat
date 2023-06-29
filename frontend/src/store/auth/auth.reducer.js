import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./auth.action";

const initialState = {
    loading : false,
    userInfo : {},
    userToken : null,
    error : null,
    success: false,
    validateLoading : false,
    validateSuccess : false,
    validateError : false,
    isSocketConnected : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    extraReducers : {
        // register user
    [signupUser.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [signupUser.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userInfo = payload.data.user;
        state.userToken = payload.data.token;
      },
      [signupUser.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      },
  
      // Login user
      [loginUser.pending]: (state) => {
        state.validateSuccess = false;
        state.validateError = null;
        state.validateLoading = false;
        state.loading = true;
        state.error = null;
      },
      [loginUser.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userInfo = payload.data.user ? payload.data.user : null;
        state.userToken = payload.token;
      },
      [loginUser.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      },
    }
})

export default authSlice.reducer;