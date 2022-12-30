import { Modifiers } from "@apollo/client/cache/core/types/common";
import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  Divider,
  FormGroup,
  styled,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreatePostInput,
  Image,
  PostCardFragment,
  PostCardFragmentDoc,
  PostFormFragment,
  PostsDocument,
  PostsQuery,
  UpdatePostInput,
  useCreatePostMutation,
  useDeleteImageMutation,
  useUpdatePostMutation,
} from "../../apollo/gen";
import {
  ApiRoutes,
  FieldNames,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import {
  generateRandom,
  multiPartRequest,
  redirectTo,
} from "../../utils/common.utils";
import { buildImageData } from "../../utils/image.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
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
  editPost?: PostFormFragment;
  groupId?: number;
}

const PostForm = ({ editPost, groupId, ...cardProps }: Props) => {
  const [imagesInputKey, setImagesInputKey] = useState("");
  const [selectedImages, setSelctedImages] = useState<File[]>([]);

  const [createPost] = useCreatePostMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updatePost] = useUpdatePostMutation();

  const { t } = useTranslation();

  const initialValues: CreatePostInput = {
    body: editPost ? editPost.body : "",
    groupId,
  };

  const uploadPostImages = (postId: number, data: FormData) => {
    const path = `${ApiRoutes.Posts}/${postId}/images`;
    return multiPartRequest<Image[]>(path, data);
  };

  const handleCreate = async (
    formValues: CreatePostInput,
    { resetForm, setSubmitting }: FormikHelpers<CreatePostInput>,
    imageData?: FormData
  ) =>
    await createPost({
      variables: { postData: formValues },
      async update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createPost: { post },
        } = data;
        const images = imageData
          ? await uploadPostImages(post.id, imageData)
          : [];
        const postWithImages = { ...post, images };
        cache.updateQuery<PostsQuery>({ query: PostsDocument }, (postsData) =>
          produce(postsData, (draft) => {
            draft?.posts.unshift(postWithImages);
          })
        );
        const fields: Modifiers = {
          posts(existingPostRefs, { toReference }) {
            return [toReference(postWithImages), ...existingPostRefs];
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
        setImagesInputKey(generateRandom());
        setSelctedImages([]);
        setSubmitting(false);
        resetForm();
      },
    });

  const handleUpdate = async (
    formValues: Omit<UpdatePostInput, "id">,
    editPost: PostFormFragment,
    imageData?: FormData
  ) =>
    await updatePost({
      variables: { postData: { id: editPost.id, ...formValues } },
      async update(cache) {
        if (!imageData) {
          return;
        }
        const images = await uploadPostImages(editPost.id, imageData);
        cache.updateFragment<PostCardFragment>(
          {
            id: cache.identify(editPost),
            fragment: PostCardFragmentDoc,
            fragmentName: "PostCard",
          },
          (data) =>
            produce(data, (draft) => {
              draft?.images.push(...images);
            })
        );
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
      const imageData = buildImageData(selectedImages);
      if (editPost) {
        await handleUpdate(formValues, editPost, imageData);
        return;
      }
      await handleCreate(formValues, formikHelpers, imageData);
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
                  autoComplete="off"
                  component={TextFieldWithAvatar}
                  name={FieldNames.Body}
                  placeholder={t("prompts.whatsHappening")}
                />

                <AttachedImagePreview
                  deleteSavedImage={deleteSavedImageHandler}
                  removeSelectedImage={removeSelectedImageHandler}
                  savedImages={editPost?.images || []}
                  selectedImages={selectedImages}
                />
              </FormGroup>

              <Divider sx={{ marginBottom: 1.3 }} />

              <Flex sx={{ justifyContent: "space-between" }}>
                <ImageInput
                  refreshKey={imagesInputKey}
                  setImages={setSelctedImages}
                  multiple
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
