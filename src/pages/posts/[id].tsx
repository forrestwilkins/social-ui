import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import PostCard from "../../components/Posts/PostCard";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";
import { usePostQuery } from "../../apollo/gen";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const postId = parseInt(String(query?.id));
  const { data, loading, error } = usePostQuery({
    variables: { id: postId },
    nextFetchPolicy: "cache-only",
    returnPartialData: true,
    skip: !postId,
  });

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data?.post.user) {
    return null;
  }

  return <PostCard post={data.post} />;
};

export default EditPostPage;
