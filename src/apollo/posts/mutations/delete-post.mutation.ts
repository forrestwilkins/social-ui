import { ApolloCache, gql, Reference } from "@apollo/client";
import produce from "immer";
import { TypeNames } from "../../../constants/common.constants";
import { PostsQuery } from "../../../types/generated.types";
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
    cache.modify({
      id: cache.identify({ id: userId, __typename: TypeNames.User }),
      fields: {
        posts(existingPostRefs: Reference[], { readField }) {
          return existingPostRefs.filter((ref) => id !== readField("id", ref));
        },
      },
    });
    if (!groupId) {
      return;
    }
    cache.modify({
      id: cache.identify({ id: groupId, __typename: TypeNames.Group }),
      fields: {
        posts(existingPostRefs: Reference[], { readField }) {
          return existingPostRefs.filter((ref) => id !== readField("id", ref));
        },
      },
    });
  };

export default DELETE_POST_MUTATION;
