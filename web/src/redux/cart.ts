import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { addToCartAPI } from "./api";
import { CartItemType, ShipAddressType } from "./types";

export interface CartState {
  CartItems: CartItemType[] | [];
  shippingAddress: ShipAddressType;
  paymentMethod: "信用卡" | "貨到付款";
  step: 1 | 2 | 3 | 4;
}

const cartFromStorage: CartItemType[] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : [];

const shippingAddressFromStorage: ShipAddressType = localStorage.getItem(
  "shippingAddress"
)
  ? JSON.parse(localStorage.getItem("shippingAddress")!)
  : { address: "", city: "", postalCode: "", country: "" };

const initialState: CartState = {
  CartItems: cartFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: "貨到付款",
  step: 1,
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
    setAddress: (
      state,
      action: PayloadAction<{ address: ShipAddressType }>
    ) => {
      state.shippingAddress = action.payload.address;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    clearAddress: (state) => {
      state.shippingAddress = {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };
      localStorage.removeItem("shippingAddress");
    },
    setPaymentMethod: (state, action: PayloadAction<"信用卡" | "貨到付款">) => {
      state.paymentMethod = action.payload;
    },
    nextStep: (state) => {
      if (state.step < 4) state.step += 1;
    },
    lastStep: (state) => {
      if (state.step > 1) state.step -= 1;
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

export const {
  removeFromCart,
  clearCart,
  setAddress,
  clearAddress,
  changeQty,
  nextStep,
  lastStep,
  setPaymentMethod,
} = CartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default CartSlice.reducer;
