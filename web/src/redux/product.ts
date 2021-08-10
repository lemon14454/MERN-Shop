import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { fetchProductsAPI } from "./api";
import { ProductType } from "./types";

export interface ProductState {
  productList: {
    loading: boolean;
    products: ProductType[];
    page: number;
    pages: number;
  };
}

interface PayloadProps {
  products: ProductType[];
  page: number;
  pages: number;
}

const initialState: ProductState = {
  productList: {
    loading: false,
    products: [],
    page: 1,
    pages: 1,
  },
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  fetchProductsAPI
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productList.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<PayloadProps>) => {
          state.productList.loading = false;
          state.productList.products = action.payload.products;
          state.productList.page = action.payload.page;
          state.productList.pages = action.payload.pages;
        }
      );
  },
});

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
