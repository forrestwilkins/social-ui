// TODO: Use UserForm for both sign up and login if possible

import { useMutation } from "@apollo/client";
import { Button, Divider, FormGroup, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { UPDATE_USER_MUTATION } from "../../client/users/mutations";
import Flex from "../../components/Shared/Flex";
import Spinner from "../../components/Shared/Spinner";
import { TextField } from "../../components/Shared/TextField";
import { UserFieldNames } from "../../constants/user";
import { useTranslate } from "../../hooks/common";
import { UpdateUserMutation, User, UserFormValues } from "../../types/user";
import { redirectTo } from "../../utils/common";
import { getUserProfilePath } from "../../utils/user";
import ImageInput from "../Images/Input";
import Center from "../Shared/Center";
import CompactButton from "../Shared/CompactButton";
import UserAvatar from "./Avatar";

interface Props {
  isEditing?: boolean;
  submitButtonText: string;
  editUser?: User;
}

const UserForm = ({ isEditing, editUser, submitButtonText }: Props) => {
  const [updateUser] = useMutation<UpdateUserMutation>(UPDATE_USER_MUTATION);
  const [profilePicture, setProfilePicture] = useState<File>();
  const t = useTranslate();

  const initialValues: UserFormValues = {
    bio: editUser?.bio || "",
    email: editUser?.email || "",
    name: editUser?.name || "",
  };

  const handleSubmit = async (formValues: UserFormValues) => {
    try {
      if (editUser) {
        const { data } = await updateUser({
          variables: {
            userData: {
              id: editUser?.id,
              ...formValues,
            },
          },
        });
        if (!data) {
          throw Error(t("errors.somethingWentWrong"));
        }
        const path = getUserProfilePath(data.updateUser.name);
        redirectTo(path);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          {isEditing && (
            <>
              <Flex sx={{ justifyContent: "space-between", marginBottom: 2 }}>
                <Typography color="primary">
                  {t("users.form.profilePicture")}
                </Typography>

                <ImageInput setImage={setProfilePicture}>
                  <CompactButton sx={{ marginTop: -0.5 }}>
                    {t("actions.edit")}
                  </CompactButton>
                </ImageInput>
              </Flex>

              <Center sx={{ marginBottom: 3 }}>
                <UserAvatar
                  userId={editUser?.id}
                  imageFile={profilePicture}
                  sx={{ width: 140, height: 140 }}
                />
              </Center>

              <Divider sx={{ marginBottom: 3 }} />
            </>
          )}

          <FormGroup>
            {!isEditing && (
              <TextField
                label={t("users.form.email")}
                name={UserFieldNames.Email}
              />
            )}
            <TextField
              label={t("users.form.name")}
              name={UserFieldNames.Name}
            />
            {isEditing && (
              <TextField
                autoComplete="off"
                label={t("users.form.bio")}
                name={UserFieldNames.Bio}
              />
            )}
            {!isEditing && (
              <TextField
                label={t("users.form.password")}
                name={UserFieldNames.Password}
                type="password"
              />
            )}
          </FormGroup>

          <Flex flexEnd>
            <Button
              type="submit"
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {submitButtonText}
              {formik.isSubmitting && (
                <Spinner size={10} sx={{ marginLeft: 1 }} />
              )}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
