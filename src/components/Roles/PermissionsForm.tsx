import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { ChangeEvent } from "react";
import { toastVar } from "../../apollo/cache";
import {
  PermissionInput,
  PermissionsFormFragment,
  useUpdateRoleMutation,
} from "../../apollo/gen";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 18,
  },
}));

interface FormValues {
  permissions: PermissionInput[];
}

interface Props extends CardProps {
  permissions: PermissionsFormFragment[];
  roleId: number;
}

const PermissionsForm = ({ permissions, roleId, ...cardProps }: Props) => {
  const [updateRole] = useUpdateRoleMutation();
  const t = useTranslate();

  const initialValues: FormValues = {
    permissions: [],
  };

  const handleSubmit = async (
    { permissions }: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      updateRole({
        variables: {
          roleData: {
            id: roleId,
            permissions,
          },
        },
        onCompleted() {
          setSubmitting(false);
          resetForm();
        },
      });
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const handleSwitchChange =
    (
      { id, enabled }: PermissionsFormFragment,
      arrayHelpers: FieldArrayRenderProps,
      values: FormValues
    ) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked === enabled) {
        const index = values.permissions.findIndex((p) => p.id === id);
        arrayHelpers.remove(index);
        return;
      }
      arrayHelpers.push({ id, enabled: checked });
    };

  return (
    <Card {...cardProps}>
      <CardContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, isSubmitting }) => (
            <Form>
              <FieldArray
                name="permissions"
                render={(arrayHelpers) => (
                  <>
                    {permissions.map((permission) => (
                      <Flex justifyContent="space-between" key={permission.id}>
                        <Typography>{permission.name}</Typography>

                        <Switch
                          defaultChecked={permission.enabled}
                          onChange={handleSwitchChange(
                            permission,
                            arrayHelpers,
                            values
                          )}
                        />
                      </Flex>
                    ))}
                  </>
                )}
              />

              <Flex justifyContent="end">
                <PrimaryActionButton
                  disabled={isSubmitting || !values.permissions.length}
                  sx={{ marginTop: 1.5 }}
                  type="submit"
                >
                  {t("actions.save")}
                </PrimaryActionButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default PermissionsForm;
