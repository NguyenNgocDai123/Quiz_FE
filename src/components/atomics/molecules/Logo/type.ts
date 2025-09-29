import { ETheme } from "@/constants/theme";
import {
  LogoBorder,
  LogoBoxShadow,
  LogoFlex,
  LogoHeight,
  LogoPadding,
  LogoRounded,
  LogoSize,
  LogoText,
  LogoWidth,
} from "./style";
import React from "react";

export type LogoProps = {
  theme: keyof typeof ETheme;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: keyof typeof LogoSize;
  padding?: keyof typeof LogoPadding;
  rounded?: keyof typeof LogoRounded;
  width?: keyof typeof LogoWidth;
  height?: keyof typeof LogoHeight;
  border?: keyof typeof LogoBorder;
  boxShadow?: keyof typeof LogoBoxShadow;
  flex?: keyof typeof LogoFlex;
  text?: keyof typeof LogoText;
};
