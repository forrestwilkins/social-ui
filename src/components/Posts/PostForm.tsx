import { Modifiers } from "@apollo/client/cache/core/types/common";
import { Divider, FormGroup } from "@mui/material";
import { Field, Form, Formik, FormikFormProps, FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreatePostInput,
  PostFormFragment,
  PostsDocument,
  PostsQuery,
  UpdatePostInput,
  useCreatePostMutation,
  useDeleteImageMutation,
  useUpdatePostMutation,
} from "../../apollo/gen";
import {
  FieldNames,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import { getRandomString, redirectTo } from "../../utils/common.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

interface Props extends FormikFormProps {
  editPost?: PostFormFragment;
  groupId?: number;
  ToggleFormButtons?(): JSX.Element;
}

const PostForm = ({
  editPost,
  groupId,
  ToggleFormButtons,
  ...formProps
}: Props) => {
  const [imagesInputKey, setImagesInputKey] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [createPost] = useCreatePostMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updatePost] = useUpdatePostMutation();

  const { t } = useTranslation();

  const initialValues: CreatePostInput = {
    body: editPost ? editPost.body : "",
    groupId,
  };

  const handleCreate = async (
    formValues: CreatePostInput,
    { resetForm, setSubmitting }: FormikHelpers<CreatePostInput>
  ) =>
    await createPost({
      variables: { postData: { ...formValues, images } },
      async update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createPost: { post },
        } = data;
        cache.updateQuery<PostsQuery>({ query: PostsDocument }, (postsData) =>
          produce(postsData, (draft) => {
            draft?.posts.unshift(post);
          })
        );
        const fields: Modifiers = {
          posts(existingPostRefs, { toReference }) {
            return [toReference(post), ...existingPostRefs];
          },
        };
        const userCacheId = cache.identify(post.user);
        cache.modify({ id: userCacheId, fields });
        if (!post.group) {
          return;
        }
        const groupCacheId = cache.identify(post.group);
        cache.modify({ id: groupCacheId, fields });
      },
      onCompleted() {
        resetForm();
        setImages([]);
        setImagesInputKey(getRandomString());
        setSubmitting(false);
      },
    });

  const handleUpdate = async (
    formValues: Omit<UpdatePostInput, "id">,
    editPost: PostFormFragment
  ) =>
    await updatePost({
      variables: {
        postData: {
          id: editPost.id,
          ...formValues,
          images,
        },
      },
      onCompleted() {
        redirectTo(NavigationPaths.Home);
      },
    });

  const handleSubmit = async (
    formValues: CreatePostInput | UpdatePostInput,
    formikHelpers: FormikHelpers<CreatePostInput | UpdatePostInput>
  ) => {
    try {
      if (editPost) {
        await handleUpdate(formValues, editPost);
        return;
      }
      await handleCreate(formValues, formikHelpers);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const deleteSavedImageHandler = async (id: number) => {
    if (editPost) {
      await deleteImage({
        variables: { id },
        update(cache) {
          const cacheId = cache.identify({ id, __typename: TypeNames.Image });
          cache.evict({ id: cacheId });
          cache.gc();
        },
      });
      setImagesInputKey(getRandomString());
    }
  };

  const removeSelectedImageHandler = (imageName: string) => {
    setImages(images.filter((image) => image.name !== imageName));
    setImagesInputKey(getRandomString());
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      {...formProps}
    >
      {(formik) => (
        <Form>
          <FormGroup>
            <Field
              autoComplete="off"
              component={TextFieldWithAvatar}
              name={FieldNames.Body}
              placeholder={t("prompts.whatsHappening")}
            />

            <AttachedImagePreview
              deleteSavedImage={deleteSavedImageHandler}
              removeSelectedImage={removeSelectedImageHandler}
              savedImages={editPost?.images || []}
              selectedImages={images}
            />
          </FormGroup>

          <Divider sx={{ marginBottom: 1.3 }} />

          <Flex sx={{ justifyContent: "space-between" }}>
            <Flex>
              <ImageInput
                refreshKey={imagesInputKey}
                setImages={setImages}
                multiple
              />

              {ToggleFormButtons && <ToggleFormButtons />}
            </Flex>

            <PrimaryActionButton
              disabled={
                formik.isSubmitting || (!formik.dirty && !images.length)
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
  );
};

export default PostForm;
