import { ImageEntity } from "./image";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  images: ImageEntity[];
  __typename: "Product";
}

export type EditProduct = Pick<
  Product,
  "id" | "name" | "description" | "price" | "images"
>;

export type ProductsFormValues = Pick<
  Product,
  "name" | "description" | "price"
>;

export interface ProductQuery {
  product: Product;
}

export interface ProductsQuery {
  products: Product[];
}

export interface CreateProductMutation {
  createProduct: Product;
}
