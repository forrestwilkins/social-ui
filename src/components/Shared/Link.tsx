import { useTheme } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { CSSProperties, ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  href: string;
  style?: CSSProperties;
}

const Link = ({ href, children, style, disabled, ...linkProps }: Props) => {
  const theme = useTheme();

  return (
    <NextLink href={href} {...linkProps} passHref>
      <a
        href={href}
        style={{
          color: theme.palette.primary.main,
          pointerEvents: disabled ? "none" : undefined,
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
