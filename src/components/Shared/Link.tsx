import { useTheme } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { CSSProperties, ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Link = ({ href, children, style, ...linkProps }: Props) => {
  const theme = useTheme();

  return (
    <NextLink href={href} {...linkProps} passHref>
      <a
        href={href as string}
        style={{
          color: theme.palette.primary.main,
          textDecoration: "none",
          ...style,
        }}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
