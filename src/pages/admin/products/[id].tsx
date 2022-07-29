import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ProductForm from "../../../components/Products/Form";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common";
import { useTranslate } from "../../../hooks/common";
import {
  useDeleteProductMutation,
  useProductQuery,
} from "../../../hooks/product";
import { redirectTo } from "../../../utils/common";

const EditProductPage: NextPage = () => {
  const { query } = useRouter();
  const editProductId = parseInt(String(query?.id));
  const [product, isProductLoading] = useProductQuery(editProductId);
  const deleteProduct = useDeleteProductMutation();

  const t = useTranslate();

  if (isProductLoading) {
    return <ProgressBar />;
  }

  if (!product) {
    return null;
  }

  const handleDeleteButtonClick = async () => {
    await deleteProduct(editProductId);
    redirectTo(NavigationPaths.AdminProducts);
  };

  return (
    <>
      <ProductForm editProduct={product} />

      <Button
        color="error"
        fullWidth
        onClick={() =>
          window.confirm(t("prompts.deleteItem", { item: "product" })) &&
          handleDeleteButtonClick()
        }
        sx={{ marginTop: 1.5 }}
        variant="outlined"
      >
        {t("actions.delete")}
      </Button>
    </>
  );
};

export default EditProductPage;
