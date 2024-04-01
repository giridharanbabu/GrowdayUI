import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/axios/axios";

const authSelectors = {
  authToken: (state) => state.auth.token,
  loginCall: (state) => state.auth.login,
  registerCall: (state) => state.auth.register,
  verifyEmail: (state) => state.auth.verifyEmail,
};

const saveLogin = createAsyncThunk("post/login/details", async (param) => {
  console.log(param, "calling from save login");
  const response = await api.auth.saveLogin(param);
  return response;
});
const saveRegister = createAsyncThunk(
  "post/register/details",
  async (param) => {
    const response = await api.auth.saveRegister(param);
    return response;
  }
);
const verifyEmail = createAsyncThunk("get/email/details", async (param) => {
  const response = await api.auth.verifyEmail(param);
  return response;
});

const initialState = {
  token: "",
  login: {
    loading: false,
    data: {},
    error: "",
  },
  register: {
    loading: false,
    data: {},
    error: "",
  },
  verifyEmail: {
    loading: false,
    data: {},
    error: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      window !== "undefined" ? window.localStorage.removeItem("token") : null;
      // localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveLogin.pending, (state) => {
        state.login.loading = true;
        state.login.error = initialState.login.error;
      })
      .addCase(saveLogin.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = payload?.data;
        state.token = payload?.data?.access_token;
        window !== "undefined"
          ? window.localStorage.setItem("token", payload?.data?.access_token)
          : null;

        // localStorage.setItem("token", payload?.data?.access_token);
      })
      .addCase(saveLogin.rejected, (state, { error }) => {
        state.login.loading = false;
        state.login.error = error.message;
      })
      .addCase(saveRegister.pending, (state) => {
        state.register.loading = true;
        state.register.error = initialState.register.error;
      })
      .addCase(saveRegister.fulfilled, (state, { payload }) => {
        state.register.loading = false;
        state.register.data = payload?.data;
        state.token = payload?.data?.access_token;
      })
      .addCase(saveRegister.rejected, (state, { error }) => {
        state.register.loading = false;
        state.register.error =
          error.message === "Request failed with status code 409"
            ? "Account already exist"
            : error.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmail.loading = true;
        state.verifyEmail.error = initialState.verifyEmail.error;
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.verifyEmail.loading = false;
        state.verifyEmail.data = payload?.data;
        window !== "undefined"
          ? window.localStorage.setItem("token", payload?.data?.access_token)
          : null;
      })
      .addCase(verifyEmail.rejected, (state, { error }) => {
        state.verifyEmail.loading = false;
        state.verifyEmail.error = error.message;
      });
  },
});

const authActions = authSlice.actions;

export { authSelectors, authActions, saveLogin, saveRegister, verifyEmail };

export default authSlice.reducer;
