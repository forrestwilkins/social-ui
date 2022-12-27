import { Box, BoxProps, Switch, Typography, useTheme } from "@mui/material";
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
import { ServerPermissions } from "../../constants/role.constants";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

interface FormValues {
  permissions: PermissionInput[];
}

interface Props extends BoxProps {
  permissions: PermissionsFormFragment[];
  roleId: number;
}

const PermissionsForm = ({ permissions, roleId, ...boxProps }: Props) => {
  const [updateRole] = useUpdateRoleMutation();

  const theme = useTheme();
  const t = useTranslate();

  const initialValues: FormValues = {
    permissions: [],
  };

  const getPermissionText = (name: string) => {
    switch (name) {
      case ServerPermissions.CreateInvites:
        return {
          name: t("permissions.names.createInvites"),
          description: t("permissions.descriptions.createInvites"),
        };
      case ServerPermissions.ManageComments:
        return {
          name: t("permissions.names.manageComments"),
          description: t("permissions.descriptions.manageComments"),
        };
      case ServerPermissions.ManageEvents:
        return {
          name: t("permissions.names.manageEvents"),
          description: t("permissions.descriptions.manageEvents"),
        };
      case ServerPermissions.ManageInvites:
        return {
          name: t("permissions.names.manageInvites"),
          description: t("permissions.descriptions.manageInvites"),
        };
      case ServerPermissions.ManagePosts:
        return {
          name: t("permissions.names.managePosts"),
          description: t("permissions.descriptions.managePosts"),
        };
      case ServerPermissions.ManageRoles:
        return {
          name: t("permissions.names.manageRoles"),
          description: t("permissions.descriptions.manageRoles"),
        };
      case ServerPermissions.ManageUsers:
        return {
          name: t("permissions.names.manageUsers"),
          description: t("permissions.descriptions.manageUsers"),
        };
      default:
        return {
          name: null,
          description: null,
        };
    }
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

  const renderSwitch = (
    values: FormValues,
    permission: PermissionsFormFragment,
    arrayHelpers: FieldArrayRenderProps
  ) => {
    const { name, description } = getPermissionText(permission.name);

    return (
      <Flex justifyContent="space-between" key={permission.id}>
        <Box marginBottom={2.8}>
          <Typography>{name}</Typography>

          <Typography
            fontSize={12}
            sx={{ color: theme.palette.text.secondary }}
          >
            {description}
          </Typography>
        </Box>

        <Switch
          defaultChecked={permission.enabled}
          onChange={handleSwitchChange(permission, arrayHelpers, values)}
        />
      </Flex>
    );
  };

  return (
    <Box {...boxProps}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form>
            <FieldArray
              name="permissions"
              render={(arrayHelpers) => (
                <Box marginBottom={2}>
                  {permissions.map((permission) =>
                    renderSwitch(values, permission, arrayHelpers)
                  )}
                </Box>
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
    </Box>
  );
};

export default PermissionsForm;
