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
import { toastVar } from "../../apollo/cache";
import {
  CreatePostInput,
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
import { uploadPostImages } from "../../apollo/posts/mutations/CreatePost.mutation";
import {
  FieldNames,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { generateRandom, redirectTo } from "../../utils/common.utils";
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
  const [selectedImages, setSelctedImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");

  const [deleteImage] = useDeleteImageMutation();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const t = useTranslate();

  const initialValues: CreatePostInput = {
    body: editPost ? editPost.body : "",
    groupId,
  };

  const handleCreate = async (
    formValues: CreatePostInput,
    { resetForm, setSubmitting }: FormikHelpers<CreatePostInput>,
    imageData?: FormData
  ) =>
    await createPost({
      variables: { postData: formValues },
      async update(cache, { data }) {
        if (!data?.createPost) {
          return;
        }
        const images = imageData
          ? await uploadPostImages(data.createPost.id, imageData)
          : [];
        const postWithImages = { ...data.createPost, images };
        cache.updateQuery<PostsQuery>({ query: PostsDocument }, (postsData) =>
          produce(postsData, (draft) => {
            draft?.posts.unshift(postWithImages);
          })
        );
        cache.modify({
          id: cache.identify(data.createPost.user),
          fields: {
            posts(existingPostRefs, { toReference }) {
              return [toReference(postWithImages), ...existingPostRefs];
            },
          },
        });
        if (!data.createPost.group) {
          return;
        }
        cache.modify({
          id: cache.identify(data.createPost.group),
          fields: {
            posts(existingPostRefs, { toReference }) {
              return [toReference(postWithImages), ...existingPostRefs];
            },
          },
        });
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
          const cacheId = cache.identify({ __typename: TypeNames.Image, id });
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
                  name={FieldNames.Body}
                  component={TextFieldWithAvatar}
                  placeholder={t("prompts.whatsHappening")}
                  autoComplete="off"
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
