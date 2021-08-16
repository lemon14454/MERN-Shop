import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from "../redux/product";
import userReducer from "../redux/user";
import cartReducer from "../redux/cart";
import orderReducer from "../redux/order";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
