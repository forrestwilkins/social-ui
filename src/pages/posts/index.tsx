import { NextPage } from "next";
import PostsList from "../../components/Posts/List";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../hooks/common";

const PostsIndex: NextPage = () => {
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 25 }}>
        {t("posts.labels.posts")}
      </LevelOneHeading>

      <PostsList sx={{ marginBottom: 15 }} />
    </>
  );
};

export default PostsIndex;
