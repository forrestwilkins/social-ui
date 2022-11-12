import { Divider, FormGroup, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import produce from "immer";
import { useState } from "react";
import { toastVar } from "../../apollo/cache";
import USER_PROFILE_FRAGMENT from "../../apollo/users/fragments/user-profile.fragment";
import {
  uploadProfilePicture,
  uploadUserCoverPhoto,
} from "../../apollo/users/mutations/update-user.mutation";
import { UserFieldNames } from "../../constants/user.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  Image,
  UpdateUserInput,
  UserProfileFragment,
  useUpdateUserMutation,
} from "../../types/generated.types";
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
  editUser: UserProfileFragment;
  submitButtonText: string;
}

const EditProfileForm = ({ editUser, submitButtonText }: Props) => {
  const [updateUser] = useUpdateUserMutation();
  const [profilePicture, setProfilePicture] = useState<File>();
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const t = useTranslate();

  const initialValues: Omit<UpdateUserInput, "id"> = {
    bio: editUser.bio || "",
    name: editUser.name || "",
  };

  const handleSubmit = async (formValues: Omit<UpdateUserInput, "id">) => {
    try {
      if (editUser) {
        const profilePictureData = buildImageData(profilePicture);
        const coverPhotoData = buildImageData(coverPhoto);
        const { data } = await updateUser({
          variables: {
            userData: {
              id: editUser.id,
              ...formValues,
            },
          },
          async update(cache, { data }) {
            if (!data || (!coverPhotoData && !profilePictureData)) {
              return;
            }
            let coverPhoto: Image | undefined;
            let profilePicture: Image | undefined;
            if (profilePictureData) {
              profilePicture = await uploadProfilePicture(
                editUser.id,
                profilePictureData
              );
            }
            if (coverPhotoData) {
              coverPhoto = await uploadUserCoverPhoto(
                editUser.id,
                coverPhotoData
              );
            }
            cache.updateFragment<UserProfileFragment>(
              {
                id: cache.identify(editUser),
                fragment: USER_PROFILE_FRAGMENT,
                fragmentName: "UserProfile",
              },
              (data) =>
                produce(data, (draft) => {
                  if (!draft) {
                    return;
                  }
                  if (profilePicture) {
                    draft.profilePicture = profilePicture;
                    for (const post of draft.posts) {
                      post.user.profilePicture = profilePicture;
                    }
                  }
                  if (coverPhoto) {
                    draft.coverPhoto = coverPhoto;
                  }
                })
            );
          },
        });
        if (!data?.updateUser) {
          toastVar({ status: "error", title: t("errors.somethingWentWrong") });
          return;
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
            imageId={editUser?.coverPhoto?.id}
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
