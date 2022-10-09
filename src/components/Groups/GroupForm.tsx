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
  editGroup?: any;
}

const GroupForm = ({ editGroup }: Props) => {
  const [imageInputKey, setImageInputKey] = useState("");
  const [selectedImage, setSelctedImage] = useState<File>();
  const createGroup = useCreateGroupMutation();

  const t = useTranslate();

  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = async (
    formValues: any,
    { resetForm, setSubmitting }: FormikHelpers<any>
  ) => {
    try {
      const imageData = buildImageData(selectedImage);

      if (editGroup) {
        // TODO: Add update logic here
        return;
      }
      createGroup(formValues, imageData);

      setImageInputKey(generateRandom());
      setSubmitting(false);
      resetForm();
    } catch (err) {
      toastVar({ status: "error", title: err as string });
    }
  };

  const removeSelectedImageHandler = () => {
    setSelctedImage(undefined);
    setImageInputKey(generateRandom());
  };

  return (
    <Card>
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

                {selectedImage && (
                  <AttachedImages
                    removeSelectedImage={removeSelectedImageHandler}
                    selectedImages={[selectedImage]}
                  />
                )}
              </FormGroup>

              <Flex sx={{ justifyContent: "space-between" }}>
                <ImageInput
                  refreshKey={imageInputKey}
                  setImage={setSelctedImage}
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
