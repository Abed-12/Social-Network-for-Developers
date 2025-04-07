import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { removeAlert, setAlert } from "../slices/alertSlice";
import { v4 as uuidv4 } from 'uuid';

// Get posts
const getPosts = createAsyncThunk('post/getPosts', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get('/api/posts');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Add like
const addLike = createAsyncThunk('post/addLike', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        return { id, likes: res.data };
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Remove like
const removeLike = createAsyncThunk('post/removeLike', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        return { id, likes: res.data };
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Delete post
const deletePost = createAsyncThunk('post/deletePost', async (id, { rejectWithValue, dispatch }) => {
    try {
        await axios.delete(`/api/posts/${id}`);

        const successAlert = { msg: 'Post Removed', alertType: 'success', id: uuidv4() };

        // Dispatch alert for success
        dispatch(setAlert(successAlert));

        setTimeout(() => {
            dispatch(removeAlert(successAlert.id));
        }, 5000)

        return { id };
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Add post
const addPost = createAsyncThunk('post/addPost', async (formData, { rejectWithValue, dispatch }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config);

        const successAlert = { msg: 'Post Created', alertType: 'success', id: uuidv4() };

        dispatch(setAlert(successAlert));

        setTimeout(() => {
            dispatch(removeAlert(successAlert.id));
        }, 5000)

        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Get post
const getPost = createAsyncThunk('post/getPost', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Add comment
const addComment = createAsyncThunk('post/addComment', async ({postId, formData}, { rejectWithValue, dispatch }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        const successAlert = { msg: 'Comment Added', alertType: 'success', id: uuidv4() };

        dispatch(setAlert(successAlert));

        setTimeout(() => {
            dispatch(removeAlert(successAlert.id));
        }, 5000)

        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Delete comment
const deleteComment = createAsyncThunk('post/deleteComment', async ({postId, commentId}, { rejectWithValue, dispatch }) => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        const successAlert = { msg: 'Comment Removed', alertType: 'success', id: uuidv4() };

        dispatch(setAlert(successAlert));

        setTimeout(() => {
            dispatch(removeAlert(successAlert.id));
        }, 5000)

        return { commentId };
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export { getPosts, addLike, removeLike, deletePost, addPost, getPost, addComment, deleteComment };