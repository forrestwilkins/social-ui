import { NextPage } from "next";
import PostForm from "../../../components/Posts/Form";
import PostsList from "../../../components/Posts/List";
import LevelOneHeading from "../../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../../hooks/common";

const AdminPosts: NextPage = () => {
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 25 }}>
        {t("posts.labels.posts")}
      </LevelOneHeading>

      <PostForm sx={{ marginBottom: 2 }} />
      <PostsList sx={{ marginBottom: 15 }} />
    </>
  );
};

export default AdminPosts;
