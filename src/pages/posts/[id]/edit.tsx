import { Button, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toastVar } from "../../../client/cache";
import PostForm from "../../../components/Posts/PostForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useTranslate } from "../../../hooks/common.hooks";
import { useDeletePostMutation } from "../../../hooks/post.hooks";
import { Post, usePostQuery } from "../../../types/generated.types";
import { redirectTo } from "../../../utils/common.utils";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const postId = parseInt(String(query?.id));
  const { data, loading, error } = usePostQuery({
    variables: { id: postId },
    skip: !postId,
  });

  const deletePost = useDeletePostMutation();

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const handleDeleteButtonClick = async () => {
    try {
      await deletePost(postId);
      redirectTo(NavigationPaths.Home);
    } catch {
      toastVar({
        status: "error",
        title: t("errors.somethingWentWrong"),
      });
    }
  };

  return (
    <>
      <PostForm editPost={data.post as Post} sx={{ marginBottom: 2.5 }} />

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
