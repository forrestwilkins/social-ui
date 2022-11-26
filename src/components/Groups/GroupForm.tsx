// TODO: Ensure that update group and create group have separate input types ⭐️

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
import {
  CreateGroupInput,
  GroupFormFragment,
  GroupsDocument,
  GroupsQuery,
  UpdateGroupInput,
  useCreateGroupMutation,
  useUpdateGroupMutation,
} from "../../apollo/gen";
import { uploadGroupCoverPhoto } from "../../apollo/groups/mutations/CreateGroup.mutation";
import Flex from "../../components/Shared/Flex";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { generateRandom, redirectTo } from "../../utils/common.utils";
import { getGroupPath } from "../../utils/group.utils";
import { buildImageData } from "../../utils/image.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 12,
  },
}));

interface Props extends CardProps {
  editGroup?: GroupFormFragment;
}

const GroupForm = ({ editGroup, ...cardProps }: Props) => {
  const [imageInputKey, setImageInputKey] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  const t = useTranslate();

  const initialValues = {
    name: editGroup ? editGroup.name : "",
    description: editGroup ? editGroup.description : "",
  };

  const handleCreate = async (
    formValues: CreateGroupInput,
    { setSubmitting, resetForm }: FormikHelpers<CreateGroupInput>,
    coverPhotoData?: FormData
  ) =>
    await createGroup({
      variables: { groupData: formValues },
      async update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createGroup: { group },
        } = data;
        const coverPhoto = coverPhotoData
          ? await uploadGroupCoverPhoto(group.id, coverPhotoData)
          : group.coverPhoto;

        cache.updateQuery<GroupsQuery>(
          { query: GroupsDocument },
          (groupsData) =>
            produce(groupsData, (draft) => {
              draft?.groups.unshift({
                ...group,
                memberRequestCount: 0,
                coverPhoto,
              });
            })
        );
      },
      onCompleted() {
        setImageInputKey(generateRandom());
        setCoverPhoto(undefined);
        setSubmitting(false);
        resetForm();
      },
      onError() {
        throw new Error(t("groups.errors.couldNotCreate"));
      },
    });

  const handleUpdate = async (
    editGroup: GroupFormFragment,
    formValues: Omit<UpdateGroupInput, "id">,
    coverPhotoData?: FormData
  ) =>
    await updateGroup({
      variables: {
        groupData: { id: editGroup.id, ...formValues },
      },
      async update(cache, { data }) {
        if (!coverPhotoData || !data) {
          return;
        }
        const {
          updateGroup: { group },
        } = data;
        const coverPhotoResult = await uploadGroupCoverPhoto(
          group.id,
          coverPhotoData
        );
        cache.modify({
          id: cache.identify(editGroup),
          fields: {
            coverPhoto(_, { toReference }) {
              return toReference(coverPhotoResult);
            },
          },
        });
      },
      onCompleted({ updateGroup: { group } }) {
        const groupPagePath = getGroupPath(group.name);
        redirectTo(groupPagePath);
      },
      onError() {
        throw new Error(t("groups.errors.couldNotUpdate"));
      },
    });

  const handleSubmit = async (
    formValues: CreateGroupInput | UpdateGroupInput,
    formikHelpers: FormikHelpers<CreateGroupInput | UpdateGroupInput>
  ) => {
    try {
      const coverPhotoData = buildImageData(coverPhoto);
      if (editGroup) {
        await handleUpdate(editGroup, formValues, coverPhotoData);
        return;
      }
      await handleCreate(formValues, formikHelpers, coverPhotoData);
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

  const renderImagePreview = () => {
    if (!coverPhoto && !editGroup?.coverPhoto) {
      return null;
    }
    const currentCoverPhoto = editGroup?.coverPhoto
      ? [editGroup.coverPhoto]
      : undefined;
    return (
      <AttachedImagePreview
        removeSelectedImage={removeSelectedImageHandler}
        selectedImages={coverPhoto ? [coverPhoto] : []}
        savedImages={currentCoverPhoto}
      />
    );
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
                {renderImagePreview()}
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
