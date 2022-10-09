import {
  Card,
  CardContent as MuiCardContent,
  FormGroup,
  styled,
} from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useState } from "react";
import Flex from "../../components/Shared/Flex";
import Spinner from "../../components/Shared/Spinner";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { generateRandom } from "../../utils/common";
import AttachedImages from "../Images/AttachedImages";
import ImageInput from "../Images/ImageInput";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

const CardContent = styled(MuiCardContent)(() => ({
  paddingBottom: 12,
  "&:last-child": {
    paddingBottom: 12,
  },
}));

const GroupForm: NextPage = () => {
  const [imageInputKey, setImageInputKey] = useState("");
  const [selectedImage, setSelctedImage] = useState<File>();

  const t = useTranslate();

  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = async () => {
    try {
      // TODO: Create group here

      setImageInputKey(generateRandom());
    } catch (err) {
      console.error(err);
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
                    selectedImages={[selectedImage]}
                    removeSelectedImage={removeSelectedImageHandler}
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
                  {formik.isSubmitting && (
                    <Spinner size={10} sx={{ marginLeft: 1 }} />
                  )}
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
