import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  Divider,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
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
import GroupItemAvatar from "../Groups/GroupItemAvatar";
import ImageList from "../Images/ImageList";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import PostCardFooter from "./PostCardFooter";

const CardHeader = styled(MuiCardHeader)(() => ({
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
  post: { id, body, images, user, group, createdAt },
  ...cardProps
}: Props) => {
  const [me] = useMeQuery();
  const deletePost = useDeletePostMutation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const { asPath } = useRouter();
  const t = useTranslate();

  const isMe = me?.id === user.id;
  const isPostPage = asPath.includes(NavigationPaths.Posts);
  const postPath = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);
  const formattedDate = timeAgo(createdAt);

  const bodyStyles: SxProps = {
    marginBottom: images.length ? 2.5 : 3.5,
  };
  const cardContentStyles: SxProps = {
    paddingTop: images.length && !body ? 2.5 : 3,
  };
  const imageListStyles: SxProps = {
    marginBottom: isLoggedIn ? 1.9 : 0,
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    if (isPostPage) {
      redirectTo(NavigationPaths.Home);
    }
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={
          group ? (
            <GroupItemAvatar user={user} group={group} />
          ) : (
            <UserAvatar user={user} withLink />
          )
        }
        title={
          <span style={{ fontSize: 14 }}>
            <Link href={userProfilePath}>{user?.name}</Link>
            {MIDDOT_WITH_SPACES}
            <Link href={postPath} style={{ color: "inherit" }}>
              {formattedDate}
            </Link>
          </span>
        }
        action={
          isMe && (
            <ItemMenu
              anchorEl={menuAnchorEl}
              deleteItem={handleDelete}
              itemId={id}
              itemType={ResourceNames.Post}
              setAnchorEl={setMenuAnchorEl}
              // TODO: Add permission logic for edit and delete
              canDelete
              canEdit
            />
          )
        }
      />

      <CardContent sx={cardContentStyles}>
        {body && <Typography sx={bodyStyles}>{body}</Typography>}

        {!!images.length && (
          <Link aria-label={t("images.labels.attachedImages")} href={postPath}>
            <ImageList images={images} sx={imageListStyles} />
          </Link>
        )}

        {isLoggedIn && <Divider />}
      </CardContent>

      {isLoggedIn && <PostCardFooter />}
    </Card>
  );
};

export default PostCard;
