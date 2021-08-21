import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getUserMatches,
  updateUserMatches,
} from "../../api/profileAPI";

export const setMatches = createAsyncThunk("matches/setMatches", async () => {
  const user = await getUserInfo();
  return await updateUserMatches(user.puuid);
});

export const fetchMatches = createAsyncThunk("matches/getMatches", async () => {
  const user = await getUserInfo();
  return await getUserMatches(user.puuid);
});

export const matchSlice = createSlice({
  // Name of state and initial state
  name: "matches",
  initialState: {
    error: "",
    set: false,
    matchState: [{
        id: 0,
        puuid: "",
        match1: {},
        match2: {},
        match3: {},
        match4: {},
        match5: {},
        match6: {},
        match7: {},
        match8: {},
        match9: {},
        match10: {},
        created_at: "",
        updatedAt: "",
    }],
  },

  // All reducer functions
  reducers: {},

  // Will create fetchUserInfo action that can be used via dispatch
  extraReducers: (builder) => {
    builder.addCase(fetchMatches.fulfilled, (state, { payload }) => {
      state.matchState = payload;
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(fetchMatches.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(setMatches.fulfilled, (state, action) => {
      state.set = true;
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(setMatches.rejected, (state, action: any) => {
      if (action.payload) {
        console.log("Error");
        state.error = action.payload.errorMessage;
      } else {
        console.log("Error");
        state.error = action.error;
      }
    });
  },
});

export default matchSlice.reducer;
