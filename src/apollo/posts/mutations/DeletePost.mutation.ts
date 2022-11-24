import { ApolloCache, gql, Reference } from "@apollo/client";
import produce from "immer";
import { TypeNames } from "../../../constants/common.constants";
import { PostsDocument, PostsQuery } from "../../gen";

export const removePost =
  (id: number, userId: number, groupId?: number) =>
  (cache: ApolloCache<any>) => {
    cache.updateQuery<PostsQuery>({ query: PostsDocument }, (postsData) =>
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
    cache.modify({
      id: cache.identify({ id: groupId, __typename: TypeNames.Group }),
      fields: {
        posts(existingPostRefs: Reference[], { readField }) {
          return existingPostRefs.filter((ref) => id !== readField("id", ref));
        },
      },
    });
    const cacheId = cache.identify({ id, __typename: TypeNames.Post });
    cache.evict({ id: cacheId });
    cache.gc();
  };

gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
