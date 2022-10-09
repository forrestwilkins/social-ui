import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../../client/cache";
import GroupForm from "../../components/Groups/GroupForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import { useTranslate } from "../../hooks/common";

const GroupsIndex: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const t = useTranslate();

  return (
    <>
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 20 }}>
        {t("groups.headers.discoverGroups")}
      </LevelOneHeading>

      {isLoggedIn && <GroupForm />}
    </>
  );
};

export default GroupsIndex;
