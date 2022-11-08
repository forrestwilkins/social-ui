import { useMutation } from "@apollo/client";
import produce from "immer";
import { GROUP_QUERY } from "../client/groups/group.queries";
import { POST_SUMMARY_FRAGMENT } from "../client/posts/post.fragments";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../client/posts/post.mutations";
import { POSTS_QUERY } from "../client/posts/post.queries";
import { uploadPostImages } from "../client/posts/post.rest";
import { USER_QUERY } from "../client/users/user.queries";
import { TypeNames } from "../constants/common.constants";
import {
  CreatePostMutation,
  Group,
  Image,
  Post,
  PostSummaryFragment,
  User,
} from "../types/generated.types";
import { PostsFormValues } from "../types/post.types";
import { filterInactiveQueries, updateQuery } from "../utils/apollo.utils";

export const useCreatePostMutation = () => {
  const [createPost] = useMutation<CreatePostMutation>(CREATE_POST_MUTATION);

  const _createPost = async (
    postData: PostsFormValues,
    imageData?: FormData
  ) => {
    await createPost({
      variables: { postData },
      async update(_, { data }) {
        if (!data) {
          return;
        }
        let images: Image[] = [];
        if (imageData) {
          images = await uploadPostImages(data.createPost.id, imageData);
        }
        const postWithImages = { ...data.createPost, images } as Post;
        updateQuery<Post[]>({ query: POSTS_QUERY }, (draft) => {
          draft.unshift(postWithImages);
        });
        updateQuery<User>(
          {
            query: USER_QUERY,
            variables: { name: data.createPost.user.name },
          },
          (draft) => {
            draft.posts.unshift(postWithImages);
          }
        );
        updateQuery<Group>(
          {
            query: GROUP_QUERY,
            variables: { name: data.createPost.group?.name },
          },
          (draft) => {
            draft.posts.unshift(postWithImages);
          }
        );
      },
    });
  };

  return _createPost;
};

export const useUpdatePostMutation = () => {
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const _updatePost = async (
    id: number,
    postData: PostsFormValues,
    imageData?: FormData
  ) => {
    await updatePost({
      variables: { id, postData },
      async update(cache) {
        if (!imageData) {
          return;
        }
        const images = await uploadPostImages(id, imageData);
        cache.updateFragment<PostSummaryFragment>(
          {
            id: `${TypeNames.Post}:${id}`,
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
  };

  return _updatePost;
};

// TODO: Add optional arguments for user ID and group ID and update cache directly for both
export const useDeletePostMutation = () => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const _deletePost = async (id: number) => {
    await deletePost({
      variables: { id },
      update: () =>
        updateQuery<Post[]>({ query: POSTS_QUERY }, (draft) => {
          const index = draft.findIndex((p) => p.id === id);
          draft.splice(index, 1);
        }),
      refetchQueries: filterInactiveQueries([USER_QUERY, GROUP_QUERY]),
    });
  };

  return _deletePost;
};
