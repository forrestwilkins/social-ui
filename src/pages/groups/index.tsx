import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { isLoggedInVar } from "../../apollo/cache";
import { useGroupsQuery } from "../../apollo/gen";
import GroupCard from "../../components/Groups/GroupCard";
import GroupForm from "../../components/Groups/GroupForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { UNAUTHORIZED } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";

const GroupsIndex: NextPage = () => {
  const { data, loading, error } = useGroupsQuery();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const t = useTranslate();

  if (error?.message === UNAUTHORIZED) {
    return <Typography>{t("groups.prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const { groups, me } = data;

  return (
    <>
      <LevelOneHeading header>
        {t("groups.headers.discoverGroups")}
      </LevelOneHeading>

      {isLoggedIn && <GroupForm />}

      {groups.map((group) => (
        <GroupCard group={group} currentUserId={me?.id} key={group.id} />
      ))}
    </>
  );
};

export default GroupsIndex;
