// TODO: Add remaining layout and functionality - below is a WIP

import { Divider, FormGroup } from "@mui/material";
import { Field, Form, Formik, FormikFormProps, FormikHelpers } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateProposalInput,
  useCreateProposalMutation,
} from "../../apollo/gen";
import { FieldNames } from "../../constants/common.constants";
import { getRandomString } from "../../utils/common.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

const ProposalForm = (formProps: FormikFormProps) => {
  const [imagesInputKey, setImagesInputKey] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [createProposal] = useCreateProposalMutation();

  const { t } = useTranslation();

  const initialValues: CreateProposalInput = { body: "" };

  const handleCreate = async (
    formValues: CreateProposalInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateProposalInput>
  ) =>
    await createProposal({
      variables: { proposalData: { ...formValues, images } },
      onCompleted() {
        resetForm();
        setImages([]);
        setImagesInputKey(getRandomString());
        setSubmitting(false);
      },
    });

  const handleSubmit = async (
    formValues: CreateProposalInput,
    formikHelpers: FormikHelpers<CreateProposalInput>
  ) => {
    try {
      await handleCreate(formValues, formikHelpers);
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
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      {...formProps}
    >
      {(formik) => (
        <Form>
          <FormGroup>
            <Field
              autoComplete="off"
              component={TextFieldWithAvatar}
              name={FieldNames.Body}
              placeholder={t("proposals.prompts.createProposal")}
              multiline
            />

            <AttachedImagePreview
              removeSelectedImage={removeSelectedImageHandler}
              selectedImages={images}
            />
          </FormGroup>

          <Divider sx={{ marginBottom: 1.3 }} />

          <Flex sx={{ justifyContent: "space-between" }}>
            <ImageInput
              refreshKey={imagesInputKey}
              setImages={setImages}
              multiple
            />

            <PrimaryActionButton
              disabled={
                formik.isSubmitting || (!formik.dirty && !images.length)
              }
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
