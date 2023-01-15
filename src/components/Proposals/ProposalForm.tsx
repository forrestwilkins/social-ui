// TODO: Add remaining layout and functionality - below is a WIP

import {
  Divider,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Form, Formik, FormikFormProps, FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateProposalInput,
  HomePageDocument,
  HomePageQuery,
  ProposalFormFragment,
  useCreateProposalMutation,
} from "../../apollo/gen";
import { FieldNames } from "../../constants/common.constants";
import {
  ProposalActionFields,
  ProposalActionTypes,
} from "../../constants/proposal.constants";
import { getRandomString } from "../../utils/common.utils";
import { getProposalActionTypeOptions } from "../../utils/proposal.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

interface Props extends FormikFormProps {
  groupId?: number;
  me: ProposalFormFragment;
}

const ProposalForm = ({
  groupId,
  me: { joinedGroups },
  ...formProps
}: Props) => {
  const [clicked, setClicked] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesInputKey, setImagesInputKey] = useState("");

  const [createProposal] = useCreateProposalMutation();

  const { t } = useTranslation();

  const initialValues: CreateProposalInput = {
    body: "",
    action: {
      actionType: "",
      groupDescription: "",
      groupName: "",
    },
    groupId,
  };

  const actionTypeOptions = getProposalActionTypeOptions(t);

  const handleSubmit = async (
    formValues: CreateProposalInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateProposalInput>
  ) => {
    try {
      await createProposal({
        variables: { proposalData: { ...formValues, images } },
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
          setImages([]);
          setImagesInputKey(getRandomString());
          setSubmitting(false);
          setClicked(false);
        },
      });
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const removeSelectedImageHandler = (imageName: string) => {
    setImages(images.filter((image) => image.name !== imageName));
    setImagesInputKey(getRandomString());
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      {...formProps}
    >
      {({ isSubmitting, dirty, values, handleChange }) => (
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
                <FormControl variant="standard" sx={{ marginBottom: 1 }}>
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
                </FormControl>

                <FormControl
                  variant="standard"
                  sx={{ marginBottom: values.action.actionType ? 1 : 0.25 }}
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
                </FormControl>

                {values.action.actionType ===
                  ProposalActionTypes.ChangeName && (
                  <TextField
                    autoComplete="off"
                    label={t("proposals.labels.newGroupName")}
                    name={ProposalActionFields.GroupName}
                  />
                )}

                {values.action.actionType ===
                  ProposalActionTypes.ChangeDescription && (
                  <TextField
                    autoComplete="off"
                    label={t("proposals.labels.newGroupDescription")}
                    name={ProposalActionFields.GroupDescription}
                  />
                )}
              </>
            )}

            <AttachedImagePreview
              removeSelectedImage={removeSelectedImageHandler}
              selectedImages={images}
            />
          </FormGroup>

          {!clicked && <Divider sx={{ marginBottom: 1.3 }} />}

          <Flex sx={{ justifyContent: "space-between" }}>
            <ImageInput
              refreshKey={imagesInputKey}
              setImages={setImages}
              multiple
            />

            <PrimaryActionButton
              disabled={isSubmitting || (!dirty && !images.length)}
              sx={{ marginTop: 1.5 }}
              type="submit"
            >
              {t("proposals.actions.createProposal")}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ProposalForm;
