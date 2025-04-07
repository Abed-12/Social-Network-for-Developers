import { createSlice } from "@reduxjs/toolkit";
import { getPosts, addLike, removeLike, deletePost, addPost, getPost, addComment, deleteComment } from "../thunks/postThunks";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getPosts
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getPost
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.post = action.payload;
                state.loading = false;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addPost
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
                state.loading = false;
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deletePost
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addLike
            .addCase(addLike.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => post._id === action.payload.id ?
                { ...post, likes: action.payload.likes } : post);
                state.loading = false;
            })
            .addCase(addLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // removeLike
            .addCase(removeLike.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => post._id === action.payload.id ?
                { ...post, likes: action.payload.likes } : post);
                state.loading = false;
            })
            .addCase(removeLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addComment
            .addCase(addComment.fulfilled, (state, action) => {
                state.post = { ...state.post, comments: action.payload };
                state.loading = false;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteComment
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.post = { ...state.post, comments: state.post.comments.filter((comment) => comment._id !== action.payload.commentId) };
                state.loading = false;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default postSlice.reducer;
