import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
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
      toast.success("您已順利登出");
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
        toast.success("您已登入成功");
      })
      .addCase(login.rejected, (state) => {
        state.login.error = "信箱或密碼錯誤";
      })
      // register Builder
      .addCase(register.fulfilled, (state) => {
        state.register.error = "";
        state.panel = "login";
        toast.success("您已註冊成功");
      })
      .addCase(register.rejected, (state) => {
        state.register.error = "資料格式錯誤";
      })
      // Update User Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.login.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        toast.success("您已成功更新資料");
      })
      // List All User
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteUser.success = true;
        toast.success("您已成功刪除使用者");
      })
      // Update User
      .addCase(updateUser.fulfilled, (state) => {
        toast.success("您已成功更新使用者");
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
