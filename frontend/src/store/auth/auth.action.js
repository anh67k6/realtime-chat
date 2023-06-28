import {createAsyncThunk} from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
    'auth/login',
    async({name, email, password, passwordConfirm}, {rejectWithValue})=> {
        try {
            const config = {
                headers : {
                    "Content-Type": "application/json",
                }
            };
            const response = await axios.post('users/login',{
                name, email, password, passwordConfirm
            },config);

            if(response.success){
                return response;
            }

            return rejectWithValue(response.message);
        } catch (error) {
            console.log(error);
        }
    }
)