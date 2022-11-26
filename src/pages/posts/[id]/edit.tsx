// TODO: Add query specifically for edit post page

import { Button, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toastVar } from "../../../apollo/cache";
import { useDeletePostMutation, useEditPostQuery } from "../../../apollo/gen";
import { removePost } from "../../../apollo/posts/mutations/DeletePost.mutation";
import PostForm from "../../../components/Posts/PostForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useTranslate } from "../../../hooks/common.hooks";
import { redirectTo } from "../../../utils/common.utils";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditPostQuery({
    variables: { id },
    skip: !id,
  });

  const [deletePost] = useDeletePostMutation();

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
    await redirectTo(NavigationPaths.Home);

    await deletePost({
      variables: { id },
      update: removePost(data.post),
      onError() {
        toastVar({
          status: "error",
          title: t("errors.somethingWentWrong"),
        });
      },
    });
  };

  return (
    <>
      <PostForm editPost={data.post} sx={{ marginBottom: 2.5 }} />

      {/* TODO: Consider adding RemovePost component that uses corresponding fragment */}
      <Button
        color="error"
        fullWidth
        onClick={() =>
          window.confirm(t("prompts.deleteItem", { itemType: "post" })) &&
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
