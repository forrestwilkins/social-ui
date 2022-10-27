import { useQuery, useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { isLoggedInVar } from "../../client/cache";
import { GROUPS_QUERY } from "../../client/groups/queries";
import GroupCard from "../../components/Groups/GroupCard";
import GroupForm from "../../components/Groups/GroupForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common.hooks";
import { GroupsQuery } from "../../types/group.types";

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

      {isLoggedIn && <GroupForm />}

      {data?.groups.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
    </>
  );
};

export default GroupsIndex;
