import { Reference } from "@apollo/client";
import { Divider, FormGroup, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toastVar } from "../../apollo/cache";
import {
  EditProfileFormFragment,
  UpdateUserInput,
  useUpdateUserMutation,
} from "../../apollo/gen";
import {
  uploadProfilePicture,
  uploadUserCoverPhoto,
} from "../../apollo/users/mutations/UpdateUser.mutation";
import { UserFieldNames } from "../../constants/user.constants";
import { useTranslate } from "../../hooks/common.hooks";
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
  user: EditProfileFormFragment;
  submitButtonText: string;
}

const EditProfileForm = ({ user, submitButtonText }: Props) => {
  const [updateUser] = useUpdateUserMutation();
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [profilePicture, setProfilePicture] = useState<File>();
  const t = useTranslate();

  const initialValues: Omit<UpdateUserInput, "id"> = {
    bio: user.bio || "",
    name: user.name || "",
  };

  const handleSubmit = async (formValues: Omit<UpdateUserInput, "id">) =>
    await updateUser({
      variables: {
        userData: { id: user.id, ...formValues },
      },
      async update(cache, { data }) {
        if (!data || (!coverPhoto && !profilePicture)) {
          return;
        }
        const coverPhotoData = buildImageData(coverPhoto);
        const profilePictureData = buildImageData(profilePicture);

        const coverPhotoResult =
          coverPhotoData &&
          (await uploadUserCoverPhoto(user.id, coverPhotoData));
        const profilePictureResult =
          profilePictureData &&
          (await uploadProfilePicture(user.id, profilePictureData));

        cache.modify({
          id: cache.identify(user),
          fields: {
            coverPhoto(existingRef: Reference, { toReference }) {
              return coverPhotoResult
                ? toReference(coverPhotoResult)
                : existingRef;
            },
            profilePicture(existingRef: Reference, { toReference }) {
              return profilePictureResult
                ? toReference(profilePictureResult)
                : existingRef;
            },
          },
        });
      },
      onError(error) {
        toastVar({ status: "error", title: error.message });
      },
      onCompleted(data) {
        const path = getUserProfilePath(data.updateUser.name);
        redirectTo(path);
      },
    });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
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
              user={user}
              imageFile={profilePicture}
              sx={{ width: 140, height: 140 }}
            />
          </Center>

          <Divider sx={{ marginBottom: 1.5 }} />

          <Flex sx={{ justifyContent: "space-between", marginBottom: 1.25 }}>
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
            imageId={user.coverPhoto?.id}
            rounded
            sx={{ marginBottom: 3 }}
          />

          <Divider sx={{ marginBottom: 3 }} />

          <FormGroup>
            <TextField
              label={t("users.form.name")}
              name={UserFieldNames.Name}
            />
            <TextField
              autoComplete="off"
              label={t("users.form.bio")}
              name={UserFieldNames.Bio}
            />
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

export default EditProfileForm;
