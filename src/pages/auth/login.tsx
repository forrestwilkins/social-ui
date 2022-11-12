import { useReactiveVar } from "@apollo/client";
import { Card, CardContent, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import {
  isLoggedInVar,
  isNavDrawerOpenVar,
  toastVar,
} from "../../apollo/cache";
import ME_QUERY from "../../apollo/users/queries/me.query";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import PrimaryActionButton from "../../components/Shared/PrimaryActionButton";
import ProgressBar from "../../components/Shared/ProgressBar";
import { TextField } from "../../components/Shared/TextField";
import { NavigationPaths } from "../../constants/common.constants";
import { UserFieldNames } from "../../constants/user.constants";
import { useTranslate } from "../../hooks/common.hooks";
import {
  LoginInput,
  MeQuery,
  useLoginMutation,
} from "../../types/generated.types";

const Login: NextPage = () => {
  const [login] = useLoginMutation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const t = useTranslate();

  const initialValues: LoginInput = {
    email: "",
    password: "",
  };

  const handleSubmit = async (formValues: LoginInput) => {
    try {
      await login({
        variables: { input: formValues },
        update(cache, { data }) {
          if (!data?.login.user) {
            return;
          }
          cache.writeQuery<MeQuery>({
            data: { me: data.login.user },
            query: ME_QUERY,
          });
          isLoggedInVar(true);
        },
      });
    } catch (err) {
      toastVar({
        status: "error",
        title: t("errors.somethingWentWrong"),
      });
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
        <LevelOneHeading sx={{ marginBottom: 2 }}>
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
                  disabled={formik.isSubmitting || !formik.dirty}
                  type="submit"
                >
                  {t("users.actions.logIn")}
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
