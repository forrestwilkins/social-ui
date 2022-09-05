import { useMutation } from "@apollo/client";
import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UPDATE_USER_MUTATION } from "../../../client/users/mutations";
import ProgressBar from "../../../components/Shared/ProgressBar";
import UserForm from "../../../components/Users/Form";
import { useTranslate } from "../../../hooks/common";
import { useUserByNameQuery } from "../../../hooks/user";
import { UpdateUserMutation, UserFormValues } from "../../../types/user";
import { redirectTo } from "../../../utils/common";
import { getUserProfilePath } from "../../../utils/user";

const EditUser: NextPage = () => {
  const { query } = useRouter();
  const userName = String(query?.name || "");
  const [user, userLoading, error] = useUserByNameQuery(userName);
  const [updateUser] = useMutation<UpdateUserMutation>(UPDATE_USER_MUTATION);

  const t = useTranslate();

  const handleSubmit = async (formValues: UserFormValues) => {
    try {
      const { data } = await updateUser({
        variables: {
          userData: {
            id: user?.id,
            ...formValues,
          },
        },
      });
      if (!data) {
        throw Error(t("errors.somethingWentWrong"));
      }
      const path = getUserProfilePath(data.updateUser.name);
      redirectTo(path);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (userLoading) {
    return <ProgressBar />;
  }

  if (!user) {
    return null;
  }

  const initialValues: UserFormValues = {
    bio: user.bio || "",
    email: user.email,
    name: user.name,
  };

  return (
    <Card>
      <CardContent>
        <UserForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          submitButtonText={t("actions.save")}
          isEditing
        />
      </CardContent>
    </Card>
  );
};

export default EditUser;
