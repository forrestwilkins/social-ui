import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardHeaderProps,
  CardProps,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isLoggedInVar } from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useDeletePostMutation } from "../../hooks/post";
import { useUserQuery } from "../../hooks/user";
import { Post } from "../../types/post";
import { redirectTo } from "../../utils/common";
import ImagesList from "../Images/List";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/Avatar";

const CardHeader = styled(MuiCardHeader)<CardHeaderProps>(() => ({
  paddingBottom: 0,
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

  const t = useTranslate();

  const linkToPostPage = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = `/${ResourceNames.User}/${user?.name}/profile`;
  const cardContentStyles: SxProps = {
    paddingTop: images.length && !body ? 1.25 : 3,
  };

  const handleDelete = (id: number) => {
    deletePost(id);
    redirectTo(NavigationPaths.Home);
  };

  return (
    <Card sx={{ marginBottom: 2 }} {...cardProps}>
      <CardHeader
        action={
          // TODO: Add permission logic for edit and delete
          isLoggedIn && (
            <ItemMenu
              anchorEl={menuAnchorEl}
              canDelete
              canEdit
              deleteItem={handleDelete}
              itemId={id}
              itemType={ResourceNames.Post}
              setAnchorEl={setMenuAnchorEl}
            />
          )
        }
        avatar={<UserAvatar userId={userId} withLink />}
        title={<Link href={userProfilePath}>{user?.name}</Link>}
      />

      <CardContent sx={cardContentStyles}>
        {body && <Typography>{body}</Typography>}

        {!!images.length && (
          <Link
            aria-label={t("images.labels.attachedImages")}
            href={linkToPostPage}
          >
            <ImagesList images={images} />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
