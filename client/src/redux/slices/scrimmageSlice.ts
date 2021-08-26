import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IScrimmage } from "../../interfaces/Scrimmages";

// Creates a thunk which wraps our async calls for redux.
export const fetchScrimmages = createAsyncThunk(
  "scrimmage/getScrimmage",
  async () => await axios
  .get(process.env.REACT_APP_BACKEND_URL + "/scrimmage" || "http://localhost:3001/scrimmage")
  .then((res: { data: any }) => res.data)
);

export const fetchScrimmageById = createAsyncThunk(
  "scrimmage/getScrimmageById",
  async (scrimmageid: number) => await axios
  .get(process.env.REACT_APP_BACKEND_URL + `/scrimmage/${scrimmageid}` || "http://localhost:3001/scrimmage")
  .then((res: { data: any }) => {
    return res.data
  })
);


export const createScrimmage = createAsyncThunk(
  "scrimmage/createScrimmage",
  async (formData: IScrimmage) => await axios
  .post(process.env.REACT_APP_BACKEND_URL + "/scrimmage" || "http://localhost:3001/scrimmage", formData)
  .then((res: { data: any }) => res.data)
);


// Slice: Handles actions and reducers at the same time.
export const scrimmageSlice = createSlice({
  // Name of state and initial state
  name: "scrimmage",
  initialState: {
    status: "",
    error: "",
    scrimmages: [{
      scrimmageid: 0,
      userid: 0,
      region: "",
      date: "",
      time: "",
      bestOf: "",
      team1Name: "",
      team2Name: "",
      player1: "",
      puuid1: "",
      player2: "",
      puuid2: "",
      player3: "",
      puuid3: "",
      player4: "",
      puuid4: "",
      player5: "",
      puuid5: "",
      player6: "",
      puuid6: "",
      player7: "",
      puuid7: "",
      player8: "",
      puuid8: "",
      player9: "",
      puuid9: "",
      player10: "",
      puuid10: "",
      player1info: {},
      
    }],
  },

  // All reducer functions
  reducers: {},

  extraReducers: (builder) => {
   
    //CREATING
    builder.addCase(createScrimmage.fulfilled, (state, action,) => {
      state.scrimmages = [action.payload, ...state.scrimmages];
    });
    builder.addCase(createScrimmage.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });

    //GETTING ONE
    builder.addCase(fetchScrimmageById.fulfilled, (state, { payload }) => {
      let nextState = payload
      state.scrimmages = nextState
    });
    
    builder.addCase(fetchScrimmageById.rejected, (state, action: any) => {
      console.log("ERROR ON FETCH SCRIMMAGE BY ID")
      if (action.payload) {
        state.error = action.payload.errorMessage;
        console.log("PAYLOAD MESSAGE: ", action.payload.errorMessage)
      } else {
        state.error = action.error;
        console.log("ERROR: ", state.error)
      }
    });


    //GETTING ALL  
    builder.addCase(fetchScrimmages.fulfilled, (state, { payload }) => {
      state.status = "resolved";
      state.scrimmages = payload
    });

    builder.addCase(fetchScrimmages.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default scrimmageSlice.reducer;
