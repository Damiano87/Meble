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

type Detail = {
  name?: string;
  description?: string;
};

type Dimension = {
  name?: string;
  dim?: string;
};

type MaterialDetail = {
  name?: string;
  description: string[];
};

type Resistance = {
  resistFrom: string[];
  resistDesc?: string;
};

type CareTip = {
  tip?: string;
  list: string[];
};

type Tech = {
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
