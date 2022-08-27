import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardHeaderProps,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isLoggedInVar } from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { useDeletePostMutation } from "../../hooks/post";
import { useUserQuery } from "../../hooks/user";
import { Post } from "../../types/post";
import { redirectTo } from "../../utils/common";
import ImagesList from "../Images/List";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/Avatar";

const CardHeader = styled(MuiCardHeader)<CardHeaderProps>(() => ({
  "& .MuiCardHeader-avatar": {
    marginRight: 11,
  },
  "& .MuiCardHeader-title": {
    fontSize: 15,
  },
}));

interface Props extends CardProps {
  post: Post;
}

const PostCard = ({
  post: { id, body, images, userId },
  ...cardProps
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const deletePost = useDeletePostMutation();
  const [user] = useUserQuery(userId);

  const linkToPostPage = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = `/${ResourceNames.User}/${user?.name}/profile`;

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
          avatar={<UserAvatar userId={userId} withLink />}
          title={<Link href={userProfilePath}>{user?.name}</Link>}
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
