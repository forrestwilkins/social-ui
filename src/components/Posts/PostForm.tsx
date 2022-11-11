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
import GROUP_PROFILE_FRAGMENT from "../../client/groups/fragments/group-profile.fragment";
import POST_SUMMARY_FRAGMENT from "../../client/posts/fragments/post-summary.fragment";
import { uploadPostImages } from "../../client/posts/mutations/create-post.mutation";
import POSTS_QUERY from "../../client/posts/queries/posts.query";
import { USER_PROFILE_FRAGMENT } from "../../client/users/user.fragments";
import {
  FieldNames,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  GroupProfileFragment,
  Image,
  Post,
  PostInput,
  PostsQuery,
  PostSummaryFragment,
  useCreatePostMutation,
  useDeleteImageMutation,
  UserProfileFragment,
  useUpdatePostMutation,
} from "../../types/generated.types";
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

  const [deleteImage] = useDeleteImageMutation();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const t = useTranslate();

  const initialValues: PostInput = {
    body: editPost ? editPost.body : "",
    groupId,
  };

  const handleSubmit = async (
    formValues: PostInput,
    { resetForm, setSubmitting }: FormikHelpers<PostInput>
  ) => {
    const imageData = buildImageData(selectedImages);

    if (editPost) {
      await updatePost({
        variables: { id: editPost.id, postData: formValues },
        async update(cache) {
          if (!imageData) {
            return;
          }
          const images = await uploadPostImages(editPost.id, imageData);
          cache.updateFragment<PostSummaryFragment>(
            {
              id: cache.identify(editPost),
              fragment: POST_SUMMARY_FRAGMENT,
              fragmentName: "PostSummary",
            },
            (data) =>
              produce(data, (draft) => {
                draft?.images.push(...images);
              })
          );
        },
      });
      redirectTo(NavigationPaths.Home);
      return;
    }

    await createPost({
      variables: { postData: formValues },
      async update(cache, { data }) {
        if (!data?.createPost) {
          return;
        }
        let images: Image[] = [];
        if (imageData) {
          images = await uploadPostImages(data.createPost.id, imageData);
        }
        const postWithImages = { ...data.createPost, images } as Post;
        cache.updateQuery<PostsQuery>({ query: POSTS_QUERY }, (postsData) =>
          produce(postsData, (draft) => {
            draft?.posts.unshift(postWithImages);
          })
        );
        cache.updateFragment<UserProfileFragment>(
          {
            id: cache.identify(data.createPost.user),
            fragment: USER_PROFILE_FRAGMENT,
            fragmentName: "UserProfile",
          },
          (data) =>
            produce(data, (draft) => {
              draft?.posts.unshift(postWithImages);
            })
        );
        if (!data.createPost.group) {
          return;
        }
        cache.updateFragment<GroupProfileFragment>(
          {
            id: cache.identify(data.createPost.group),
            fragment: GROUP_PROFILE_FRAGMENT,
            fragmentName: "GroupProfile",
          },
          (data) =>
            produce(data, (draft) => {
              draft?.posts.unshift(postWithImages);
            })
        );
      },
    });

    setImagesInputKey(generateRandom());
    setSelctedImages([]);
    setSubmitting(false);
    resetForm();
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
