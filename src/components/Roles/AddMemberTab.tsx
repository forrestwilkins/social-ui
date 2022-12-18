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

const CardContent = styled(MuiCardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: 12,
  paddingTop: 13,
}));

interface Props {
  role: AddMemberTabFragment;
}

const AddMemberTab = ({ role }: Props) => {
  const t = useTranslate();

  const addCircleStyles = {
    fontSize: 23,
    marginRight: 1.25,
  };

  return (
    <>
      <Card sx={{ cursor: "pointer" }} onClick={() => inDevToast()}>
        <CardActionArea>
          <CardContent>
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
          </CardContent>
        </CardActionArea>
      </Card>

      <Card>
        {/* TODO: List role members here */}
        <CardContent>{JSON.stringify(role.members)}</CardContent>
      </Card>
    </>
  );
};

export default AddMemberTab;
