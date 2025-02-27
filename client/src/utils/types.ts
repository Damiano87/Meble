export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  likes: number;
  trendy: boolean;
  title: string;
  description: string;
  images: string[];
  stock: number;
  wishProductCount: number;
  features: string[];
  offers: string[];
  details: Detail[];
  dimensions: Dimension[];
  techData: Tech[];
  // for info component
  materialDetails: MaterialDetail[];
  resistance?: Resistance;
  additionalInfo?: string;
  careTips: CareTip[];
  packing: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  name: string;
  lastName: string;
  email: string;
  email2: string;
  NIP?: string;
  apartmentNr: string;
  city: string;
  company?: string;
  country: string;
  phoneNumbers: (string | null)[];
  postalCode: string;
  street: string;
};

export type Detail = {
  name?: string;
  description?: string;
};

export type Dimension = {
  name?: string;
  dim?: string;
};

export type MaterialDetail = {
  name?: string;
  description: string[];
};

export type Resistance = {
  resistFrom: string[];
  resistDesc?: string;
};

export type CareTip = {
  tip?: string;
  list: string[];
};

export type Tech = {
  name?: string;
  data?: string;
};

// type for add-item route
export type MainInputsProps = {
  label: string;
  input: string;
};

// type for all products
export type Products = {
  products: {
    id: string;
    name: string;
    price: number;
    images: string[];
  }[];
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  images: string[];
};

export type ProductRating = {
  averageRating: number;
  totalRatings: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
};

// type for raters
type Rater = {
  id: string;
  username: string;
  rating: number;
  comment: string | undefined;
  createdAt: Date;
};

export type RatersResponse = {
  raters: Rater[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

type CartProduct = {
  id: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
};
// type for cart item
export type CartItemType = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: CartProduct;
};

// type for wishlist item
export type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  product: CartProduct;
};

// type for stripe order details
export type OrderDetails = {
  orderId: string;
  amount: string;
  currency: string | undefined;
  customer: string;
};
