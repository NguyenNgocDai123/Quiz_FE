import LogoIcon from "@/components/icons/Logo/logo";
import {
  LogoBorder,
  LogoBoxShadow,
  LogoFlex,
  LogoHeight,
  LogoPadding,
  LogoRounded,
  // LogoSize,
  LogoText,
  LogoWidth,
} from "./style";
import { LogoProps } from "./type";

export const Logo: React.FC<LogoProps> = ({
  // theme,
  className,
  onClick,
  size,
  padding,
  rounded,
  width,
  height,
  border,
  boxShadow,
  flex,
  text,
}) => {
  return (
    <div
      className={`${padding && LogoPadding[padding]}
        ${rounded && LogoRounded[rounded]} ${width && LogoWidth[width]} ${
        height && LogoHeight[height]
      } ${border && LogoBorder[border]} ${boxShadow && LogoBoxShadow[boxShadow]}
        ${flex && LogoFlex[flex]} ${text && LogoText[text]} ${className}`}
      onClick={onClick}
    >
      <LogoIcon size={size || "DEFAULT"} />
    </div>
  );
};
export default Logo;
