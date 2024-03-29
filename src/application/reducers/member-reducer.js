import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/axios/axios";

const memberSelectors = {
  fetchMember: (state) => state.members.getMember,
  registerMember: (state) => state.members.registerMember,
  editMember: (state) => state.members.editMember,
};

const fetchMember = createAsyncThunk(
  "get/members",
  async (param, { getState }) => {
    const token = getState()?.auth.token;
    const localtoken = localStorage.getItem("token");
    const response = await api.members.fetchMember(param, localtoken);
    return response;
  }
);

const registerMember = createAsyncThunk(
  "post/member",
  async (memberData, { getState }) => {
    const token = getState()?.auth.token;
    const localtoken = localStorage.getItem("token");
    const response = await api.members.registerMember(memberData, localtoken);
    return response;
  }
);

const editMember = createAsyncThunk(
  "post/member/edit",
  async (memberData, { getState }) => {
    const token = getState()?.auth.token;
    const localtoken = localStorage.getItem("token");
    const response = await api.members.editMember(memberData, localtoken);
    return response;
  }
);

const initialState = {
  getMember: {
    loading: false,
    data: [],
    error: "",
  },
  registerMember: {
    loading: false,
    data: [],
    error: "",
  },
  editMember: {
    loading: false,
    data: [],
    error: "",
  },
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMember.pending, (state) => {
        state.getMember.loading = true;
        state.getMember.error = initialState.getMember.error;
      })
      .addCase(fetchMember.fulfilled, (state, { payload }) => {
        state.getMember.loading = false;
        state.getMember.data = payload?.data;
      })
      .addCase(fetchMember.rejected, (state, { error }) => {
        state.getMember.loading = false;
        state.getMember.error = error.message;
      })
      .addCase(registerMember.pending, (state) => {
        state.registerMember.loading = true;
        state.registerMember.error = initialState.registerMember.error;
      })
      .addCase(registerMember.fulfilled, (state, { payload }) => {
        state.registerMember.loading = false;
        state.registerMember.data = payload?.data;
      })
      .addCase(registerMember.rejected, (state, { error }) => {
        state.registerMember.loading = false;
        state.registerMember.error = error.message;
      })
      .addCase(editMember.pending, (state) => {
        state.editMember.loading = true;
        state.editMember.error = initialState.editMember.error;
      })
      .addCase(editMember.fulfilled, (state, { payload }) => {
        state.editMember.loading = false;
        state.editMember.data = payload?.data;
      })
      .addCase(editMember.rejected, (state, { error }) => {
        state.editMember.loading = false;
        state.editMember.error = error.message;
      });
  },
});

const membersActions = membersSlice.actions;
export {
  memberSelectors,
  fetchMember,
  registerMember,
  editMember,
  membersActions,
};
export default membersSlice.reducer;
