import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toastVar } from "../../../client/cache";
import PostForm from "../../../components/Posts/PostForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common";
import { useTranslate } from "../../../hooks/common";
import { useDeletePostMutation, usePostQuery } from "../../../hooks/post";
import { redirectTo } from "../../../utils/common";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const editPostId = parseInt(String(query?.id));
  const [post, isPostLoading] = usePostQuery(editPostId);
  const deletePost = useDeletePostMutation();

  const t = useTranslate();

  if (isPostLoading) {
    return <ProgressBar />;
  }

  if (!post) {
    return null;
  }

  const handleDeleteButtonClick = async () => {
    try {
      await deletePost(editPostId);
      redirectTo(NavigationPaths.Home);
    } catch {
      toastVar({ status: "error", title: t("errors.somethingWentWrong") });
    }
  };

  return (
    <>
      <PostForm editPost={post} sx={{ marginBottom: 2.5 }} />

      <Button
        color="error"
        fullWidth
        onClick={() =>
          window.confirm(t("prompts.deleteItem", { item: "post" })) &&
          handleDeleteButtonClick()
        }
        sx={{ marginTop: 1.5 }}
        variant="outlined"
      >
        {t("actions.delete")}
      </Button>
    </>
  );
};

export default EditPostPage;
