import { useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import client from "../client";
import {
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
} from "../client/products/mutations";
import { PRODUCTS_QUERY, PRODUCT_QUERY } from "../client/products/queries";
import { uploadProductImages } from "../client/products/rest";
import {
  CreateProductMutation,
  Product,
  ProductQuery,
  ProductsFormValues,
  ProductsQuery,
} from "../types/product";

export const useProductQuery = (
  id: number
): [Product | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<ProductQuery>(PRODUCT_QUERY, {
    variables: { id },
    skip: !id,
  });
  return [data?.product, loading, error];
};

export const useCreateProductMutation = () => {
  const [createProduct] = useMutation<CreateProductMutation>(
    CREATE_PRODUCT_MUTATION
  );

  const _createProduct = async (
    productData: ProductsFormValues,
    imageData: FormData
  ) => {
    const { data } = await createProduct({
      variables: { productData },
    });
    const images = await uploadProductImages(data!.createProduct.id, imageData);
    const productsData = client.readQuery<ProductsQuery>({
      query: PRODUCTS_QUERY,
    });
    const products = produce(productsData!.products, (draft) => {
      draft.unshift({ ...data!.createProduct, images });
    });
    client.writeQuery({
      query: PRODUCTS_QUERY,
      data: { products },
    });
  };

  return _createProduct;
};

export const useUpdateProductMutation = () => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  const _updateProduct = async (
    id: number,
    formValues: ProductsFormValues,
    imageData: FormData
  ) => {
    await updateProduct({
      variables: { productData: { id, ...formValues } },
    });
    const images = await uploadProductImages(id, imageData);
    const productsData = client.readQuery<ProductsQuery>({
      query: PRODUCTS_QUERY,
    });
    const products = produce(productsData!.products, (draft) => {
      draft.find((p) => p.id === id)?.images.push(...images);
    });
    client.writeQuery<ProductsQuery>({
      query: PRODUCTS_QUERY,
      data: { products },
    });
  };

  return _updateProduct;
};

export const useDeleteProductMutation = () => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);

  const _deleteProduct = async (id: number) => {
    await deleteProduct({
      variables: { id },
      update(cache) {
        const productsData = cache.readQuery<ProductsQuery>({
          query: PRODUCTS_QUERY,
        });
        const products = produce(productsData!.products, (draft) => {
          const index = draft.findIndex((p) => p.id === id);
          draft.splice(index, 1);
        });
        cache.writeQuery<ProductsQuery>({
          query: PRODUCTS_QUERY,
          data: { products },
        });
      },
    });
  };

  return _deleteProduct;
};
