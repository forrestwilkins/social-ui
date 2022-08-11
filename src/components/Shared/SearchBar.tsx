// TODO: Add basic functionality for search

import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  InputBase,
  InputBaseProps,
  SxProps,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toastVar } from "../../client/cache";
import { FieldNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";

const SearchInput = (props: InputBaseProps) => {
  const theme = useTheme();

  const inputStyles: SxProps = {
    color: "inherit",
    "& .MuiInputBase-input": {
      color: theme.palette.grey[100],
      padding: theme.spacing(1, 1, 0, 1),
      transition: theme.transitions.create("width"),
      width: 225,
      [theme.breakpoints.down("lg")]: {
        width: 215,
      },
      [theme.breakpoints.down("sm")]: {
        width: 120,
      },
    },
  };

  return <InputBase sx={inputStyles} {...props} />;
};

const SearchBar = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const t = useTranslate();

  const initialValues = { query: "" };

  const handleSubmit = () => {
    toastVar({
      status: "info",
      title: t("prompts.featureInDevelopment"),
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: "8px",
        marginTop: 0.3,
        maxHeight: 38,
      }}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Box
              sx={{
                color: focused ? grey[100] : "rgba(255, 255, 255, 0.40)",
                display: "inline-block",
                height: "100%",
                paddingLeft: 2,
                pointerEvents: "none",
              }}
            >
              <SearchIcon
                sx={{ transition: "0.2s", position: "relative", top: 7 }}
              />
            </Box>

            <Field
              component={SearchInput}
              name={FieldNames.Query}
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
              placeholder={t("search.placeholder")}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchBar;
