import { Button } from "@mui/material";
import { toastVar } from "../../apollo/cache";
import {
  DeletePostButtonFragment,
  useDeletePostMutation,
} from "../../apollo/gen";
import { removePost } from "../../apollo/posts/mutations/DeletePost.mutation";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { redirectTo } from "../../utils/common.utils";

interface Props {
  post: DeletePostButtonFragment;
}

const DeletePostButton = ({ post }: Props) => {
  const [deletePost] = useDeletePostMutation();
  const t = useTranslate();

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
