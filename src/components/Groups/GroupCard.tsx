import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isLoggedInVar } from "../../apollo/cache";
import { GroupCardFragment, useDeleteGroupMutation } from "../../apollo/gen";
import { removeGroup } from "../../apollo/groups/mutations/DeleteGroup.mutation";
import {
  MIDDOT_WITH_SPACES,
  ResourceNames,
} from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  getGroupMembersPath,
  getGroupPath,
  getMemberRequestsPath,
} from "../../utils/group.utils";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";
import JoinButton from "./JoinButton";

const CardHeader = styled(MuiCardHeader)(() => ({
  paddingBottom: 0,
}));

interface Props extends CardProps {
  currentUserId?: number;
  group: GroupCardFragment;
}

// TODO: Add remaining layout and functionality
const GroupCard = ({ group, currentUserId, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();

  const t = useTranslate();

  const { id, name, description, members, memberRequestCount } = group;
  const isMember =
    isLoggedIn && !!members.find(({ user }) => currentUserId === user.id);

  const groupMembersPath = getGroupMembersPath(name);
  const memberRequestsPath = getMemberRequestsPath(name);
  const groupPath = getGroupPath(name);

  const handleDelete = async (id: number) =>
    await deleteGroup({
      variables: { id },
      update: removeGroup(id),
    });

  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={<GroupAvatar group={group} />}
        title={<Link href={groupPath}>{name}</Link>}
        action={
          // TODO: Add permission logic for edit and delete
          isMember && (
            <ItemMenu
              anchorEl={menuAnchorEl}
              deleteItem={handleDelete}
              itemId={id}
              itemType={ResourceNames.Group}
              name={name}
              setAnchorEl={setMenuAnchorEl}
              canDelete
              canEdit
            />
          )
        }
      />
      <CardContent>
        <Typography sx={{ marginBottom: 1.25 }}>{description}</Typography>

        <Box sx={{ marginBottom: 1.75 }}>
          <Link href={groupMembersPath}>
            {t("groups.members", { count: members.length })}
          </Link>
          {isMember && (
            <>
              {MIDDOT_WITH_SPACES}
              <Link href={memberRequestsPath}>
                {t("groups.requests", { count: memberRequestCount })}
              </Link>
            </>
          )}
        </Box>

        {isLoggedIn && <JoinButton groupId={id} isMember={isMember} />}
      </CardContent>
    </Card>
  );
};

export default GroupCard;
