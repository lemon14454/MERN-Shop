import axios from "axios";
import { ProductType, UserType } from "./types";

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

  try {
    const { data } = await axios.post(
      `/api/users/login`,
      { email: email, password: password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
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

interface UpdateUserProps {
  user: UserType;
  token: string;
}

export const updateUserProfileAPI = async ({
  user,
  token,
}: UpdateUserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
