import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ProgressBar from "../../../components/Shared/ProgressBar";
import UserForm from "../../../components/Users/UserForm";
import { useTranslate } from "../../../hooks/common";
import { useUserQuery } from "../../../hooks/user";

const EditUser: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [user, userLoading, error] = useUserQuery(name);

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (userLoading) {
    return <ProgressBar />;
  }

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <UserForm
          editUser={user}
          submitButtonText={t("actions.save")}
          isEditing
        />
      </CardContent>
    </Card>
  );
};

export default EditUser;
