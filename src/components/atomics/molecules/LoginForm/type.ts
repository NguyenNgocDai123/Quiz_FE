import { ETheme } from "@/constants/theme";

export type LoginFormProps = {
  theme: keyof typeof ETheme;
  className?: string;
  onSubmit: (values: { username: string; password: string }) => void;
};
