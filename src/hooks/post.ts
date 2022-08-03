import { useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import client from "../client";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../client/posts/mutations";
import { POSTS_QUERY, POST_QUERY } from "../client/posts/queries";
import { uploadPostImages } from "../client/posts/rest";
import {
  CreatePostMutation,
  Post,
  PostQuery,
  PostsFormValues,
  PostsQuery,
} from "../types/post";

export const usePostQuery = (
  id: number
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
    imageData: FormData
  ) => {
    const { data } = await createPost({
      variables: { postData },
    });
    const images = await uploadPostImages(data!.createPost.id, imageData);
    const postsData = client.readQuery<PostsQuery>({
      query: POSTS_QUERY,
    });
    const posts = produce(postsData!.posts, (draft) => {
      draft.unshift({ ...data!.createPost, images });
    });
    client.writeQuery({
      query: POSTS_QUERY,
      data: { posts },
    });
  };

  return _createPost;
};

export const useUpdatePostMutation = () => {
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const _updatePost = async (
    id: number,
    formValues: PostsFormValues,
    imageData: FormData
  ) => {
    await updatePost({
      variables: { postData: { id, ...formValues } },
    });
    const images = await uploadPostImages(id, imageData);
    const postsData = client.readQuery<PostsQuery>({
      query: POSTS_QUERY,
    });
    const posts = produce(postsData!.posts, (draft) => {
      draft.find((p) => p.id === id)?.images.push(...images);
    });
    client.writeQuery<PostsQuery>({
      query: POSTS_QUERY,
      data: { posts },
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
        const postsData = cache.readQuery<PostsQuery>({
          query: POSTS_QUERY,
        });
        const posts = produce(postsData!.posts, (draft) => {
          const index = draft.findIndex((p) => p.id === id);
          draft.splice(index, 1);
        });
        cache.writeQuery<PostsQuery>({
          query: POSTS_QUERY,
          data: { posts },
        });
      },
    });
  };

  return _deletePost;
};
