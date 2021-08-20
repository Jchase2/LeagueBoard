import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITopic } from "../../interfaces";

// Creates a thunk which wraps our async calls for redux.
export const fetchForumTopics = createAsyncThunk(
  "topics/getTopics",
  async () => await axios
  .get(process.env.REACT_APP_BACKEND_URL + "/topics" || "http://localhost:3001/topics")
  .then((res: { data: any }) => res.data)
);

export const deleteForumTopic = createAsyncThunk(
  "topics/deleteTopics",
  async (topicid: number) => axios
    .delete(process.env.REACT_APP_BACKEND_URL + `/topics/${topicid}` || `http://localhost:3001/topics/${topicid}`)
    .then((res: { data: any }) => res.data)
);

export const createNewTopic = createAsyncThunk(
  "topics/createNewTopic",
  async (formData: ITopic) => axios
  .post(
    process.env.REACT_APP_BACKEND_URL + "/topics" ||
      "http://localhost:3000/topics",
    {
      "title": formData.title,
      "text": formData.text,
      "userid": formData.userid,
      "closed": formData.closed,
      "parentid": formData.parentid
    }
  )
  .then((res: { data: any }) => res.data)
  .catch((err) => console.log(err))
);

// Slice: Handles actions and reducers at the same time.
export const topicSlice = createSlice({
  // Name of state and initial state
  name: "topics",
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
      state.status = "resolved";
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
    builder.addCase(createNewTopic.fulfilled, (state, action,) => {
      state.topics = [action.payload, ...state.topics];
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(createNewTopic.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(deleteForumTopic.fulfilled, (state, action,) => {
      console.log("payload: ", action.payload)
      state.topics = state.topics.filter((topic) => topic.id !== action.payload.id)
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(deleteForumTopic.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default topicSlice.reducer;