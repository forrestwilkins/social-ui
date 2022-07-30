import { useReactiveVar } from "@apollo/client";
import { Box, BoxProps, Button, FormGroup } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { isNavDrawerOpenVar } from "../../client/cache";
import { FieldNames, NavigationPaths } from "../../constants/common";
import { DEFAULT_POST_FORM_VALUES } from "../../constants/post";
import { useTranslate } from "../../hooks/common";
import { useDeleteImageMutation } from "../../hooks/image";
import { useCreatePostMutation, useUpdatePostMutation } from "../../hooks/post";
import { Post, PostsFormValues } from "../../types/post";
import { generateRandom, redirectTo } from "../../utils/common";
import { buildImageData } from "../../utils/image";
import ImageInput from "../Images/Input";
import SelectedImages from "../Images/Selected";
import { Field } from "../Shared/Field";
import Flex from "../Shared/Flex";
import Spinner from "../Shared/Spinner";

interface Props extends BoxProps {
  editPost?: Post;
}

const PostForm = ({ editPost, ...boxProps }: Props) => {
  const [selectedImages, setSelctedImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const createPost = useCreatePostMutation();
  const updatePost = useUpdatePostMutation();
  const deleteImage = useDeleteImageMutation();

  const t = useTranslate();

  const initialValues = editPost
    ? {
        body: editPost.body,
      }
    : DEFAULT_POST_FORM_VALUES;

  const handleSubmit = async (
    formValues: PostsFormValues,
    { resetForm, setSubmitting }: FormikHelpers<PostsFormValues>
  ) => {
    const imageData = buildImageData(selectedImages);

    if (editPost) {
      await updatePost(editPost.id, formValues, imageData);
      redirectTo(NavigationPaths.Admin);
      return;
    }
    await createPost(formValues, imageData);

    setImagesInputKey(generateRandom());
    setSelctedImages([]);
    setSubmitting(false);
    resetForm();
  };

  const deleteSavedImageHandler = async (id: number) => {
    if (editPost) {
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
                label={t("posts.form.body")}
                name={FieldNames.Body}
              />

              <ImageInput
                multiple
                refreshKey={imagesInputKey}
                setImages={setSelctedImages}
              />
              <SelectedImages
                deleteSavedImage={deleteSavedImageHandler}
                removeSelectedImage={removeSelectedImageHandler}
                savedImages={editPost?.images || []}
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
                {t(editPost ? "actions.save" : "actions.post")}
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

export default PostForm;
