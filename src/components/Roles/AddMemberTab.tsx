import { AddCircle, ArrowForwardIos } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { AddMemberTabFragment } from "../../apollo/gen";
import { useTranslate } from "../../hooks/common.hooks";
import { inDevToast } from "../../utils/common.utils";
import Flex from "../Shared/Flex";
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
}

const AddMemberTab = ({ role: { members } }: Props) => {
  const t = useTranslate();

  const addCircleStyles = {
    fontSize: 23,
    marginRight: 1.25,
  };

  return (
    <>
      <Card sx={{ cursor: "pointer" }} onClick={() => inDevToast()}>
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
