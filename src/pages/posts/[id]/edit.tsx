import { Button, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toastVar } from "../../../apollo/cache";
import { removePost } from "../../../apollo/posts/mutations/DeletePost.mutation";
import PostForm from "../../../components/Posts/PostForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useTranslate } from "../../../hooks/common.hooks";
import {
  useDeletePostMutation,
  usePostQuery,
} from "../../../types/generated.types";
import { redirectTo } from "../../../utils/common.utils";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = usePostQuery({
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
    const {
      post: { group, user },
    } = data;
    try {
      await deletePost({
        variables: { id },
        update: removePost(id, user.id, group?.id),
      });
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
      <PostForm editPost={data.post} sx={{ marginBottom: 2.5 }} />

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
