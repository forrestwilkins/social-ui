import { useReactiveVar } from "@apollo/client";
import { Comment, Favorite, Reply } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader as MuiCardHeader,
  CardHeaderProps,
  CardProps,
  Divider,
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
import { inDevToast, redirectTo } from "../../utils/common";
import { getUserProfilePath } from "../../utils/user";
import ImagesList from "../Images/List";
import CardFooterButton from "../Shared/CardFooterButton";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/Avatar";

const SHARED_ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES = {
  ...SHARED_ICON_STYLES,
  transform: "rotateY(180deg)",
};

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
  sx,
  ...cardProps
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const deletePost = useDeletePostMutation();
  const [user] = useUserQuery(userId);

  const t = useTranslate();

  const linkToPostPage = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);

  const bodyStyles: SxProps = { marginBottom: images.length ? 2.5 : 3.5 };
  const cardContentStyles: SxProps = {
    paddingTop: images.length && !body ? 1.25 : 3,
    paddingBottom: 0,
  };

  const handleDelete = (id: number) => {
    deletePost(id);
    redirectTo(NavigationPaths.Home);
  };

  return (
    <Card sx={{ marginBottom: 2, ...sx }} {...cardProps}>
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
        avatar={<UserAvatar user={user} withLink />}
        title={<Link href={userProfilePath}>{user?.name}</Link>}
      />

      <CardContent sx={cardContentStyles}>
        {body && <Typography sx={bodyStyles}>{body}</Typography>}

        {!!images.length && (
          <Link
            aria-label={t("images.labels.attachedImages")}
            href={linkToPostPage}
          >
            <ImagesList images={images} />
          </Link>
        )}

        <Divider />
      </CardContent>

      {isLoggedIn && (
        <CardActions
          sx={{ justifyContent: "space-around" }}
          onClick={inDevToast}
        >
          <CardFooterButton>
            <Favorite sx={SHARED_ICON_STYLES} />
            {t("posts.actions.like")}
          </CardFooterButton>
          <CardFooterButton>
            <Comment sx={ROTATED_ICON_STYLES} />
            {t("posts.actions.comment")}
          </CardFooterButton>
          <CardFooterButton>
            <Reply sx={ROTATED_ICON_STYLES} />
            {t("posts.actions.share")}
          </CardFooterButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
