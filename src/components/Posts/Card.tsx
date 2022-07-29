import { Card, CardContent, CardProps, Typography } from "@mui/material";
import { NavigationPaths } from "../../constants/common";
import { Post } from "../../types/post";
import ImagesList from "../Images/List";
import Link from "../Shared/Link";

interface Props extends CardProps {
  post: Post;
}

const PostCard = ({ post, ...cardProps }: Props) => {
  const linkToEditPostPage = `${NavigationPaths.Posts}/${post.id}`;

  return (
    <Link href={linkToEditPostPage}>
      <Card sx={{ marginBottom: 1.5 }} {...cardProps} elevation={0}>
        <CardContent>
          <ImagesList images={post.images} />
          <Typography>{post.body}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
