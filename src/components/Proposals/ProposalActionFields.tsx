import { CropOriginal } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
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
  setGroupCoverPhoto: Dispatch<SetStateAction<File | null>>;
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
    return (
      <TextField
        autoComplete="off"
        label={t("proposals.labels.newGroupName")}
        name={ProposalActionFieldNames.GroupName}
        error={!!errors.action?.groupName && touched.action?.groupName}
      />
    );
  }
  if (values.action.actionType === ProposalActionTypes.ChangeDescription) {
    return (
      <TextField
        autoComplete="off"
        label={t("proposals.labels.newGroupDescription")}
        name={ProposalActionFieldNames.GroupDescription}
        error={
          !!errors.action?.groupDescription && touched.action?.groupDescription
        }
      />
    );
  }
  if (values.action.actionType === ProposalActionTypes.ChangeCoverPhoto) {
    return (
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
              errors.action?.groupCoverPhoto && !groupCoverPhoto && submitCount
                ? "error"
                : "primary"
            }
            sx={{ display: "flex", fontSize: 14 }}
          >
            <CropOriginal sx={{ marginRight: "0.25ch", fontSize: 20 }} />
            {t("proposals.actions.attachNewCoverPhoto")}
          </Typography>
        </ImageInput>

        {!!(
          errors.action?.groupCoverPhoto &&
          !groupCoverPhoto &&
          submitCount
        ) && (
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
