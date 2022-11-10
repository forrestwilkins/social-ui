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
import { isLoggedInVar } from "../../client/cache";
import { removeGroup } from "../../client/groups/group.cache";
import {
  MIDDOT_WITH_SPACES,
  ResourceNames,
} from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { Group, useDeleteGroupMutation } from "../../types/generated.types";
import { getGroupPath, getMemberRequestsPath } from "../../utils/group.utils";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";
import JoinButton from "./JoinButton";

const CardHeader = styled(MuiCardHeader)(() => ({
  paddingBottom: 0,
}));

interface Props extends CardProps {
  group: Group;
}

// TODO: Add remaining layout and functionality
const GroupCard = ({ group, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();

  const t = useTranslate();

  const { id, name, description } = group;
  const groupPath = getGroupPath(name);
  const memberRequestsPath = getMemberRequestsPath(name);

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
        }
      />
      <CardContent>
        <Typography sx={{ marginBottom: 1.25 }}>{description}</Typography>

        {/* TODO: Add functionality for members and member requests */}
        <Box sx={{ marginBottom: 1.75 }}>
          <Link href={"/"} disabled>
            {t("groups.members", { count: group.memberCount })}
          </Link>
          {isLoggedIn && (
            <>
              {MIDDOT_WITH_SPACES}
              <Link href={memberRequestsPath}>
                {t("groups.requests", { count: group.memberRequestCount })}
              </Link>
            </>
          )}
        </Box>

        {isLoggedIn && <JoinButton groupId={group.id} />}
      </CardContent>
    </Card>
  );
};

export default GroupCard;
