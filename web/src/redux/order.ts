import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { createOrderAPI } from "./api";
import { OrderType } from "./types";

export interface OrderState {
  createdOrder: {
    order: OrderType | null;
  };
  // all order
  orderList: {
    orders: OrderType[] | null;
  };
  // by id
  order: {
    order: OrderType | null;
  };
}

const initialState: OrderState = {
  createdOrder: { order: null },
  orderList: { orders: null },
  order: { order: null },
};

export const createOrder = createAsyncThunk("order/create", createOrderAPI);

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCreatedOrder: (state) => {
      state.createdOrder.order = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.createdOrder.order = action.payload;
    });
  },
});

export const { clearCreatedOrder } = OrderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default OrderSlice.reducer;
