import { Card, CardContent, CardProps, Typography } from "@mui/material";
import { NavigationPaths } from "../../constants/common";
import { Product } from "../../types/product";
import ImagesList from "../Images/List";
import Link from "../Shared/Link";

interface Props extends CardProps {
  product: Product;
}

const ProductCard = ({ product, ...cardProps }: Props) => {
  const linkToEditProductPage = `${NavigationPaths.AdminProducts}/${product.id}`;

  return (
    <Link href={linkToEditProductPage}>
      <Card sx={{ marginBottom: 1.5 }} {...cardProps} elevation={0}>
        <CardContent>
          <ImagesList images={product.images} />

          <Typography sx={{ fontSize: 20 }}>{product.name}</Typography>
          <Typography>{product.description}</Typography>

          <Typography
            sx={{
              color: "#1E824C",
              fontFamily: "Inter Bold",
              fontSize: 14,
            }}
          >
            ${product.price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
