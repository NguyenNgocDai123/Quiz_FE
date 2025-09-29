import { ETheme } from "@/constants/theme";

export type LoginBoxProps = {
  theme: keyof typeof ETheme;
  className?: string;
};
