import { ApolloCache, gql, Reference } from "@apollo/client";
import { Modifiers } from "@apollo/client/cache/core/types/common";
import produce from "immer";
import { PostsDocument, PostsQuery, RemovePostFragment } from "../../gen";

export const removePost =
  (post: RemovePostFragment) => (cache: ApolloCache<any>) => {
    cache.updateQuery<PostsQuery>({ query: PostsDocument }, (postsData) =>
      produce(postsData, (draft) => {
        if (!draft) {
          return;
        }
        const index = draft.posts.findIndex((p) => p.id === post.id);
        draft.posts.splice(index, 1);
      })
    );
    const fields: Modifiers = {
      posts(existingPostRefs: Reference[], { readField }) {
        return existingPostRefs.filter(
          (ref) => readField("id", ref) !== post.id
        );
      },
    };
    cache.modify({
      id: cache.identify(post.user),
      fields,
    });
    if (post.group) {
      cache.modify({
        id: cache.identify(post.group),
        fields,
      });
    }
    const postCacheId = cache.identify(post);
    cache.evict({ id: postCacheId });
    cache.gc();
  };

gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
