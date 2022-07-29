import { useMutation, useReactiveVar } from "@apollo/client";
import { Button, Card, CardContent, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useEffect } from "react";
import { SIGN_UP_MUTATION } from "../../client/auth/mutations";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../client/cache";
import { Field } from "../../components/Shared/Field";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import Spinner from "../../components/Shared/Spinner";
import { NavigationPaths } from "../../constants/common";
import { UserFieldNames } from "../../constants/user";
import { useTranslate } from "../../hooks/common";
import { AuthResult } from "../../types/auth";
import { SignUpFormValues } from "../../types/user";
import { redirectTo } from "../../utils/common";

const SignUp: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const [signUp] = useMutation<AuthResult>(SIGN_UP_MUTATION);

  const t = useTranslate();

  const initialValues: SignUpFormValues = {
    email: "",
    name: "",
    password: "",
  };

  const handleSubmit = async (formValues: SignUpFormValues) => {
    const result = await signUp({ variables: { input: formValues } });
    if (result.data?.signUp) {
      isLoggedInVar(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirectTo(NavigationPaths.Home);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <ProgressBar />;
  }

  return (
    <Card elevation={0}>
      <CardContent>
        <LevelOneHeading style={{ marginBottom: 12 }}>
          {t("users.prompts.becomeAMember")}
        </LevelOneHeading>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form hidden={isNavDrawerOpen}>
              <FormGroup>
                <Field
                  label={t("users.form.email")}
                  name={UserFieldNames.Email}
                />
                <Field
                  label={t("users.form.name")}
                  name={UserFieldNames.Name}
                />

                <Field
                  label={t("users.form.password")}
                  name={UserFieldNames.Password}
                  type="password"
                />
              </FormGroup>

              <Flex flexEnd>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.dirty}
                >
                  {t("users.actions.joinUs")}
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

export default SignUp;
