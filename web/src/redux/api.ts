import axios from "axios";
import {
  CartItemType,
  OrderItemType,
  ProductType,
  ShipAddressType,
  UserType,
} from "./types";

// load ImageAPI

export const importImages = (r: __WebpackModuleApi.RequireContext) => {
  let images: any = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

// upload ImageAPI

export const uploadImages = async (files: HTMLInputElement["files"]) => {
  const file = files![0];
  const formData = new FormData();
  formData.append("image", file as any);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await axios.post("/api/upload", formData, config);
  const image = data.split("/")[4];
  return image;
};

// -----------------------Users-------------------------

// LoginAPI

interface LoginData {
  email: string;
  password: string;
}

export const loginAPI = async ({ email, password }: LoginData) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { data } = await axios.post(
    `/api/users/login`,
    { email: email, password: password },
    config
  );

  return data;
};

// RegisterAPI

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerAPI = async ({ name, email, password }: RegisterData) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { data } = await axios.post(
    "/api/users/register/",
    { name: name, email: email, password: password },
    config
  );

  return data;
};

// userDetailAPI

interface UserDetailProps {
  id: string;
  token: string;
}

export const userDetailAPI = async ({ id, token }: UserDetailProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`/api/users/${id}`, config);
  return data;
};

// updateUserAPI

export const updateUserProfileAPI = async (user: UserType) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const { data } = await axios.put(`/api/users/profile`, user, config);
  return data;
};

// listUserAPI
export const listUserAPI = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`/api/users`, config);

  return data;
};

// deleteUserAPI
interface DeleteUserProps {
  id: string;
  token: string;
}

export const deleteUserAPI = async ({ id, token }: DeleteUserProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`/api/users/${id}`, config);
};

// updateUserAPI
interface UpdateUserProps {
  user: UserType;
  token: string;
}

export const updateUserAPI = async ({ user, token }: UpdateUserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`/api/users/${user._id}`, user, config);
  return data;
};

// -----------------------Products-------------------------

// fetchProductsAPI
interface ProductQuery {
  keyword?: string;
  pageNumber?: string;
}

export const fetchProductsAPI = async ({
  keyword = "",
  pageNumber = "",
}: ProductQuery) => {
  const { data } = await axios.get(
    `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
  );
  return data;
};

// fetchProductByIdAPI
export const fetchProductByIdAPI = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

// Delete Product
interface DeleteProductProps {
  id: string;
  token: string;
}

export const deleteProductAPI = async ({ id, token }: DeleteProductProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`/api/products/${id}`, config);
};

// Create Product
export const createProductAPI = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`/api/products`, {}, config);
  return data;
};

// Update Product
interface UpdateProductProps {
  product: ProductType;
  token: string;
}

export const updateProductAPI = async ({
  product,
  token,
}: UpdateProductProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `/api/products/${product._id}`,
    product,
    config
  );

  return data;
};

// ----------------------- Cart -------------------------
interface AddToCartProps {
  id: string;
  qty: number;
}

export const addToCartAPI = async ({ id, qty }: AddToCartProps) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const item: CartItemType = {
    _id: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    stock: data.stock,
    qty,
  };

  return item;
};

// ----------------------- Order -------------------------

// createOrder
interface createOrderProps {
  order: {
    orderItems: OrderItemType[];
    paymentMethod: "貨到付款" | "信用卡";
    shippingAddress: ShipAddressType;
    totalPrice: number;
  };
  token: string;
}

export const createOrderAPI = async ({ order, token }: createOrderProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`/api/orders`, order, config);

  return data;
};

// getOrderDetailByID
interface getOrderDetailsProps {
  id: string;
  token: string;
}

export const getOrderDetailsAPI = async ({
  id,
  token,
}: getOrderDetailsProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`/api/orders/${id}`, config);

  return data;
};

// pay Order
interface payOrderProps {
  id: string;
  token: string;
  paymentResult: any;
}

export const payOrderAPI = async ({
  id,
  token,
  paymentResult,
}: payOrderProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `/api/orders/${id}/pay`,
    paymentResult,
    config
  );

  return data;
};

// deliver Order
interface deliverOrderProps {
  id: string;
  token: string;
}

export const deliverOrderAPI = async ({ id, token }: deliverOrderProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

  return data;
};

// list My Orders
export const listMyOrdersAPI = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`/api/orders/myorders`, config);

  return data;
};

// list All Orders
export const listAllOrdersAPI = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`/api/orders`, config);

  return data;
};
