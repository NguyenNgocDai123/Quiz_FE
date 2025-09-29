import Image from "next/image";
import { LogoIconProps } from "./type";
import { LogoIconSize } from "./style";


const LogoIcon: React.FC<LogoIconProps> = ({ size, width, height }) => {
  return (
    <Image
      src="/images/Quiz_logo.png"
      alt="Company Logo"
      style={{ margin: "auto" }}
      width={width ?? LogoIconSize[size].width}   // ưu tiên width truyền vào
      height={height ?? LogoIconSize[size].height} // ưu tiên height truyền vào
      priority
    />
  );
};

export default LogoIcon;
