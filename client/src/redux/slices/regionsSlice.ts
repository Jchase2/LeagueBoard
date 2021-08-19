import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRegions } from "../../api/api";

export const fetchRegions = createAsyncThunk(
  "regions/getRegions",
  async () => await getRegions()
);

export const regionSlice = createSlice({
  // Name of state and initial state
  name: "regions",
  initialState: {
    status: "",
    error: "",
    regionState: {
      id: 0,
      code: "",
      name: "",
      created_at: "",
      updatedAt: "",
    },
  },

  // All reducer functions
  reducers: {},

  // Will create fetchUserInfo action that can be used via dispatch
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.fulfilled, (state, { payload }) => {
      state.regionState = payload;
    });
    // TODO: Fix any on action. Should probably be type of fetchUserInfo
    builder.addCase(fetchRegions.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default regionSlice.reducer;
