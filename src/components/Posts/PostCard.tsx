import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent as MuiCardContent,
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
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
  ResourceNames,
} from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useDeletePostMutation } from "../../hooks/post";
import { useMeQuery } from "../../hooks/user";
import { Post } from "../../types/post";
import { redirectTo } from "../../utils/common";
import { timeAgo } from "../../utils/time";
import { getUserProfilePath } from "../../utils/user";
import ImagesList from "../Images/ImageList";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import PostCardFooter from "./PostCardFooter";

const CardHeader = styled(MuiCardHeader)<CardHeaderProps>(() => ({
  paddingBottom: 0,
  "& .MuiCardHeader-avatar": {
    marginRight: 11,
  },
  "& .MuiCardHeader-title": {
    fontSize: 15,
  },
}));

const CardContent = styled(MuiCardContent)(() => ({
  paddingBottom: 0,
  "&:last-child": {
    paddingBottom: 0,
  },
}));

interface Props extends CardProps {
  post: Post;
}

const PostCard = ({
  post: { id, body, images, user, createdAt },
  sx,
  ...cardProps
}: Props) => {
  const [me] = useMeQuery();
  const deletePost = useDeletePostMutation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const t = useTranslate();

  const linkToPostPage = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);
  const formattedDate = timeAgo(createdAt);
  const isMe = me?.id === user.id;

  const bodyStyles: SxProps = {
    marginBottom: images.length ? 2.5 : 3.5,
  };
  const cardContentStyles: SxProps = {
    paddingTop: images.length && !body ? 1.25 : 3,
  };
  const imageListStyles: SxProps = {
    marginBottom: isLoggedIn ? 1.9 : 0,
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
          isMe && (
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
        title={
          <span style={{ fontSize: 14 }}>
            <Link href={userProfilePath}>{user?.name}</Link>
            {MIDDOT_WITH_SPACES}
            <Link href={linkToPostPage} style={{ color: "inherit" }}>
              {formattedDate}
            </Link>
          </span>
        }
      />

      <CardContent sx={cardContentStyles}>
        {body && <Typography sx={bodyStyles}>{body}</Typography>}

        {!!images.length && (
          <Link
            aria-label={t("images.labels.attachedImages")}
            href={linkToPostPage}
          >
            <ImagesList images={images} sx={imageListStyles} />
          </Link>
        )}

        {isLoggedIn && <Divider />}
      </CardContent>

      {isLoggedIn && <PostCardFooter />}
    </Card>
  );
};

export default PostCard;
