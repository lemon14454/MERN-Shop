export type ProductType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};
