import { useMutation, useReactiveVar } from "@apollo/client";
import { Card, CardContent, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useEffect } from "react";
import { SIGN_UP_MUTATION } from "../../client/auth/mutations";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../client/cache";
import { ME_QUERY } from "../../client/users/queries";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import PrimaryActionButton from "../../components/Shared/PrimaryActionButton";
import ProgressBar from "../../components/Shared/ProgressBar";
import { TextField } from "../../components/Shared/TextField";
import { NavigationPaths } from "../../constants/common";
import { UserFieldNames } from "../../constants/user";
import { useTranslate } from "../../hooks/common";
import { AuthResult } from "../../types/auth";
import { UserFormValues } from "../../types/user";
import { redirectTo } from "../../utils/common";

const SignUp: NextPage = () => {
  const [signUp] = useMutation<AuthResult>(SIGN_UP_MUTATION, {
    refetchQueries: [ME_QUERY],
  });

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const t = useTranslate();

  const initialValues: UserFormValues = {
    email: "",
    name: "",
    password: "",
  };

  const handleSubmit = async (formValues: UserFormValues) => {
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
    <Card>
      <CardContent>
        <LevelOneHeading sx={{ marginBottom: 2 }}>
          {t("users.prompts.becomeAMember")}
        </LevelOneHeading>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form hidden={isNavDrawerOpen}>
              <FormGroup>
                <TextField
                  label={t("users.form.email")}
                  name={UserFieldNames.Email}
                />
                <TextField
                  label={t("users.form.name")}
                  name={UserFieldNames.Name}
                />

                <TextField
                  label={t("users.form.password")}
                  name={UserFieldNames.Password}
                  type="password"
                />
              </FormGroup>

              <Flex flexEnd>
                <PrimaryActionButton
                  disabled={formik.isSubmitting || !formik.dirty}
                  type="submit"
                >
                  {t("users.actions.signUp")}
                </PrimaryActionButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default SignUp;
