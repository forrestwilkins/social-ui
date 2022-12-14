import { Card, CardContent, CardProps, FormGroup } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { ColorResult } from "react-color";
import { toastVar } from "../../apollo/cache";
import {
  CreateRoleInput,
  RoleFragment,
  useCreateRoleMutation,
} from "../../apollo/gen";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common.constants";
import { DEFAULT_ROLE_COLOR } from "../../constants/role.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { generateRandom } from "../../utils/common.utils";
import ColorPicker from "../Shared/ColorPicker";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

interface Props extends CardProps {
  editRole?: RoleFragment;
}

const RoleForm = ({ editRole, ...cardProps }: Props) => {
  const [color, setColor] = useState(
    editRole ? editRole.color : DEFAULT_ROLE_COLOR
  );
  const [colorPickerKey, setColorPickerKey] = useState("");
  const [createRole] = useCreateRoleMutation();

  const t = useTranslate();

  const initialValues = {
    name: editRole ? editRole.name : "",
  };

  const handleSubmit = async (
    formValues: Omit<CreateRoleInput, "color">,
    { setSubmitting, resetForm }: FormikHelpers<Omit<CreateRoleInput, "color">>
  ) => {
    try {
      if (editRole) {
        // TODO: Add update logic here
        return;
      }
      await createRole({
        variables: {
          roleData: { color, ...formValues },
        },
        onCompleted() {
          setColor(DEFAULT_ROLE_COLOR);
          setSubmitting(false);
          resetForm();
        },
      });
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    } finally {
      // TODO: Verify that this still gets hit on early return
      setColorPickerKey(generateRandom());
    }
  };

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
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

                <ColorPicker
                  color={color}
                  key={colorPickerKey}
                  label={"Role Color"}
                  onChange={handleChangeComplete}
                  sx={{ marginBottom: 1.25 }}
                />
              </FormGroup>

              <Flex justifyContent="end">
                <PrimaryActionButton
                  disabled={formik.isSubmitting || !formik.dirty}
                  sx={{ marginTop: 1.5 }}
                  type="submit"
                >
                  {editRole ? t("actions.save") : t("actions.create")}
                </PrimaryActionButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RoleForm;
