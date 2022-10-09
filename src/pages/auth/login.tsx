import { useMutation, useReactiveVar } from "@apollo/client";
import { Card, CardContent, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { LOGIN_MUTATION } from "../../client/auth/mutations";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../client/cache";
import { ME_QUERY } from "../../client/users/queries";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import PrimaryActionButton from "../../components/Shared/PrimaryActionButton";
import ProgressBar from "../../components/Shared/ProgressBar";
import Spinner from "../../components/Shared/Spinner";
import { TextField } from "../../components/Shared/TextField";
import { NavigationPaths } from "../../constants/common";
import { UserFieldNames } from "../../constants/user";
import { useTranslate } from "../../hooks/common";
import { AuthResult } from "../../types/auth";
import { UserFormValues } from "../../types/user";

const Login: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const [login] = useMutation<AuthResult>(LOGIN_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const t = useTranslate();

  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (formValues: UserFormValues) => {
    try {
      const result = await login({ variables: { input: formValues } });
      if (result.data?.login) {
        isLoggedInVar(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      Router.push(NavigationPaths.Home);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <ProgressBar />;
  }

  return (
    <Card>
      <CardContent>
        <LevelOneHeading style={{ marginBottom: 12 }}>
          {t("users.prompts.signInToPost")}
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
                  label={t("users.form.password")}
                  name={UserFieldNames.Password}
                  type="password"
                />
              </FormGroup>

              <Flex flexEnd>
                <PrimaryActionButton
                  type="submit"
                  disabled={formik.isSubmitting || !formik.dirty}
                >
                  {t("users.actions.logIn")}
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

export default Login;
