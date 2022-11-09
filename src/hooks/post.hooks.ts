import { useMutation } from "@apollo/client";
import produce from "immer";
import { GROUP_PROFILE_FRAGMENT } from "../client/groups/group.fragments";
import { DELETE_POST_MUTATION } from "../client/posts/post.mutations";
import { POSTS_QUERY } from "../client/posts/post.queries";
import { USER_PROFILE_FRAGMENT } from "../client/users/user.fragments";
import { TypeNames } from "../constants/common.constants";
import {
  GroupProfileFragment,
  PostsQuery,
  UserProfileFragment,
} from "../types/generated.types";

export const useDeletePostMutation = () => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const _deletePost = async (id: number, userId: number, groupId?: number) => {
    await deletePost({
      variables: { id },
      update(cache) {
        cache.updateQuery<PostsQuery>({ query: POSTS_QUERY }, (postsData) =>
          produce(postsData, (draft) => {
            if (!draft) {
              return;
            }
            const index = draft.posts.findIndex((p) => p.id === id);
            draft.posts.splice(index, 1);
          })
        );
        cache.updateFragment<UserProfileFragment>(
          {
            id: cache.identify({ id: userId, __typename: TypeNames.User }),
            fragment: USER_PROFILE_FRAGMENT,
            fragmentName: "UserProfile",
          },
          (data) =>
            produce(data, (draft) => {
              if (!draft) {
                return;
              }
              const index = draft.posts.findIndex((p) => p.id === id);
              draft.posts.splice(index, 1);
            })
        );
        if (!groupId) {
          return;
        }
        cache.updateFragment<GroupProfileFragment>(
          {
            id: cache.identify({ id: groupId, __typename: TypeNames.Group }),
            fragment: GROUP_PROFILE_FRAGMENT,
            fragmentName: "GroupProfile",
          },
          (data) =>
            produce(data, (draft) => {
              if (!draft) {
                return;
              }
              const index = draft.posts.findIndex((p) => p.id === id);
              draft.posts.splice(index, 1);
            })
        );
      },
    });
  };

  return _deletePost;
};
