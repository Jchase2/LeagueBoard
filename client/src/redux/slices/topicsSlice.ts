import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Creates a thunk which wraps our async calls for redux.
export const fetchForumTopics = createAsyncThunk(
  "topics/getTopics",
  async () => await axios
  .get(process.env.REACT_APP_BACKEND_URL + "/topics" || "http://localhost:3001/topics")
  .then((res: { data: any }) => res.data)
);


// Slice: Handles actions and reducers at the same time.
export const topicSlice = createSlice({
  // Name of state and initial state
  name: "user",
  initialState: {
    status: "",
    error: "",
    topics: [{
      userid: 0,
      title: "",
      text: "",
      closed: false,
      parentid: 0,
      id: 0,
      parenttitle: "",
      created_at: "",
      updated_at: ""
    }],
  },

  // All reducer functions
  reducers: {},

  // Will create fetchUserInfo action that can be used via dispatch
  extraReducers: (builder) => {
    builder.addCase(fetchForumTopics.fulfilled, (state, { payload }) => {
      console.log("payload: ", payload)
      state.topics = payload
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(fetchForumTopics.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default topicSlice.reducer;