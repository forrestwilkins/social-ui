// TODO: Use Formik for image input

import { CropOriginal } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  Form,
  Formik,
  FormikErrors,
  FormikFormProps,
  FormikHelpers,
} from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateProposalInput,
  HomePageDocument,
  HomePageQuery,
  ProposalActionInput,
  ProposalFormFragment,
  UpdateProposalInput,
  useCreateProposalMutation,
  useMeQuery,
  useUpdateProposalMutation,
} from "../../apollo/gen";
import { FieldNames, NavigationPaths } from "../../constants/common.constants";
import {
  ProposalActionFields,
  ProposalActionTypes,
} from "../../constants/proposal.constants";
import { getRandomString, redirectTo } from "../../utils/common.utils";
import { getProposalActionTypeOptions } from "../../utils/proposal.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

type ProposalFormErrors = {
  action: FormikErrors<ProposalActionInput>;
  groupId?: string;
};

interface Props extends FormikFormProps {
  editProposal?: ProposalFormFragment;
  groupId?: number;
}

const ProposalForm = ({ editProposal, groupId, ...formProps }: Props) => {
  const [clicked, setClicked] = useState(false);
  const [groupCoverPhoto, setGroupCoverPhoto] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");

  const [createProposal] = useCreateProposalMutation();
  const [updateProposal] = useUpdateProposalMutation();
  const { data } = useMeQuery();

  const { t } = useTranslation();

  const joinedGroups = data?.me.joinedGroups;

  const action: ProposalActionInput = {
    actionType: editProposal?.action.actionType || "",
    groupDescription: editProposal?.action.groupDescription || "",
    groupName: editProposal?.action.groupName || "",
  };
  const initialValues: CreateProposalInput = {
    body: editProposal?.body || "",
    action,
    groupId,
  };

  const actionTypeOptions = getProposalActionTypeOptions(t);

  const validateProposal = ({ action, groupId }: CreateProposalInput) => {
    const errors: ProposalFormErrors = {
      action: {},
    };
    if (!action.actionType) {
      errors.action.actionType = t("proposals.errors.missingActionType");
    }
    if (
      action.actionType === ProposalActionTypes.ChangeName &&
      !action.groupName
    ) {
      errors.action.groupName = t("proposals.errors.missingGroupName");
    }
    if (
      action.actionType === ProposalActionTypes.ChangeDescription &&
      !action.groupDescription
    ) {
      errors.action.groupDescription = t(
        "proposals.errors.missingGroupDescription"
      );
    }
    if (
      action.actionType === ProposalActionTypes.ChangeCoverPhoto &&
      !groupCoverPhoto
    ) {
      errors.action.groupCoverPhoto = t(
        "proposals.errors.missingGroupCoverPhoto"
      );
    }
    if (!groupId) {
      errors.groupId = t("proposals.errors.missingGroupId");
    }
    if (!Object.keys(errors.action).length && !errors.groupId) {
      return {};
    }
    return errors;
  };

  const handleCreate = async (
    { action, ...formValues }: CreateProposalInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateProposalInput>
  ) =>
    await createProposal({
      variables: {
        proposalData: {
          action: { ...action, groupCoverPhoto },
          ...formValues,
          images,
        },
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createProposal: { proposal },
        } = data;
        cache.updateQuery<HomePageQuery>(
          { query: HomePageDocument },
          (homePageData) =>
            produce(homePageData, (draft) => {
              draft?.me.homeFeed.unshift(proposal);
            })
        );
        cache.modify({
          id: cache.identify(proposal.user),
          fields: {
            profileFeed(existingRefs, { toReference }) {
              return [toReference(proposal), ...existingRefs];
            },
          },
        });
        if (!proposal.group) {
          return;
        }
        cache.modify({
          id: cache.identify(proposal.group),
          fields: {
            feed(existingRefs, { toReference }) {
              return [toReference(proposal), ...existingRefs];
            },
          },
        });
      },
      onCompleted() {
        resetForm();
        setClicked(false);
        setGroupCoverPhoto(null);
        setImages([]);
        setImagesInputKey(getRandomString());
        setSubmitting(false);
      },
    });

  const handleUpdate = async (
    { action, ...formValues }: Omit<UpdateProposalInput, "id">,
    editProposal: ProposalFormFragment
  ) =>
    await updateProposal({
      variables: {
        proposalData: {
          id: editProposal.id,
          action: { ...action, groupCoverPhoto },
          ...formValues,
          images,
        },
      },
      onCompleted() {
        redirectTo(NavigationPaths.Home);
      },
    });

  const handleSubmit = async (
    formValues: CreateProposalInput | UpdateProposalInput,
    formHelpers: FormikHelpers<CreateProposalInput | UpdateProposalInput>
  ) => {
    try {
      if (editProposal) {
        await handleUpdate(formValues as UpdateProposalInput, editProposal);
        return;
      }
      await handleCreate(formValues, formHelpers);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
      console.error(err);
    }
  };

  const removeSelectedImage = (imageName: string) => {
    setImages(images.filter((image) => image.name !== imageName));
    setImagesInputKey(getRandomString());
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateProposal}
      enableReinitialize
      {...formProps}
    >
      {({
        dirty,
        errors,
        handleChange,
        isSubmitting,
        submitCount,
        touched,
        values,
      }) => (
        <Form onClick={() => setClicked(true)}>
          <FormGroup>
            <TextFieldWithAvatar
              autoComplete="off"
              name={FieldNames.Body}
              onChange={handleChange}
              placeholder={t("proposals.prompts.createProposal")}
              value={values.body}
              multiline
            />

            {!!(clicked || values.body?.length) && (
              <>
                <FormControl
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                  error={
                    !!errors.action?.actionType && touched.action?.actionType
                  }
                >
                  <InputLabel>{t("proposals.labels.action")}</InputLabel>
                  <Select
                    name={ProposalActionFields.ActionType}
                    onChange={handleChange}
                    value={values.action.actionType}
                  >
                    {actionTypeOptions.map((option) => (
                      <MenuItem value={option.value} key={option.value}>
                        {option.message}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!(errors.action?.actionType && submitCount) && (
                    <Typography color="error" fontSize="small" marginTop={0.5}>
                      {t("proposals.errors.missingActionType")}
                    </Typography>
                  )}
                </FormControl>

                {joinedGroups && !editProposal && (
                  <FormControl
                    variant="standard"
                    sx={{ marginBottom: values.action.actionType ? 1 : 0.25 }}
                    error={!!(errors.groupId && touched.groupId)}
                  >
                    <InputLabel>{t("groups.labels.group")}</InputLabel>
                    <Select
                      name="groupId"
                      onChange={handleChange}
                      value={values.groupId || ""}
                    >
                      {joinedGroups.map(({ id, name }) => (
                        <MenuItem value={id} key={id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!(errors.groupId && submitCount) && (
                      <Typography
                        color="error"
                        fontSize="small"
                        marginTop={0.5}
                        gutterBottom
                      >
                        {t("proposals.errors.missingGroupId")}
                      </Typography>
                    )}
                  </FormControl>
                )}

                {values.action.actionType ===
                  ProposalActionTypes.ChangeName && (
                  <TextField
                    autoComplete="off"
                    label={t("proposals.labels.newGroupName")}
                    name={ProposalActionFields.GroupName}
                    error={
                      !!errors.action?.groupName && touched.action?.groupName
                    }
                  />
                )}

                {values.action.actionType ===
                  ProposalActionTypes.ChangeDescription && (
                  <TextField
                    autoComplete="off"
                    label={t("proposals.labels.newGroupDescription")}
                    name={ProposalActionFields.GroupDescription}
                    error={
                      !!errors.action?.groupDescription &&
                      touched.action?.groupDescription
                    }
                  />
                )}

                {values.action.actionType ===
                  ProposalActionTypes.ChangeCoverPhoto && (
                  <Box marginTop={1.5}>
                    <AttachedImagePreview
                      savedImages={
                        editProposal?.action.groupCoverPhoto && !groupCoverPhoto
                          ? [editProposal.action.groupCoverPhoto]
                          : []
                      }
                      selectedImages={groupCoverPhoto ? [groupCoverPhoto] : []}
                      imageContainerStyles={{ marginBottom: 1 }}
                      sx={{ marginTop: 1 }}
                    />

                    <ImageInput
                      sx={{ cursor: "pointer", marginTop: 0 }}
                      setImage={setGroupCoverPhoto}
                    >
                      <Typography
                        color={
                          errors.action?.groupCoverPhoto &&
                          !groupCoverPhoto &&
                          submitCount
                            ? "error"
                            : "primary"
                        }
                        sx={{ display: "flex", fontSize: 14 }}
                      >
                        <CropOriginal
                          sx={{ marginRight: "0.25ch", fontSize: 20 }}
                        />
                        {t("proposals.actions.attachNewCoverPhoto")}
                      </Typography>
                    </ImageInput>

                    {!!(
                      errors.action?.groupCoverPhoto &&
                      !groupCoverPhoto &&
                      submitCount
                    ) && (
                      <Typography
                        color="error"
                        fontSize="small"
                        marginLeft={0.25}
                      >
                        {t("proposals.errors.missingGroupCoverPhoto")}
                      </Typography>
                    )}
                  </Box>
                )}
              </>
            )}

            <AttachedImagePreview
              removeSelectedImage={removeSelectedImage}
              selectedImages={images}
            />
          </FormGroup>

          {!clicked && !editProposal && <Divider sx={{ marginBottom: 1.3 }} />}

          <Flex sx={{ justifyContent: "space-between" }}>
            <ImageInput
              refreshKey={imagesInputKey}
              setImages={setImages}
              multiple
            />

            <PrimaryActionButton
              disabled={
                isSubmitting || (!dirty && !groupCoverPhoto && !images.length)
              }
              sx={{ marginTop: 1.5 }}
              type="submit"
            >
              {editProposal
                ? t("actions.save")
                : t("proposals.actions.createProposal")}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ProposalForm;
