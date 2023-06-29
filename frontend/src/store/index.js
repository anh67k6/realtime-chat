import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";
import chatReducer from "./chat/chat.reducer";

export function makeStore(){
    return configureStore({
        reducer : {
            auth : authReducer,
            chat : chatReducer
        }
    })
}

const store = makeStore();

export default store;