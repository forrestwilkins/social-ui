import { NextPage } from "next";
import ProductForm from "../../../components/Products/Form";
import ProductsList from "../../../components/Products/List";
import LevelOneHeading from "../../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../../hooks/common";

const AdminProducts: NextPage = () => {
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 25 }}>
        {t("products.labels.products")}
      </LevelOneHeading>

      <ProductForm sx={{ marginBottom: 2 }} />
      <ProductsList sx={{ marginBottom: 15 }} />
    </>
  );
};

export default AdminProducts;
