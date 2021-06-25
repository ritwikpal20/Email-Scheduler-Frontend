import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "./slices/authSlice";

const reducer = {
    auth: authReducer,
};

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
