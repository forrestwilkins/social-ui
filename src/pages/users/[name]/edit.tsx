import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ProgressBar from "../../../components/Shared/ProgressBar";
import EditProfileForm from "../../../components/Users/EditProfileForm";
import { useTranslate } from "../../../hooks/common.hooks";
import { useUserQuery } from "../../../apollo/generated";

const EditUser: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const t = useTranslate();

  const { data, loading, error } = useUserQuery({
    variables: { name },
    skip: !name,
  });

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data?.user) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <EditProfileForm
          editUser={data.user}
          submitButtonText={t("actions.save")}
        />
      </CardContent>
    </Card>
  );
};

export default EditUser;
