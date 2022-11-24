// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { HowToVote } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isLoggedInVar } from "../../apollo/cache";
import {
  CurrentMemberFragment,
  GroupProfileCardFragment,
  useDeleteGroupMutation,
} from "../../apollo/gen";
import { removeGroup } from "../../apollo/groups/mutations/DeleteGroup.mutation";
import {
  MIDDOT_WITH_SPACES,
  ResourceNames,
} from "../../constants/common.constants";
import { useAboveBreakpoint, useTranslate } from "../../hooks/common.hooks";
import {
  getGroupMembersPath,
  getMemberRequestsPath,
} from "../../utils/group.utils";
import CoverPhoto from "../Images/CoverPhoto";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import JoinButton from "./JoinButton";

const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 7.5,
}));
const DetailsBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const CardHeader = styled(MuiCardHeader)(() => ({
  marginTop: 7.5,
  paddingBottom: 0,
  paddingRight: 22,
}));
const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

interface Props extends CardProps {
  group: GroupProfileCardFragment;
  currentMember?: CurrentMemberFragment;
}

const GroupProfileCard = ({ group, currentMember, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();

  const isAboveMedium = useAboveBreakpoint("md");
  const isAboveSmall = useAboveBreakpoint("sm");
  const t = useTranslate();

  const { id, name, coverPhoto, members, memberRequestCount } = group;
  const groupMembersPath = getGroupMembersPath(name);
  const memberRequestsPath = getMemberRequestsPath(name);
  const showCardHeader = isLoggedIn && isAboveSmall;

  const getNameTextWidth = () => {
    if (isAboveMedium) {
      return "75%";
    }
    if (isAboveSmall) {
      return "70%";
    }
    return "100%";
  };

  const nameTextStyles: SxProps = {
    fontSize: isAboveSmall ? 25 : 23,
    marginTop: showCardHeader ? -7 : -0.3,
    width: getNameTextWidth(),
  };
  const voteIconStyles: SxProps = {
    marginBottom: -0.5,
    marginRight: "0.2ch",
  };

  const handleDelete = async (id: number) =>
    await deleteGroup({
      variables: { id },
      update: removeGroup(id),
    });

  const renderCardActions = () => (
    <>
      <JoinButton groupId={id} currentMember={currentMember} />

      {currentMember && (
        <ItemMenu
          anchorEl={menuAnchorEl}
          buttonStyles={{ paddingX: 0, minWidth: 38 }}
          deleteItem={handleDelete}
          itemId={id}
          itemType={ResourceNames.Group}
          name={name}
          setAnchorEl={setMenuAnchorEl}
          variant="ghost"
          canDelete
          canEdit
        />
      )}
    </>
  );

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={coverPhoto?.id} />
      {showCardHeader && <CardHeader action={renderCardActions()} />}
      <CardContent>
        <NameText color="primary" variant="h2" sx={nameTextStyles}>
          {name}
        </NameText>

        <DetailsBox fontSize={isAboveSmall ? undefined : 15}>
          <Link href={"/"} disabled>
            <HowToVote sx={voteIconStyles} />
            {t("groups.labels.majority")}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={groupMembersPath}>
            {t("groups.members", { count: members.length })}
          </Link>

          {currentMember && (
            <>
              {MIDDOT_WITH_SPACES}
              <Link href={memberRequestsPath}>
                {t("groups.requests", { count: memberRequestCount })}
              </Link>
            </>
          )}
        </DetailsBox>

        {isLoggedIn && !isAboveSmall && (
          <Flex sx={{ justifyContent: "right", marginTop: 2 }}>
            {renderCardActions()}
          </Flex>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupProfileCard;
