import { AddCircle, ArrowForwardIos } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  AddMemberTabFragment,
  UserAvatarFragment,
  useUpdateRoleMutation,
} from "../../apollo/gen";
import { useTranslate } from "../../hooks/common.hooks";
import Dialog from "../Shared/Dialog";
import Flex from "../Shared/Flex";
import AddMemberOption from "./AddMemberOption";
import RoleMember from "./RoleMember";

const FlexCardContent = styled(MuiCardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: 12,
  paddingTop: 13,
}));

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

interface Props {
  role: AddMemberTabFragment;
  users: UserAvatarFragment[];
}

const AddMemberTab = ({ role: { id, members }, users }: Props) => {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateRole] = useUpdateRoleMutation();

  const t = useTranslate();

  const addCircleStyles = {
    fontSize: 23,
    marginRight: 1.25,
  };

  const handleAddMembersCardClick = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSubmit = async () =>
    await updateRole({
      variables: {
        roleData: { id, selectedUserIds },
      },
      onCompleted() {
        handleCloseDialog();
        setSelectedUserIds([]);
      },
    });

  return (
    <>
      <Card sx={{ cursor: "pointer" }} onClick={handleAddMembersCardClick}>
        <CardActionArea>
          <FlexCardContent>
            <Flex>
              <AddCircle color="primary" sx={addCircleStyles} />
              <Typography color="primary">
                {t("roles.actions.addMembers")}
              </Typography>
            </Flex>
            <ArrowForwardIos
              color="primary"
              fontSize="small"
              sx={{ transform: "translateY(2px)" }}
            />
          </FlexCardContent>
        </CardActionArea>
      </Card>

      <Dialog
        title={t("roles.actions.addMembers")}
        actionLabel={t("roles.actions.add")}
        closingAction={handleSubmit}
        onClose={handleCloseDialog}
        open={dialogOpen}
      >
        {users.map((user) => (
          <AddMemberOption
            key={user.id}
            selectedUserIds={selectedUserIds}
            setSelectedUserIds={setSelectedUserIds}
            user={user}
          />
        ))}
      </Dialog>

      {!!members.length && (
        <Card>
          <CardContent>
            {members.map((member) => (
              <RoleMember roleMember={member} key={member.id} />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AddMemberTab;
