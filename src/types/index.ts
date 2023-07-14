export type ProductType = {
  id: number;
  title: String;
  description: String;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: String;
  category: String;
  thumbnail: String;
  images: String[];
};

export type CheckoutType = {
  id: number;
  qty: number;
};
