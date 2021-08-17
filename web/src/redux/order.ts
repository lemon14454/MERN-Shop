import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  createOrderAPI,
  deliverOrderAPI,
  getOrderDetailsAPI,
  listAllOrdersAPI,
  listMyOrdersAPI,
  payOrderAPI,
} from "./api";
import { OrderType } from "./types";

export interface OrderState {
  createdOrder: {
    order: OrderType | null;
  };
  // all order
  orderList: {
    orders: OrderType[] | [];
    success: boolean;
  };
  // by id
  order: {
    order: OrderType | null;
  };
}

const initialState: OrderState = {
  createdOrder: { order: null },
  orderList: { orders: [], success: false },
  order: { order: null },
};

export const createOrder = createAsyncThunk("order/create", createOrderAPI);
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrder",
  getOrderDetailsAPI
);
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  listAllOrdersAPI
);
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  listMyOrdersAPI
);
export const setPayment = createAsyncThunk("order/setPay", payOrderAPI);
export const setDeliver = createAsyncThunk("order/setDeliver", deliverOrderAPI);

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCreatedOrder: (state) => {
      state.createdOrder.order = null;
    },
    clearOrderSuccess: (state) => {
      state.orderList.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // create Order
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createdOrder.order = action.payload;
      })
      // get Order Detail
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order.order = action.payload;
      })
      // set paid
      .addCase(setPayment.fulfilled, (state, action) => {
        state.order.order = action.payload;
        state.orderList.success = true;
      })
      // set deliver
      .addCase(setDeliver.fulfilled, (state, action) => {
        state.order.order = action.payload;
        state.orderList.success = true;
      })
      // get Orders
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderList.orders = action.payload;
      })
      // get My Orders
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orderList.orders = action.payload;
      });
  },
});

export const { clearCreatedOrder, clearOrderSuccess } = OrderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default OrderSlice.reducer;
