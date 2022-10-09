import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  FormGroup,
  styled,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toastVar } from "../../client/cache";
import Flex from "../../components/Shared/Flex";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useCreateGroupMutation } from "../../hooks/group";
import { Group, GroupFormValues } from "../../types/group";
import { generateRandom } from "../../utils/common";
import { buildImageData } from "../../utils/image";
import AttachedImages from "../Images/AttachedImages";
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
  const createGroup = useCreateGroupMutation();

  const t = useTranslate();

  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = async (
    formValues: GroupFormValues,
    { resetForm, setSubmitting }: FormikHelpers<GroupFormValues>
  ) => {
    try {
      const imageData = buildImageData(coverPhoto);

      if (editGroup) {
        // TODO: Add update logic here
        return;
      }
      await createGroup(formValues, imageData);

      setImageInputKey(generateRandom());
      setCoverPhoto(undefined);
      setSubmitting(false);
      resetForm();
    } catch (err) {
      toastVar({ status: "error", title: err as string });
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
                  label={t("groups.form.name")}
                  name={FieldNames.Name}
                />

                <TextField
                  label={t("groups.form.description")}
                  name={FieldNames.Description}
                />

                {coverPhoto && (
                  <AttachedImages
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
                  disabled={formik.isSubmitting || !formik.dirty}
                  sx={{ marginTop: 1.5 }}
                  type="submit"
                >
                  {t("actions.create")}
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
