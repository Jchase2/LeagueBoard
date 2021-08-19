import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "../../api/profileAPI";
import { IUser } from "../../interfaces";

export const fetchUserInfo = createAsyncThunk<IUser>(
  "user/getUser",
  async () => await getUserInfo()
);

export const userSlice = createSlice({
  // Name of state and initial state
  name: "user",
  initialState: {
    status: "",
    error: "",
    userState: {
      email: "",
      password: "",
    },
  },

  // All reducer functions
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.userState = payload;
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

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
