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
    <Card sx={{ marginBottom: 1.5 }} {...cardProps} elevation={0}>
      <CardContent>
        <Link href={linkToEditPostPage}>
          <ImagesList images={post.images} />
        </Link>
        <Typography>{post.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
