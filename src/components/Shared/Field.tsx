import { TextFieldProps } from "@mui/material";
import { Field as FormikField, FieldAttributes } from "formik";
import { TextField } from "formik-material-ui";

export const Field = (props: FieldAttributes<TextFieldProps>) => (
  <FormikField component={TextField} sx={{ marginBottom: 1.5 }} {...props} />
);
