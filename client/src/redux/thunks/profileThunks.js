import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeAlert, setAlert } from "../slices/alertSlice";
import { clearProfile } from '../slices/profileSlice';
import { v4 as uuidv4 } from 'uuid';

// Get current users profile
const getCurrentProfile = createAsyncThunk('profile/getCurrentProfile', async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.get('/api/profile/me');
        return res.data;
    } catch (err) {
        dispatch(clearProfile())
        return rejectWithValue(err.response.data);
    }
});

// Get all profiles
const getProfiles = createAsyncThunk('profile/getProfiles', async (_, { rejectWithValue, dispatch }) => {
    dispatch(clearProfile());

    try {
        const res = await axios.get('/api/profile');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Get profile by ID
const getProfileById = createAsyncThunk('profile/getProfileById', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Get Github repos
const getGithubRepos = createAsyncThunk('profile/getGithubRepos', async (username, { rejectWithValue }) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Create or update profile
const createOrUpdateProfile = createAsyncThunk('profile/createOrUpdateProfile', async ({ formData, navigate, isEdit }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.post('/api/profile', formData, config);

            const successAlert = { msg: isEdit ? 'Profile Updated' : 'Profile Created', alertType: 'success', id: uuidv4() };

            // Dispatch alert for success
            dispatch(setAlert(successAlert));

            setTimeout(() => {
                dispatch(removeAlert(successAlert.id));
            }, 5000)

            // Redirect if not editing
            if (!isEdit) {
                navigate('/dashboard');
            }

            return res.data;
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    const newAlert = { id: uuidv4(), msg: error.msg, alertType: "danger" };
                    dispatch(setAlert(newAlert));
                    setTimeout(() => {
                        dispatch(removeAlert(newAlert.id));
                    }, 5000);
                });
            }

            return rejectWithValue(err.response.data);
        }
    }
);

// Add Experience
const addExperience = createAsyncThunk('profile/addExperience', async ({ formData, navigate }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.put('/api/profile/experience', formData, config);

            const successAlert = { msg: 'Experience Added', alertType: 'success', id: uuidv4() };

            // Dispatch alert for success
            dispatch(setAlert(successAlert));

            setTimeout(() => {
                dispatch(removeAlert(successAlert.id));
            }, 5000)

            navigate('/dashboard');

            return res.data;
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    const newAlert = { id: uuidv4(), msg: error.msg, alertType: "danger" };
                    dispatch(setAlert(newAlert));
                    setTimeout(() => {
                        dispatch(removeAlert(newAlert.id));
                    }, 5000);
                });
            }

            return rejectWithValue(err.response.data);
        }
    }
);

// Add Education
const addEducation = createAsyncThunk('profile/addEducation', async ({ formData, navigate }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.put('/api/profile/education', formData, config);

            const successAlert = { msg: 'Education Added', alertType: 'success', id: uuidv4() };

            // Dispatch alert for success
            dispatch(setAlert(successAlert));

            setTimeout(() => {
                dispatch(removeAlert(successAlert.id));
            }, 5000)

            navigate('/dashboard');

            return res.data;
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    const newAlert = { id: uuidv4(), msg: error.msg, alertType: "danger" };
                    dispatch(setAlert(newAlert));
                    setTimeout(() => {
                        dispatch(removeAlert(newAlert.id));
                    }, 5000);
                });
            }

            return rejectWithValue(err.response.data);
        }
    }
);

// Delete experience
const deleteExperience = createAsyncThunk('profile/deleteExperience', async ( id , { rejectWithValue , dispatch }) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        const successAlert = { msg: 'Experience Removed', alertType: 'success', id: uuidv4() };

        // Dispatch alert for success
        dispatch(setAlert(successAlert));

        setTimeout(() => {
            dispatch(removeAlert(successAlert.id));
        }, 5000)

        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Delete education
const deleteEducation = createAsyncThunk('profile/deleteEducation', async ( id , { rejectWithValue , dispatch }) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        const successAlert = { msg: 'Education Removed', alertType: 'success', id: uuidv4() };

        // Dispatch alert for success
        dispatch(setAlert(successAlert));

        setTimeout(() => {
            dispatch(removeAlert(successAlert.id));
        }, 5000)

        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export { getCurrentProfile, getProfiles, getProfileById, getGithubRepos, createOrUpdateProfile, addExperience, addEducation, deleteExperience, deleteEducation };