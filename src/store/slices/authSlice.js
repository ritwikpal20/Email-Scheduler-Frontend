import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    email: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser(state, action) {
            state = { ...state, ...action.payload };
        },
        logoutUser(state) {
            state = initialState;
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
