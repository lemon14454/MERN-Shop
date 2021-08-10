import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { loginAPI, registerAPI } from "./api";
import { UserType } from "./types";

export interface UserState {
  panel: "none" | "login" | "register";
  login: {
    loading: boolean;
    userInfo: UserType | null;
    error: string;
  };
  register: {
    loading: boolean;
    error: string;
  };
}

const userInfoFromStorage: UserType | null = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const initialState: UserState = {
  panel: "none",
  login: {
    loading: false,
    userInfo: userInfoFromStorage,
    error: "",
  },
  register: {
    loading: false,
    error: "",
  },
};

export const login = createAsyncThunk("user/login", loginAPI);
export const register = createAsyncThunk("user/register", registerAPI);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    togglePanel: (
      state,
      action: PayloadAction<"none" | "login" | "register">
    ) => {
      state.panel = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.login.userInfo = initialState.login.userInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      // login Builder
      .addCase(login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.loading = false;
        state.panel = "none";
        state.login.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.error.message!;
      })
      // register Builder
      .addCase(register.pending, (state) => {
        state.register.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.register.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.error.message!;
      });
  },
});

export const { togglePanel, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
