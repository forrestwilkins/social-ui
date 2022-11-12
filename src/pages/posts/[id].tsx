import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import PostCard from "../../components/Posts/PostCard";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";
import { usePostQuery } from "../../types/generated.types";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const postId = parseInt(String(query?.id));
  const { data, loading, error } = usePostQuery({
    variables: { id: postId },
    skip: !postId,
  });

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

  return <PostCard post={data.post} />;
};

export default EditPostPage;
