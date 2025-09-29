import { LogoIconSize } from "./style";


export interface LogoIconProps {
  size: keyof typeof LogoIconSize;
  width?: number;
  height?: number;
}