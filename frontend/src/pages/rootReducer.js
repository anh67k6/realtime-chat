import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "../redux/slices/app";
import authReducer from "../redux/slices/auth"
import conversationReducer from "../redux/slices/conversation";

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    // whitelist: [],
    // blacklist: [],
};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    conversation: conversationReducer,
});

export { rootPersistConfig, rootReducer };
