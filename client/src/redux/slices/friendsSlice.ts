import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ISeen {
  userid: number,
  friendid: number
  topicid: number
}

// Creates a thunk which wraps our async calls for redux.
export const checkFriends = createAsyncThunk(
  "friends/fetchNewTopicsList",
  async (userid: number) => await axios
  .get(process.env.REACT_APP_BACKEND_URL + "/friend/check" || "http://localhost:3001/friend/check",
  {
    headers: {
      userid: userid,
    },
  })
  .then((res: { data: any }) => res.data)
);

export const markSeen = createAsyncThunk(
  "friends/markSeen",
  async (data: ISeen) => await axios
  .put(process.env.REACT_APP_BACKEND_URL + '/friend/seen',
    {
      userid: data.userid,
      topicid: data.topicid,
      friendid: data.friendid
    }
  ).then((res: {data: any}) => res.data)
);

// Slice: Handles actions and reducers at the same time.
export const friendSlice = createSlice({
  // Name of state and initial state
  name: "friends",
  initialState: {
    status: "",
    error: "",
    added: false,
    removed: false,
    newPosts: [],
  },

  // All reducer functions
  reducers: {},

  // Will create fetchUserInfo action that can be used via dispatch
  extraReducers: (builder) => {
    builder.addCase(checkFriends.fulfilled, (state, { payload }) => {
      state.status = "resolved";
      state.newPosts = payload
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(checkFriends.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(markSeen.fulfilled, (state, { payload }) => {
      state.status = "resolved";
      // TODO: NOT TESTED
      state.newPosts = state.newPosts.filter(topicid => topicid !== payload.id)
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(markSeen.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default friendSlice.reducer;