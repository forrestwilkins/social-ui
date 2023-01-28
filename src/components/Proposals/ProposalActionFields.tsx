import { CropOriginal } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { t } from "i18next";
import { CreateProposalInput, ProposalFormFragment } from "../../apollo/gen";
import {
  ProposalActionFieldNames,
  ProposalActionTypes,
} from "../../constants/proposal.constants";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import { TextField } from "../Shared/TextField";

interface Props {
  editProposal?: ProposalFormFragment;
  errors: FormikErrors<CreateProposalInput>;
  groupCoverPhoto: File | null;
  setGroupCoverPhoto(coverPhoto: File | null): void;
  submitCount: number;
  touched: FormikTouched<CreateProposalInput>;
  values: CreateProposalInput;
}

const ProposalActionFields = ({
  editProposal,
  errors,
  groupCoverPhoto,
  setGroupCoverPhoto,
  submitCount,
  touched,
  values,
}: Props) => {
  if (values.action.actionType === ProposalActionTypes.ChangeName) {
    const isInvalid = !!errors.action?.groupName && touched.action?.groupName;
    return (
      <TextField
        autoComplete="off"
        error={isInvalid}
        label={t("proposals.labels.newGroupName")}
        name={ProposalActionFieldNames.GroupName}
      />
    );
  }

  if (values.action.actionType === ProposalActionTypes.ChangeDescription) {
    const isInvalid =
      !!errors.action?.groupDescription && touched.action?.groupDescription;
    return (
      <TextField
        autoComplete="off"
        error={isInvalid}
        label={t("proposals.labels.newGroupDescription")}
        name={ProposalActionFieldNames.GroupDescription}
      />
    );
  }

  if (values.action.actionType === ProposalActionTypes.ChangeCoverPhoto) {
    const isInvalid = !!(
      errors.action?.groupCoverPhoto &&
      !groupCoverPhoto &&
      submitCount
    );
    const savedImage =
      editProposal?.action.groupCoverPhoto && !groupCoverPhoto
        ? [editProposal.action.groupCoverPhoto]
        : [];

    return (
      <Box marginTop={1.5}>
        <AttachedImagePreview
          imageContainerStyles={{ marginBottom: 1 }}
          savedImages={savedImage}
          selectedImages={groupCoverPhoto ? [groupCoverPhoto] : []}
          sx={{ marginTop: 1 }}
        />

        <ImageInput
          sx={{ cursor: "pointer", marginTop: 0 }}
          setImage={setGroupCoverPhoto}
        >
          <Typography
            color={isInvalid ? "error" : "primary"}
            sx={{ display: "flex", fontSize: 14 }}
          >
            <CropOriginal sx={{ marginRight: "0.25ch", fontSize: 20 }} />
            {t("proposals.actions.attachNewCoverPhoto")}
          </Typography>
        </ImageInput>

        {isInvalid && (
          <Typography color="error" fontSize="small" marginLeft={0.25}>
            {t("proposals.errors.missingGroupCoverPhoto")}
          </Typography>
        )}
      </Box>
    );
  }

  return null;
};

export default ProposalActionFields;
