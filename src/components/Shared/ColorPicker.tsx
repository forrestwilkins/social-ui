import { ArrowForwardIos } from "@mui/icons-material";
import { Box, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useTranslate } from "../../hooks/common.hooks";
import Flex from "./Flex";

interface Props {
  sx?: SxProps;
  color: string;
  label: string;
  onChange: (color: ColorResult) => void;
}

const ColorPicker = ({ label, color, onChange, sx }: Props) => {
  const [open, setOpen] = useState(false);
  const t = useTranslate();

  const colorBoxStyles = {
    backgroundColor: color,
    borderRadius: 1,
    height: 24,
    marginRight: 1.5,
    width: 24,
  };
  const pickColorStyles = {
    fontFamily: "Inter Bold",
    marginBottom: 1.25,
  };

  const handleClick = () => setOpen(!open);

  return (
    <Box sx={sx}>
      <Flex
        justifyContent="space-between"
        onClick={handleClick}
        sx={{ cursor: "pointer", marginBottom: 0.25 }}
      >
        <Typography>{label}</Typography>
        <Flex>
          <Box sx={colorBoxStyles}></Box>
          <Typography marginRight={1.25}>{color}</Typography>
          <ArrowForwardIos
            fontSize="small"
            sx={{ transform: "translateY(2px)" }}
          />
        </Flex>
      </Flex>

      {open && (
        <Box marginTop={2.5} marginBottom={1.5}>
          <Typography color="primary" sx={pickColorStyles}>
            {t("roles.form.pickColor")}
          </Typography>
          <CirclePicker onChangeComplete={onChange} />
        </Box>
      )}
    </Box>
  );
};

export default ColorPicker;
