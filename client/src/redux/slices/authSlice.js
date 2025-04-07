import { createSlice } from "@reduxjs/toolkit";
import { loadUser, deleteAccount } from "../thunks/authThunks";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
};

const authReducers = {
    authSuccess: (state, action) => {
        localStorage.setItem("token", action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        };
    },
    authFail: (state) => {
        localStorage.removeItem("token");
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        };
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerSuccess: authReducers.authSuccess,
        registerFail: authReducers.authFail,
        loginSuccess: authReducers.authSuccess,
        loginFail: authReducers.authFail,
        logout: authReducers.authFail
    },
    extraReducers: (builder) => {
        builder
            // loadUser
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // deleteAccount
            .addCase(deleteAccount.fulfilled, (state) => {
                localStorage.removeItem("token");
                state.token = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.user = null;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { registerSuccess, registerFail, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
