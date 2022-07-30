import { NextPage } from "next";
import { useRouter } from "next/router";
import PostCard from "../../components/Posts/Card";
import ProgressBar from "../../components/Shared/ProgressBar";
import { usePostQuery } from "../../hooks/post";

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const postId = parseInt(String(query?.id));
  const [post, isPostLoading] = usePostQuery(postId);

  if (isPostLoading) {
    return <ProgressBar />;
  }

  if (!post) {
    return null;
  }

  return <PostCard post={post} />;
};

export default EditPostPage;
