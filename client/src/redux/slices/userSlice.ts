import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../api/profileAPI";

// Creates a thunk which wraps our async calls for redux.
export const fetchUserInfo = createAsyncThunk(
  "user/getUser",
  async () => await getUserInfo()
);


// Slice: Handles actions and reducers at the same time.
// TODO: Expand userState to be more than email and pw.
// Check out topicSlice for example. Also may end up needing
// to remove IUser from the createAsyncThunk above, same as
// topicsSlice.
export const userSlice = createSlice({
  // Name of state and initial state
  name: "user",
  initialState: {
    status: "",
    error: "",
    userState: {
      created_at: "",
      email: "",
      iconid: 0,
      id: 0,
      password: "",
      puuid: "",
      regionid: 0,
      summoner_name: "",
      updatedAt: ""
    },
  },

  // All reducer functions
  reducers: {},

  // Will create fetchUserInfo action that can be used via dispatch
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.userState = payload
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(fetchUserInfo.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default userSlice.reducer