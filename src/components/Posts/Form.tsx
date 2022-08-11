import {
  Button,
  Card,
  CardContent,
  CardProps,
  Divider,
  FormGroup,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FieldNames, NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useDeleteImageMutation } from "../../hooks/image";
import { useCreatePostMutation, useUpdatePostMutation } from "../../hooks/post";
import { Post, PostsFormValues } from "../../types/post";
import { generateRandom, redirectTo } from "../../utils/common";
import { buildImageData } from "../../utils/image";
import AttachedImages from "../Images/Attached";
import ImageInput from "../Images/Input";
import Flex from "../Shared/Flex";
import Spinner from "../Shared/Spinner";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

interface Props extends CardProps {
  editPost?: Post;
}

const PostForm = ({ editPost, ...cardProps }: Props) => {
  const [selectedImages, setSelctedImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");

  const createPost = useCreatePostMutation();
  const updatePost = useUpdatePostMutation();
  const deleteImage = useDeleteImageMutation();

  const t = useTranslate();

  const initialValues = {
    body: editPost ? editPost.body : "",
  };

  const handleSubmit = async (
    formValues: PostsFormValues,
    { resetForm, setSubmitting }: FormikHelpers<PostsFormValues>
  ) => {
    const imageData = buildImageData(selectedImages);

    if (editPost) {
      await updatePost(editPost.id, formValues, imageData);
      redirectTo(NavigationPaths.Home);
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
    <Card {...cardProps}>
      <CardContent sx={{ paddingTop: 2.5 }}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <FormGroup>
                <Field
                  name={FieldNames.Body}
                  component={TextFieldWithAvatar}
                  placeholder={t("prompts.whatsHappening")}
                  autoComplete="off"
                />

                <AttachedImages
                  deleteSavedImage={deleteSavedImageHandler}
                  removeSelectedImage={removeSelectedImageHandler}
                  savedImages={editPost?.images || []}
                  selectedImages={selectedImages}
                />
              </FormGroup>

              <Divider sx={{ marginBottom: 0.8 }} />

              <Flex sx={{ justifyContent: "space-between" }}>
                <ImageInput
                  multiple
                  refreshKey={imagesInputKey}
                  setImages={setSelctedImages}
                />

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
      </CardContent>
    </Card>
  );
};

export default PostForm;
