import { createSlice } from "@reduxjs/toolkit";
import { getCurrentProfile, getProfiles, getProfileById, getGithubRepos, createOrUpdateProfile, addExperience, addEducation, deleteExperience, deleteEducation } from "../thunks/profileThunks";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile: (state) => {
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // getCurrentProfile
            .addCase(getCurrentProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(getCurrentProfile.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // getProfiles
            .addCase(getProfiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.profiles = action.payload;
                state.loading = false;
            })
            .addCase(getProfiles.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // getProfileById
            .addCase(getProfileById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // getGithubRepos
            .addCase(getGithubRepos.fulfilled, (state, action) => {
                state.repos = action.payload;
                state.loading = false;
            })
            .addCase(getGithubRepos.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // createOrUpdateProfile
            .addCase(createOrUpdateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrUpdateProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(createOrUpdateProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // addExperience
            .addCase(addExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.profile.experience = action.payload;
                state.loading = false;
            })
            .addCase(addExperience.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // addEducation
            .addCase(addEducation.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEducation.fulfilled, (state, action) => {
                state.profile.education = action.payload;
                state.loading = false;
            })
            .addCase(addEducation.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // deleteExperience
            .addCase(deleteExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                if (state.profile) {
                    state.profile.experience = state.profile.experience.filter(
                        (exp) => exp._id !== action.meta.arg
                    );
                }
                state.loading = false;
            })
            .addCase(deleteExperience.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // deleteEducation
            .addCase(deleteEducation.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEducation.fulfilled, (state, action) => {
                if (state.profile) {
                    state.profile.education = state.profile.education.filter(
                        (edu) => edu._id !== action.meta.arg
                    );
                }
                state.loading = false;
            })
            .addCase(deleteEducation.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
