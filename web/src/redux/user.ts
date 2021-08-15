import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { loginAPI, registerAPI, updateUserProfileAPI } from "./api";
import { UserType } from "./types";

export interface UserState {
  panel: "none" | "login" | "register";
  login: {
    userInfo: UserType | null;
    error: string;
  };
  register: {
    error: string;
  };
}

const userInfoFromStorage: UserType | null = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const initialState: UserState = {
  panel: "none",
  login: {
    userInfo: userInfoFromStorage,
    error: "",
  },
  register: {
    error: "",
  },
};

export const login = createAsyncThunk("user/login", loginAPI);
export const register = createAsyncThunk("user/register", registerAPI);
export const updateUserProfile = createAsyncThunk(
  "user/update",
  updateUserProfileAPI
);

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
      .addCase(login.fulfilled, (state, action) => {
        state.panel = "none";
        state.login.userInfo = action.payload;
        state.login.error = "";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state) => {
        state.login.error = "信箱或密碼錯誤";
      })
      // register Builder
      .addCase(register.fulfilled, (state) => {
        state.register.error = "";
        state.panel = "login";
      })
      .addCase(register.rejected, (state) => {
        state.register.error = "資料格式錯誤";
      })
      // Update User Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.login.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      });
  },
});

export const { togglePanel, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
