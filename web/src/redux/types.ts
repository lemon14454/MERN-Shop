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

export type CartItemType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  qty: number;
};

export type ShipAddressType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type handleChangeType = {
  (e: React.ChangeEvent<any>): void;
  <T = string | React.ChangeEvent<any>>(
    field: T
  ): T extends React.ChangeEvent<any>
    ? void
    : (e: string | React.ChangeEvent<any>) => void;
};
