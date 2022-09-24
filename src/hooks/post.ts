import { useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import { POST_FRAGMENT } from "../client/posts/fragments";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../client/posts/mutations";
import { POSTS_QUERY, POST_QUERY } from "../client/posts/queries";
import { uploadPostImages } from "../client/posts/rest";
import { TypeNames } from "../constants/common";
import {
  CreatePostMutation,
  Post,
  PostQuery,
  PostsFormValues,
  PostsQuery,
} from "../types/post";

export const usePostQuery = (
  id?: number
): [Post | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<PostQuery>(POST_QUERY, {
    variables: { id },
    skip: !id,
  });
  return [data?.post, loading, error];
};

export const useCreatePostMutation = () => {
  const [createPost] = useMutation<CreatePostMutation>(CREATE_POST_MUTATION);

  const _createPost = async (
    postData: PostsFormValues,
    imageData?: FormData
  ) => {
    await createPost({
      variables: { postData },
      async update(cache, { data }) {
        if (!data) {
          throw new Error("Failed to create post");
        }
        if (!imageData) {
          return;
        }
        const images = await uploadPostImages(data.createPost.id, imageData);
        cache.updateQuery<PostsQuery>({ query: POSTS_QUERY }, (postsData) => {
          if (!postsData) {
            throw new Error("Failed to update cache");
          }
          return {
            posts: produce(postsData.posts, (draft) => {
              draft.unshift({ ...data.createPost, images });
            }),
          };
        });
      },
    });
  };

  return _createPost;
};

export const useUpdatePostMutation = () => {
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const _updatePost = async (
    id: number,
    formValues: PostsFormValues,
    imageData?: FormData
  ) => {
    await updatePost({
      variables: { postData: { id, ...formValues } },
      async update(cache) {
        if (!imageData) {
          return;
        }
        const images = await uploadPostImages(id, imageData);
        cache.updateFragment<Post>(
          {
            id: `${TypeNames.Post}:${id}`,
            fragment: POST_FRAGMENT,
            fragmentName: "PostFragment",
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

export const useDeletePostMutation = () => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const _deletePost = async (id: number) => {
    await deletePost({
      variables: { id },
      update(cache) {
        cache.updateQuery<PostsQuery>({ query: POSTS_QUERY }, (postsData) => {
          if (!postsData) {
            throw new Error("Failed to update cache");
          }
          return {
            posts: produce(postsData.posts, (draft) => {
              const index = draft.findIndex((p) => p.id === id);
              draft.splice(index, 1);
            }),
          };
        });
      },
    });
  };

  return _deletePost;
};
