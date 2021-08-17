import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  deleteUserAPI,
  getUserDetailAPI,
  listUserAPI,
  loginAPI,
  registerAPI,
  updateUserAPI,
  updateUserProfileAPI,
} from "./api";
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
  deleteUser: {
    success: boolean;
  };
  updateUser: {
    success: boolean;
  };
  users: UserType[] | [];
  user: UserType | null;
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
  deleteUser: {
    success: false,
  },
  updateUser: {
    success: false,
  },
  users: [],
  user: null,
};

export const login = createAsyncThunk("user/login", loginAPI);
export const register = createAsyncThunk("user/register", registerAPI);
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  updateUserProfileAPI
);
export const fetchUsers = createAsyncThunk("user/list", listUserAPI);
export const deleteUser = createAsyncThunk("user/delete", deleteUserAPI);
export const updateUser = createAsyncThunk("user/update", updateUserAPI);
export const fetchUserDetail = createAsyncThunk(
  "user/detail",
  getUserDetailAPI
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
    clearSuccess: (state) => {
      state.deleteUser.success = false;
      state.updateUser.success = false;
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
      })
      // List All User
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteUser.success = true;
      })
      // Update User
      .addCase(updateUser.fulfilled, (state) => {
        state.updateUser.success = true;
      })
      // Get User Detail
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { togglePanel, logout, clearSuccess } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
