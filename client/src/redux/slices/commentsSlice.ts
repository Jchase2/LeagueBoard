import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Creates a thunk which wraps our async calls for redux.
export const fetchComments = createAsyncThunk(
  "comments/getComments",
  async (parentid: number) => axios
      .get(process.env.REACT_APP_BACKEND_URL + `/topics/comments/${parentid}` || `http://localhost:3001/topics/comments/${parentid}`)
      .then((res: { data: any }) => res.data)
);

// Slice: Handles actions and reducers at the same time.
export const commentsSlice = createSlice({
  // Name of state and initial state
  name: "comments",
  initialState: {
    status: "",
    error: "",
    comments: [{
      id: 0,
      title: "",
      text: "",
      userid: 0,
      parentid: 0,
      closed: false,
      created_at: "",
      parenttitle: ""
    }],
  },

  // All reducer functions
  reducers: {},

  // Will create fetchUserInfo action that can be used via dispatch
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      let nextState = [...payload]
      state.comments = nextState
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(fetchComments.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default commentsSlice.reducer;