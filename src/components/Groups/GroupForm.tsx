// TODO: Ensure that update group and create group have separate input types

import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  FormGroup,
  styled,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { toastVar } from "../../apollo/cache";
import { uploadGroupCoverPhoto } from "../../apollo/groups/mutations/create-group.mutation";
import GROUPS_QUERY from "../../apollo/groups/queries/groups.query";
import Flex from "../../components/Shared/Flex";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  Group,
  GroupInput,
  GroupsQuery,
  Image,
  useCreateGroupMutation,
  useUpdateGroupMutation,
} from "../../types/generated.types";
import { generateRandom, redirectTo } from "../../utils/common.utils";
import { getGroupPath } from "../../utils/group.utils";
import { buildImageData } from "../../utils/image.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

const CardContent = styled(MuiCardContent)(() => ({
  paddingBottom: 12,
  "&:last-child": {
    paddingBottom: 12,
  },
}));

interface Props extends CardProps {
  editGroup?: Group;
}

const GroupForm = ({ editGroup, ...cardProps }: Props) => {
  const [imageInputKey, setImageInputKey] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  const t = useTranslate();

  const initialValues: GroupInput = {
    name: editGroup ? editGroup.name : "",
    description: editGroup ? editGroup.description : "",
  };

  const handleSubmit = async (
    formValues: GroupInput,
    { resetForm, setSubmitting }: FormikHelpers<GroupInput>
  ) => {
    try {
      const coverPhotoData = buildImageData(coverPhoto);

      if (editGroup) {
        const { data } = await updateGroup({
          variables: {
            groupData: { id: editGroup.id, ...formValues },
          },
          async update(cache, { data }) {
            if (!coverPhotoData || !data) {
              return;
            }
            let coverPhoto: Image | undefined;
            if (coverPhotoData) {
              coverPhoto = await uploadGroupCoverPhoto(
                data.updateGroup.id,
                coverPhotoData
              );
            }
            cache.modify({
              id: cache.identify(editGroup),
              fields: { coverPhoto: () => coverPhoto },
            });
          },
        });
        if (!data?.updateGroup) {
          throw new Error(t("groups.errors.couldNotUpdate"));
        }
        const groupPagePath = getGroupPath(data.updateGroup.name);
        redirectTo(groupPagePath);
        return;
      }

      await createGroup({
        variables: { groupData: formValues },
        async update(cache, { data }) {
          if (!data) {
            return;
          }
          let coverPhoto: Image | undefined;
          if (coverPhotoData) {
            coverPhoto = await uploadGroupCoverPhoto(
              data.createGroup.id,
              coverPhotoData
            );
          }
          cache.updateQuery<GroupsQuery>(
            { query: GROUPS_QUERY },
            (groupsData) =>
              produce(groupsData, (draft) => {
                draft?.groups.unshift({
                  ...data.createGroup,
                  ...(coverPhoto && { coverPhoto }),
                });
              })
          );
        },
      });

      setImageInputKey(generateRandom());
      setCoverPhoto(undefined);
      setSubmitting(false);
      resetForm();
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const removeSelectedImageHandler = () => {
    setCoverPhoto(undefined);
    setImageInputKey(generateRandom());
  };

  return (
    <Card {...cardProps}>
      <CardContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <FormGroup>
                <TextField
                  autoComplete="off"
                  label={t("groups.form.name")}
                  name={FieldNames.Name}
                />

                <TextField
                  autoComplete="off"
                  label={t("groups.form.description")}
                  name={FieldNames.Description}
                />

                {coverPhoto && (
                  <AttachedImagePreview
                    removeSelectedImage={removeSelectedImageHandler}
                    selectedImages={[coverPhoto]}
                  />
                )}
              </FormGroup>

              <Flex sx={{ justifyContent: "space-between" }}>
                <ImageInput
                  refreshKey={imageInputKey}
                  setImage={setCoverPhoto}
                />

                <PrimaryActionButton
                  disabled={
                    formik.isSubmitting || (!formik.dirty && !coverPhoto)
                  }
                  sx={{ marginTop: 1.5 }}
                  type="submit"
                >
                  {editGroup ? t("actions.save") : t("actions.create")}
                </PrimaryActionButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default GroupForm;
