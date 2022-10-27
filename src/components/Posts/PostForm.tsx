import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  Divider,
  FormGroup,
  styled,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FieldNames, NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { useDeleteImageMutation } from "../../hooks/image.hooks";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../hooks/post.hooks";
import { Post, PostsFormValues } from "../../types/post.types";
import { generateRandom, redirectTo } from "../../utils/common.utils";
import { buildImageData } from "../../utils/image.utils";
import AttachedImages from "../Images/AttachedImages";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

const CardContent = styled(MuiCardContent)(() => ({
  paddingBottom: 12,
  "&:last-child": {
    paddingBottom: 12,
  },
}));

interface Props extends CardProps {
  editPost?: Post;
  groupId?: number;
}

const PostForm = ({ editPost, groupId, ...cardProps }: Props) => {
  const [selectedImages, setSelctedImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");

  const createPost = useCreatePostMutation();
  const updatePost = useUpdatePostMutation();
  const deleteImage = useDeleteImageMutation();

  const t = useTranslate();

  const initialValues: PostsFormValues = {
    body: editPost ? editPost.body : "",
    groupId,
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
      <CardContent>
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

              <Divider sx={{ marginBottom: 1.3 }} />

              <Flex sx={{ justifyContent: "space-between" }}>
                <ImageInput
                  multiple
                  refreshKey={imagesInputKey}
                  setImages={setSelctedImages}
                />

                <PrimaryActionButton
                  disabled={
                    formik.isSubmitting ||
                    (!formik.dirty && !selectedImages.length)
                  }
                  sx={{ marginTop: 1.5 }}
                  type="submit"
                >
                  {t(editPost ? "actions.save" : "actions.post")}
                </PrimaryActionButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default PostForm;
