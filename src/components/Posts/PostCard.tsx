import { useReactiveVar } from "@apollo/client";
import {
  Box,
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
import { getGroupPagePath } from "../../utils/group";
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
  const isGroupPage = asPath.includes(NavigationPaths.Groups);
  const postPath = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);
  const groupPath = getGroupPagePath(group?.name || "");
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

  const renderAvatar = () => {
    if (group) {
      return <GroupItemAvatar user={user} group={group} />;
    }
    return <UserAvatar user={user} withLink />;
  };

  const renderTitle = () => {
    const showGroup = group && !isGroupPage;
    return (
      <Box marginBottom={showGroup ? -0.5 : 0}>
        {showGroup && (
          <Link href={groupPath}>
            <Typography color="primary" lineHeight={1} fontSize={15}>
              {group.name}
            </Typography>
          </Link>
        )}
        <Box fontSize={14}>
          <Link
            href={userProfilePath}
            style={showGroup ? { color: "inherit" } : undefined}
          >
            {user?.name}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={postPath} style={{ color: "inherit", fontSize: 13 }}>
            {formattedDate}
          </Link>
        </Box>
      </Box>
    );
  };

  const renderMenu = () => {
    if (!isMe) {
      return null;
    }
    return (
      // TODO: Add permission logic for edit and delete
      <ItemMenu
        anchorEl={menuAnchorEl}
        deleteItem={handleDelete}
        itemId={id}
        itemType={ResourceNames.Post}
        setAnchorEl={setMenuAnchorEl}
        canDelete
        canEdit
      />
    );
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        action={renderMenu()}
        avatar={renderAvatar()}
        title={renderTitle()}
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
