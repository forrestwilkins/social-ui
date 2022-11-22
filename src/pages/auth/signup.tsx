import { useReactiveVar } from "@apollo/client";
import { Card, CardContent, FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useEffect } from "react";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../apollo/cache";
import {
  MeDocument,
  MeQuery,
  SignUpInput,
  useSignUpMutation,
} from "../../apollo/gen";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import PrimaryActionButton from "../../components/Shared/PrimaryActionButton";
import ProgressBar from "../../components/Shared/ProgressBar";
import { TextField } from "../../components/Shared/TextField";
import { NavigationPaths } from "../../constants/common.constants";
import { UserFieldNames } from "../../constants/user.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { redirectTo } from "../../utils/common.utils";

const SignUp: NextPage = () => {
  const [signUp] = useSignUpMutation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const t = useTranslate();

  const initialValues: SignUpInput = {
    email: "",
    name: "",
    password: "",
  };

  const handleSubmit = async (formValues: SignUpInput) => {
    await signUp({
      variables: { input: formValues },
      update(cache, { data }) {
        if (!data?.signUp.user) {
          return;
        }
        cache.writeQuery<MeQuery>({
          data: { me: data.signUp.user },
          query: MeDocument,
        });
        isLoggedInVar(true);
      },
    });
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
