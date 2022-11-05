// TODO: Use UserForm for both sign up and login if possible

import { Divider, FormGroup, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toastVar } from "../../client/cache";
import { UserFieldNames } from "../../constants/user.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { useUpdateUserMutation } from "../../hooks/user.hooks";
import { User } from "../../types/generated.types";
import { UserFormValues } from "../../types/user.types";
import { redirectTo } from "../../utils/common.utils";
import { buildImageData } from "../../utils/image.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import CoverPhoto from "../Images/CoverPhoto";
import ImageInput from "../Images/ImageInput";
import Center from "../Shared/Center";
import CompactButton from "../Shared/CompactButton";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";
import UserAvatar from "./UserAvatar";

interface Props {
  editUser?: User;
  isEditing?: boolean;
  submitButtonText: string;
}

const UserForm = ({ isEditing, editUser, submitButtonText }: Props) => {
  const updateUser = useUpdateUserMutation();
  const [profilePicture, setProfilePicture] = useState<File>();
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const t = useTranslate();

  const initialValues: UserFormValues = {
    bio: editUser?.bio || "",
    email: editUser?.email || "",
    name: editUser?.name || "",
  };

  const handleSubmit = async (formValues: UserFormValues) => {
    try {
      if (editUser) {
        const profilePictureData = buildImageData(profilePicture);
        const coverPhotoData = buildImageData(coverPhoto);
        const updatedUser = await updateUser(
          editUser.id,
          formValues,
          profilePictureData,
          coverPhotoData
        );
        if (!updatedUser) {
          toastVar({ status: "error", title: t("errors.somethingWentWrong") });
          return;
        }
        const path = getUserProfilePath(updatedUser.name);
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
                  user={editUser}
                  imageFile={profilePicture}
                  sx={{ width: 140, height: 140 }}
                />
              </Center>

              <Divider sx={{ marginBottom: 1.5 }} />

              <Flex
                sx={{ justifyContent: "space-between", marginBottom: 1.25 }}
              >
                <Typography color="primary">
                  {t("users.form.coverPhoto")}
                </Typography>
                <ImageInput setImage={setCoverPhoto}>
                  <CompactButton sx={{ marginTop: -0.5 }}>
                    {t("actions.edit")}
                  </CompactButton>
                </ImageInput>
              </Flex>

              <CoverPhoto
                imageFile={coverPhoto}
                imageId={editUser?.coverPhoto?.id}
                rounded
                sx={{ marginBottom: 3 }}
              />

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
            <PrimaryActionButton
              disabled={
                formik.isSubmitting ||
                (!formik.dirty && !profilePicture && !coverPhoto)
              }
              type="submit"
            >
              {submitButtonText}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
