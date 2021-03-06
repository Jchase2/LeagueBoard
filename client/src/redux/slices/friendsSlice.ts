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

export const checkAdds = createAsyncThunk(
  "friends/fetchNewAdds",
  async (userid: number) => axios.get(
    process.env.REACT_APP_BACKEND_URL + "/friend/checkaddedby" || "http://localhost:3000/friend/checkaddedby",
    {
      headers: {
        userid: userid
      }
    }
  ).then((res: { data: any }) => res.data)
  .catch((err) => console.log(err))
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

export const markFriendHasSeen = createAsyncThunk(
  "friends/markFriendSeen",
  async (data: any) => await axios
  .put(
    process.env.REACT_APP_BACKEND_URL + "/friend/hasseen" ||
      "http://localhost:3000/friend/hasseen",
    {
      userid: data.userid,
      friendid: data.friendid,
    }
  )
  .then((res: { data: any }) => res.data)
  .catch((err) => console.log(err))
);


export const clearNotifications = createAsyncThunk(
  "friends/clearNotifications",
  async (userid: number) => await axios
  .delete(process.env.REACT_APP_BACKEND_URL + '/friend/clear',
    {
     data: {
       userid: userid
     }
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
    friendAdds: []
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
    builder.addCase(checkAdds.fulfilled, (state, { payload }) => {
      state.status = "resolved";
      state.friendAdds = payload
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(checkAdds.rejected, (state, action: any) => {
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
    builder.addCase(markFriendHasSeen.fulfilled, (state, { payload }) => {
      state.status = "resolved";
      state.friendAdds = state.friendAdds.filter((friend) => friend !== payload.userid)
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(markFriendHasSeen.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(clearNotifications.fulfilled, (state, { payload }) => {
      state.status = "resolved";
      state.newPosts = [];
      state.friendAdds = [];
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(clearNotifications.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default friendSlice.reducer;