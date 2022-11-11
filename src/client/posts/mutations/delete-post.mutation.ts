import { ApolloCache, gql } from "@apollo/client";
import produce from "immer";
import { TypeNames } from "../../../constants/common.constants";
import {
  GroupProfileFragment,
  PostsQuery,
  UserProfileFragment,
} from "../../../types/generated.types";
import GROUP_PROFILE_FRAGMENT from "../../groups/fragments/group-profile.fragment";
import USER_PROFILE_FRAGMENT from "../../users/fragments/user-profile.fragment";
import POSTS_QUERY from "../queries/posts.query";

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

export const removePost =
  (id: number, userId: number, groupId?: number) =>
  (cache: ApolloCache<any>) => {
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
  };

export default DELETE_POST_MUTATION;
