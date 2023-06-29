import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../axios';

export const signupUser = createAsyncThunk(
    "auth/register",
    async({name, email, password, passwordConfirm}, {rejectWithValue}) => {
        try {
            const config = {
                headers : {
                    "Content-Type": "application/json"
                }
            };

            const respone = await axiosInstance.post("/signup",
            {name, email, password, passwordConfirm},
            config);

            console.log(respone);
            if(!respone.data.success){
                return rejectWithValue(respone.message);
            }

            return respone.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              } else {
                return rejectWithValue(error.message);
              }
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ name, email, password, passwordConfirm }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axiosInstance.post(
          "/login",
          { name, email, password, passwordConfirm },
          config
        );

        if (response.data.success) {
          return response.data;
        }

        return rejectWithValue(response.message);
      } catch (error) {
        // if (error.response && error.response.data.message) {
        //   return rejectWithValue(error.response.data.message);
        // } else {
        //   return rejectWithValue(error.message);
        // }
        console.log(error)
      }
    }
  );