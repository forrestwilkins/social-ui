import { CSSProperties, ReactNode } from "react";

interface Props {
  children: string | ReactNode;
  style?: CSSProperties;
}

const LevelOneHeading = ({ children, style }: Props) => (
  <h1 style={{ fontSize: 16, margin: 0, ...style }}>{children}</h1>
);

export default LevelOneHeading;
