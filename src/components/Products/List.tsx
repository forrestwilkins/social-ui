import { useQuery } from "@apollo/client";
import { Box, BoxProps } from "@mui/material";
import { PRODUCTS_QUERY } from "../../client/products/queries";
import { ProductsQuery } from "../../types/product";
import ProgressBar from "../Shared/ProgressBar";
import ProductCard from "./Card";

const ProductsList = (props: BoxProps) => {
  const { data, loading } = useQuery<ProductsQuery>(PRODUCTS_QUERY);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <Box {...props}>
      {data?.products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Box>
  );
};

export default ProductsList;
