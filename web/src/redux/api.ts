import axios from "axios";

// load ImageAPI

export const importImages = (r: __WebpackModuleApi.RequireContext) => {
  let images: any = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

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

// fetchProductsAPI

export const fetchProductsAPI = async (keyword: string) => {
  const response = await axios.get(`/api/products/${keyword}`);
  return response.data;
};
