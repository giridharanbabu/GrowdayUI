import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/axios/axios";

const commonSelectors = {
  isSideBarOpen: (state) => state.common.sideBar,
  isModalOpen: (state) => state.common.isModalOpen,
};

const initialState = {
  sideBar: true,
  isModalOpen: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateSideBar: (state, action) => {
      state.sideBar = action.payload;
    },
    updateModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  //   extraReducers: {},
});

const commonActions = commonSlice.actions;

export { commonActions, commonSelectors };

export default commonSlice.reducer;
