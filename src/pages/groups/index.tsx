import { useQuery, useReactiveVar } from "@apollo/client";
import { Groups } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { isLoggedInVar } from "../../client/cache";
import { GROUPS_QUERY } from "../../client/groups/queries";
import GroupForm from "../../components/Groups/GroupForm";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common";
import { GroupsQuery } from "../../types/group";

const GroupsIndex: NextPage = () => {
  const { data, loading, error } = useQuery<GroupsQuery>(GROUPS_QUERY);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>
        {t("groups.headers.discoverGroups")}
      </LevelOneHeading>

      {isLoggedIn && <GroupForm sx={{ marginBottom: 5 }} />}

      {data?.groups.map((group) => (
        <Flex key={group.id} sx={{ marginBottom: 1 }}>
          <Groups fontSize="small" sx={{ marginTop: 0.25, marginRight: 0.5 }} />
          <Typography>{group.name}</Typography>
        </Flex>
      ))}
    </>
  );
};

export default GroupsIndex;
