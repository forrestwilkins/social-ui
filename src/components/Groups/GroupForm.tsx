import { Button, Card, CardContent, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Flex from "../../components/Shared/Flex";
import Spinner from "../../components/Shared/Spinner";
import { TextField } from "../../components/Shared/TextField";
import { FieldNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";

const GroupForm: NextPage = () => {
  const t = useTranslate();

  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = async () => {
    try {
      // TODO: Create group here
    } catch (err) {
      console.error(err);
    }
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
              </FormGroup>

              <Flex flexEnd>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.dirty}
                >
                  {t("actions.create")}
                  {formik.isSubmitting && (
                    <Spinner size={10} sx={{ marginLeft: 1 }} />
                  )}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default GroupForm;
