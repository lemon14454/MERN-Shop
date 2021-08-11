import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  createProductAPI,
  deleteProductAPI,
  fetchProductByIdAPI,
  fetchProductsAPI,
  updateProductAPI,
} from "./api";
import { ProductType } from "./types";

export interface ProductState {
  productList: {
    loading: boolean;
    products: ProductType[];
    page: number;
    pages: number;
  };
  productDetail: {
    loading: boolean;
    product: ProductType | null;
  };
  productDelete: {
    loading: boolean;
    success: boolean;
  };
  productCreate: {
    loading: boolean;
    success: boolean;
    product: ProductType | null;
  };
  productUpdate: {
    loading: boolean;
    success: boolean;
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
  productDetail: {
    loading: false,
    product: null,
  },
  productDelete: {
    loading: false,
    success: false,
  },
  productCreate: {
    loading: false,
    success: false,
    product: null,
  },
  productUpdate: {
    loading: false,
    success: false,
  },
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  fetchProductsAPI
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProduct",
  fetchProductByIdAPI
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  deleteProductAPI
);

export const createProduct = createAsyncThunk(
  "product/create",
  createProductAPI
);

export const updateProduct = createAsyncThunk(
  "product/update",
  updateProductAPI
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    successClear: (state) => {
      state.productCreate.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch All Products
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
      )
      // fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.productDetail.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.product = action.payload!;
      })
      // delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.productDelete.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.productDelete.loading = false;
        state.productDelete.success = true;
      })
      // create Product
      .addCase(createProduct.pending, (state) => {
        state.productCreate.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productCreate.loading = false;
        state.productCreate.success = true;
        state.productCreate.product = action.payload;
      })
      // update Product
      .addCase(updateProduct.pending, (state) => {
        state.productUpdate.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.productUpdate.loading = false;
        state.productUpdate.success = true;
      });
  },
});

export const { successClear } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
