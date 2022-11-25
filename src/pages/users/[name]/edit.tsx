import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUserQuery } from "../../../apollo/gen";
import ProgressBar from "../../../components/Shared/ProgressBar";
import EditProfileForm from "../../../components/Users/EditProfileForm";
import { useTranslate } from "../../../hooks/common.hooks";

const EditUser: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useUserQuery({
    variables: { name },
    skip: !name,
  });

  const t = useTranslate();

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
          submitButtonText={t("actions.save")}
          user={data.user}
        />
      </CardContent>
    </Card>
  );
};

export default EditUser;
