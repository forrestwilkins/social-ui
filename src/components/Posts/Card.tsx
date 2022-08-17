import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isLoggedInVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useDeletePostMutation } from "../../hooks/post";
import { Post } from "../../types/post";
import { redirectTo } from "../../utils/common";
import ImagesList from "../Images/List";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";

interface Props extends CardProps {
  post: Post;
}

const PostCard = ({ post: { id, body, images }, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const deletePost = useDeletePostMutation();

  const linkToPostPage = `${NavigationPaths.Posts}/${id}`;

  const handleDelete = (id: number) => {
    deletePost(id);
    redirectTo(NavigationPaths.Home);
  };

  return (
    <Card sx={{ marginBottom: 2 }} {...cardProps}>
      {isLoggedIn && (
        <CardHeader
          action={
            <ItemMenu
              anchorEl={menuAnchorEl}
              canDelete
              canEdit
              deleteItem={handleDelete}
              itemId={id}
              itemType={"post"}
              setAnchorEl={setMenuAnchorEl}
            />
          }
        />
      )}
      <CardContent>
        {!!images.length && (
          <Link href={linkToPostPage}>
            <ImagesList images={images} />
          </Link>
        )}
        {body && <Typography>{body}</Typography>}
      </CardContent>
    </Card>
  );
};

export default PostCard;
