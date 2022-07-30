import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavigationPaths } from "../../constants/common";
import { Post } from "../../types/post";
import ImagesList from "../Images/List";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";

interface Props extends CardProps {
  post: Post;
}

const PostCard = ({ post, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const linkToEditPostPage = `${NavigationPaths.Posts}/${post.id}`;

  return (
    <Card sx={{ marginBottom: 2 }} {...cardProps}>
      <CardHeader
        action={
          <ItemMenu
            itemId={post.id}
            itemType={"post"}
            anchorEl={menuAnchorEl}
            setAnchorEl={setMenuAnchorEl}
            canEdit={true}
          />
        }
      />
      <CardContent>
        <Link href={linkToEditPostPage}>
          <ImagesList images={post.images} />
        </Link>
        <Typography gutterBottom>{post.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
