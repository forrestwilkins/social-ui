import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditPostQuery } from "../../../apollo/gen";
import DeletePostButton from "../../../components/Posts/DeletePostButton";
import PostForm from "../../../components/Posts/PostForm";
import ProgressBar from "../../../components/Shared/ProgressBar";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditPostQuery({
    variables: { id },
    skip: !id,
  });

  const { t } = useTranslation();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <PostForm editPost={data.post} sx={{ marginBottom: 2.5 }} />
      <DeletePostButton post={data.post} />
    </>
  );
};

export default EditPostPage;
