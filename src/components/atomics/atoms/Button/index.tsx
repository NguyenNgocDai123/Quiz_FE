"use client";

 import { ButtonPadding, ButtonRounded, ButtonSize, ButtonTheme, ButtonType, HoverButtonTheme } from "./styles";
import { ButtonProps, SettingButtonProps } from "./types";

export const Button = ({
  type,
  size,
  theme,
  padding,
  rounded,
  hover,
  className,
  pointer,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={ButtonType[type]}
      className={`${ButtonSize[size]} ${ButtonTheme[theme]} ${
        ButtonPadding[padding]
      } ${rounded ? ButtonRounded[rounded] : ""} ${className} ${
        pointer ? "cursor-pointer" : "cursor-not-allowed"
      } ${disabled ? "opacity-50" : ""} ${
        hover ? HoverButtonTheme[hover] : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};


export const SettingPageButton = ({ children, onClick, className = "" }: SettingButtonProps) => (
  <button
    onClick={onClick}
    className={`border-2 rounded-[10px] px-4 py-[1px] ${className}`}
  >
    {children}
  </button>
);
