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
import { useTranslation } from "react-i18next";
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
import Flex from "../../components/Shared/Flex";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common.constants";
import { getRandomString, redirectTo } from "../../utils/common.utils";
import { getGroupPath } from "../../utils/group.utils";
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

  const { t } = useTranslation();

  const initialValues = {
    name: editGroup ? editGroup.name : "",
    description: editGroup ? editGroup.description : "",
  };

  const handleCreate = async (
    formValues: CreateGroupInput,
    { setSubmitting, resetForm }: FormikHelpers<CreateGroupInput>
  ) =>
    await createGroup({
      variables: {
        groupData: {
          ...formValues,
          coverPhoto,
        },
      },
      async update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createGroup: { group },
        } = data;

        cache.updateQuery<GroupsQuery>(
          { query: GroupsDocument },
          (groupsData) =>
            produce(groupsData, (draft) => {
              draft?.groups.unshift({
                ...group,
                memberRequestCount: 0,
              });
            })
        );
      },
      onCompleted() {
        setImageInputKey(getRandomString());
        setCoverPhoto(undefined);
        setSubmitting(false);
        resetForm();
      },
      onError() {
        throw new Error(t("groups.errors.couldNotCreate"));
      },
    });

  const handleUpdate = async (
    formValues: Omit<UpdateGroupInput, "id">,
    editGroup: GroupFormFragment
  ) =>
    await updateGroup({
      variables: {
        groupData: {
          id: editGroup.id,
          ...formValues,
          coverPhoto,
        },
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
      if (editGroup) {
        await handleUpdate(formValues, editGroup);
        return;
      }
      await handleCreate(formValues, formikHelpers);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const removeSelectedImageHandler = () => {
    setCoverPhoto(undefined);
    setImageInputKey(getRandomString());
  };

  const renderImagePreview = () => {
    if (!coverPhoto) {
      return null;
    }
    return (
      <AttachedImagePreview
        removeSelectedImage={removeSelectedImageHandler}
        selectedImages={coverPhoto ? [coverPhoto] : []}
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
