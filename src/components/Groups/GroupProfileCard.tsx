// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { HowToVote } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isLoggedInVar } from "../../apollo/cache";
import { removeGroup } from "../../apollo/groups/mutations/DeleteGroup.mutation";
import {
  MIDDOT_WITH_SPACES,
  ResourceNames,
} from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  GroupProfileCardFragment,
  useDeleteGroupMutation,
} from "../../types/generated.types";
import { getMemberRequestsPath } from "../../utils/group.utils";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import JoinButton from "./JoinButton";

const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 5,
  fontSize: 25,
}));
const DetailsBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const CardHeader = styled(MuiCardHeader)(() => ({
  marginTop: 7.5,
  paddingBottom: 0,
  paddingRight: 22,
}));

interface Props extends CardProps {
  group: GroupProfileCardFragment;
}

const GroupProfileCard = ({
  group: { id, name, coverPhoto, memberCount, memberRequestCount },
  ...cardProps
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();
  const t = useTranslate();

  const memberRequestsPath = getMemberRequestsPath(name);

  const nameTextStyles: SxProps = {
    marginTop: isLoggedIn ? -7 : -0.3,
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

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={coverPhoto?.id} />
      {isLoggedIn && (
        <CardHeader
          action={
            <>
              <JoinButton groupId={id} />

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
            </>
          }
        />
      )}
      <CardContent>
        <NameText color="primary" variant="h2" sx={nameTextStyles}>
          {name}
        </NameText>

        <DetailsBox>
          <Link href={"/"} disabled>
            <HowToVote sx={voteIconStyles} />
            {t("groups.labels.majority")}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={"/"} disabled>
            {t("groups.members", { count: memberCount })}
          </Link>

          {isLoggedIn && (
            <>
              {MIDDOT_WITH_SPACES}
              <Link href={memberRequestsPath}>
                {t("groups.requests", { count: memberRequestCount })}
              </Link>
            </>
          )}
        </DetailsBox>
      </CardContent>
    </Card>
  );
};

export default GroupProfileCard;
