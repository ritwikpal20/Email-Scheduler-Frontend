import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    email: null,
    name: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser(state, action) {
            state = { ...state, ...action.payload };
            return state;
        },
        logoutUser(state) {
            state = initialState;
            return state;
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
