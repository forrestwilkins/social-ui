import { ApolloCache, Reference } from "@apollo/client";
import { Modifiers } from "@apollo/client/cache/core/types/common";
import { Button } from "@mui/material";
import produce from "immer";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  DeletePostButtonFragment,
  PostsDocument,
  PostsQuery,
  useDeletePostMutation,
} from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";

export const removePost =
  (post: DeletePostButtonFragment) => (cache: ApolloCache<any>) => {
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

interface Props {
  post: DeletePostButtonFragment;
}

const DeletePostButton = ({ post }: Props) => {
  const [deletePost] = useDeletePostMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    await redirectTo(NavigationPaths.Home);

    await deletePost({
      variables: { id: post.id },
      update: removePost(post),
      onError() {
        toastVar({
          status: "error",
          title: t("errors.somethingWentWrong"),
        });
      },
    });
  };

  const handleClickWithConfirm = () =>
    window.confirm(t("prompts.deleteItem", { itemType: "post" })) &&
    handleClick();

  return (
    <Button
      color="error"
      onClick={handleClickWithConfirm}
      sx={{ marginTop: 1.5 }}
      variant="outlined"
      fullWidth
    >
      {t("actions.delete")}
    </Button>
  );
};

export default DeletePostButton;
