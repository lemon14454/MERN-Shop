import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { addToCartAPI } from "./api";
import { CartItemType, ShipAddressType } from "./types";

export interface CartState {
  CartItems: CartItemType[] | [];
  shipAddress: ShipAddressType | null;
}

const cartFromStorage: CartItemType[] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : [];

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
    changeQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const { id, qty } = action.payload;
      const item = state.CartItems?.find((x) => x._id === id);
      state.CartItems = state.CartItems?.map((x) =>
        x._id === id ? { ...item!, qty } : x
      )!;
      localStorage.setItem("cart", JSON.stringify(state.CartItems));
    },
    clearCart: (state) => {
      state.CartItems = [];
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
            x._id === existItem._id ? { ...item, qty: x.qty + item.qty } : x
          )!;
        } else {
          state.CartItems = [...state.CartItems!, item];
        }
        localStorage.setItem("cart", JSON.stringify(state.CartItems));
      });
  },
});

export const { removeFromCart, clearCart, clearAddress, changeQty } =
  CartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default CartSlice.reducer;
