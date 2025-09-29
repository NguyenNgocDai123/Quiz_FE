import { MouseEventHandler } from "react";
import { ButtonPadding, ButtonRounded, ButtonSize, ButtonTheme, ButtonType, HoverButtonTheme } from "./styles";

export type ButtonProps = {
  type: keyof typeof ButtonType;
  size: keyof typeof ButtonSize;
  theme: keyof typeof ButtonTheme;
  padding: keyof typeof ButtonPadding;
  rounded?: keyof typeof ButtonRounded;
  hover?: keyof typeof HoverButtonTheme ;
  className?: string;
  pointer?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export type SettingButtonProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};