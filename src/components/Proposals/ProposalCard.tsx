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
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { ProposalCardFragment, useMeQuery } from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
} from "../../constants/common.constants";
import { inDevToast, redirectTo } from "../../utils/common.utils";
import { getGroupPath } from "../../utils/group.utils";
import { getProposalActionLabel } from "../../utils/proposal.utils";
import { timeAgo } from "../../utils/time.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import GroupItemAvatar from "../Groups/GroupItemAvatar";
import AttachedImageList from "../Images/AttachedImageList";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import ProposalCardFooter from "./ProposalCardFooter";

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
  proposal: ProposalCardFragment;
}

const ProposalCard = ({ proposal, ...cardProps }: Props) => {
  const { data } = useMeQuery();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const { asPath } = useRouter();
  const { t } = useTranslation();

  const { id, body, images, action, user, group, createdAt } = proposal;
  const me = data && data.me;
  const isMe = me?.id === user.id;
  const formattedDate = timeAgo(createdAt);

  const groupPath = getGroupPath(group?.name || "");
  const isGroupPage = asPath.includes(NavigationPaths.Groups);
  const isProposalPage = asPath.includes(NavigationPaths.Proposals);
  const proposalPath = `${NavigationPaths.Proposals}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);

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
    if (isProposalPage) {
      await redirectTo(NavigationPaths.Home);
    }

    console.log("TODO: Add delete logic here", id);
    inDevToast();
  };

  const renderAvatar = () => {
    if (group && !isGroupPage) {
      return <GroupItemAvatar user={user} group={group} />;
    }
    return <UserAvatar user={user} withLink />;
  };

  const renderTitle = () => {
    const actionLabel = getProposalActionLabel(action, t);
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
            sx={showGroup ? { color: "inherit" } : undefined}
          >
            {user?.name}
          </Link>
          {MIDDOT_WITH_SPACES}

          {isGroupPage && (
            <>
              <Link href={proposalPath} sx={{ color: "inherit", fontSize: 13 }}>
                {actionLabel}
              </Link>
              {MIDDOT_WITH_SPACES}
            </>
          )}

          <Link href={proposalPath} sx={{ color: "inherit", fontSize: 13 }}>
            {formattedDate}
          </Link>
        </Box>
      </Box>
    );
  };

  const renderMenu = () => {
    const editPath = `${NavigationPaths.Proposals}/${id}${NavigationPaths.Edit}`;
    const deletePrompt = t("prompts.deleteItem", { itemType: "proposal" });
    return (
      <ItemMenu
        anchorEl={menuAnchorEl}
        canDelete={isMe}
        canEdit={isMe}
        deleteItem={handleDelete}
        deletePrompt={deletePrompt}
        editPath={editPath}
        itemId={id}
        setAnchorEl={setMenuAnchorEl}
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
          <Link
            aria-label={t("images.labels.attachedImages")}
            href={proposalPath}
          >
            <AttachedImageList images={images} sx={imageListStyles} />
          </Link>
        )}

        {isLoggedIn && <Divider />}
      </CardContent>

      {isLoggedIn && <ProposalCardFooter />}
    </Card>
  );
};

export default ProposalCard;
