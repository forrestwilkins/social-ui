import { useReactiveVar } from "@apollo/client";
import { Box, BoxProps, Button, FormGroup } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { isNavDrawerOpenVar } from "../../client/cache";
import Flex from "../../components/Shared/Flex";
import Spinner from "../../components/Shared/Spinner";
import { FieldNames, NavigationPaths } from "../../constants/common";
import { DEFAULT_PRODUCT_FORM_VALUES } from "../../constants/product";
import { useTranslate } from "../../hooks/common";
import { useDeleteImageMutation } from "../../hooks/image";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../hooks/product";
import { Product, ProductsFormValues } from "../../types/product";
import { generateRandom, redirectTo } from "../../utils/common";
import { buildImageData } from "../../utils/image";
import ImageInput from "../Images/Input";
import SelectedImages from "../Images/Selected";
import { Field } from "../Shared/Field";

interface Props extends BoxProps {
  editProduct?: Product;
}

const ProductForm = ({ editProduct, ...boxProps }: Props) => {
  const [selectedImages, setSelctedImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const createProduct = useCreateProductMutation();
  const updateProduct = useUpdateProductMutation();
  const deleteImage = useDeleteImageMutation();

  const t = useTranslate();

  const initialValues = editProduct
    ? {
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
      }
    : DEFAULT_PRODUCT_FORM_VALUES;

  const handleSubmit = async (
    formValues: ProductsFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ProductsFormValues>
  ) => {
    const imageData = buildImageData(selectedImages);

    if (editProduct) {
      await updateProduct(editProduct.id, formValues, imageData);
      redirectTo(NavigationPaths.AdminProducts);
      return;
    }
    await createProduct(formValues, imageData);

    setImagesInputKey(generateRandom());
    setSelctedImages([]);
    setSubmitting(false);
    resetForm();
  };

  const deleteSavedImageHandler = async (id: number) => {
    if (editProduct) {
      await deleteImage(id);
      setImagesInputKey(generateRandom());
    }
  };

  const removeSelectedImageHandler = (imageName: string) => {
    setSelctedImages(
      selectedImages.filter((image) => image.name !== imageName)
    );
    setImagesInputKey(generateRandom());
  };

  return (
    <Box {...boxProps}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form hidden={isNavDrawerOpen}>
            <FormGroup>
              <Field
                autoComplete="off"
                label={t("products.form.name")}
                name={FieldNames.Name}
              />
              <Field
                autoComplete="off"
                label={t("products.form.description")}
                name={FieldNames.Description}
              />
              <Field
                label={t("products.form.price")}
                name={FieldNames.Price}
                type="number"
              />

              <ImageInput
                multiple
                refreshKey={imagesInputKey}
                setImages={setSelctedImages}
              />
              <SelectedImages
                deleteSavedImage={deleteSavedImageHandler}
                removeSelectedImage={removeSelectedImageHandler}
                savedImages={editProduct?.images || []}
                selectedImages={selectedImages}
              />
            </FormGroup>

            <Flex flexEnd>
              <Button
                type="submit"
                disabled={
                  formik.isSubmitting ||
                  (!formik.dirty && !selectedImages.length)
                }
              >
                {t("actions.save")}
                {formik.isSubmitting && (
                  <Spinner size={10} sx={{ marginLeft: 1 }} />
                )}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProductForm;
