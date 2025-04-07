import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './redux/slices/alertSlice';
import authReducer from './redux/slices/authSlice';
import profileReducer from './redux/slices/profileSlice';
import postReducer from './redux/slices/postSlice';

const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        profile: profileReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', 
});

export default store; 