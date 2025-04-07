import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { removeAlert, setAlert } from "../slices/alertSlice";
import { v4 as uuidv4 } from 'uuid';

const loadUser = createAsyncThunk("auth/loadUser", async (_, { rejectWithValue }) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token); 
    }

    try {
        const response = await axios.get("/api/auth");
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);  
    }
});

// Delete account
const deleteAccount = createAsyncThunk('profile/deleteAccount', async (_, { rejectWithValue , dispatch }) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            const res = await axios.delete('/api/profile');
    
            const successAlert = { msg: 'Your account has been permanently deleted!', id: uuidv4() };
    
            // Dispatch alert for success
            dispatch(setAlert(successAlert));

            setTimeout(() => {
                dispatch(removeAlert(successAlert.id));
            }, 5000)

            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
});

export { loadUser, deleteAccount };