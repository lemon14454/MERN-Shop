import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToCartAPI } from "./api";
import { CartItemType, ShipAddressType } from "./types";

export interface CartState {
  CartItems: CartItemType[] | null;
  shipAddress: ShipAddressType | null;
}

const cartFromStorage: CartItemType[] | null = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : null;

const shipAddressFromStorage: ShipAddressType | null = localStorage.getItem(
  "shipAddress"
)
  ? JSON.parse(localStorage.getItem("shipAddress")!)
  : null;

const initialState: CartState = {
  CartItems: cartFromStorage,
  shipAddress: shipAddressFromStorage,
};

export const addToCart = createAsyncThunk("cart/add", addToCartAPI);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.CartItems = state.CartItems?.filter((x) => x._id !== id)!;
      localStorage.setItem("cart", JSON.stringify(state.CartItems));
    },
    clearCart: (state) => {
      state.CartItems = null;
      localStorage.removeItem("cart");
    },
    clearAddress: (state) => {
      state.shipAddress = null;
      localStorage.removeItem("shipAddress");
    },
  },
  extraReducers: (builder) => {
    builder
      // CART
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existItem = state.CartItems?.find((x) => x._id === item._id);

        if (existItem) {
          state.CartItems = state.CartItems?.map((x) =>
            x._id === existItem._id ? item : x
          )!;
        } else {
          state.CartItems = [...state.CartItems!, item];
        }
      });
  },
});
