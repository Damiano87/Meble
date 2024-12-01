export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStore: boolean;
  images: string[];
  likes: number;
};

// type for add-item route
export type MainInputsProps = {
  label: string;
  input: string;
};
