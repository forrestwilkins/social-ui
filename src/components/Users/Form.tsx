import { Button, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import Flex from "../../components/Shared/Flex";
import Spinner from "../../components/Shared/Spinner";
import { TextField } from "../../components/Shared/TextField";
import { UserFieldNames } from "../../constants/user";
import { useTranslate } from "../../hooks/common";
import { UserFormValues } from "../../types/user";

interface Props {
  initialValues: UserFormValues;
  isEditing?: boolean;
  onSubmit: (formValues: UserFormValues) => Promise<void>;
  submitButtonText: string;
}

// TODO: Use for both sign up and login if possible
const UserForm = ({
  initialValues,
  isEditing,
  onSubmit,
  submitButtonText,
}: Props) => {
  const t = useTranslate();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <FormGroup>
            {!isEditing && (
              <TextField
                label={t("users.form.email")}
                name={UserFieldNames.Email}
              />
            )}
            <TextField
              label={t("users.form.name")}
              name={UserFieldNames.Name}
            />
            {isEditing && (
              <TextField
                autoComplete="off"
                label={t("users.form.bio")}
                name={UserFieldNames.Bio}
              />
            )}
            {!isEditing && (
              <TextField
                label={t("users.form.password")}
                name={UserFieldNames.Password}
                type="password"
              />
            )}
          </FormGroup>

          <Flex flexEnd>
            <Button
              type="submit"
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {submitButtonText}
              {formik.isSubmitting && (
                <Spinner size={10} sx={{ marginLeft: 1 }} />
              )}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
