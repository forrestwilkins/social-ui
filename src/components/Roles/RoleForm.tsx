import { Card, CardContent, CardProps, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { toastVar } from "../../apollo/cache";
import { RoleFragment } from "../../apollo/gen";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

interface Props extends CardProps {
  editRole?: RoleFragment;
}

const RoleForm = ({ editRole, ...cardProps }: Props) => {
  const t = useTranslate();

  const initialValues = {
    name: editRole ? editRole.name : "",
  };

  const handleSubmit = async () => {
    try {
      if (editRole) {
        return;
      }
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
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
