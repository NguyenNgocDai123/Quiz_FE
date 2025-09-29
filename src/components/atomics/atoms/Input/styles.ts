export const InputTheme = {
  DEFAULT: "bg-background text-foreground",
  PRIMARY: "bg-primary text-background",
  SECONDARY: "bg-secondary text-background",
  SUCCESS: "bg-success text-background",
  DANGER: "bg-danger text-background",
  WARNING: "bg-warning text-background",
  INFO: "bg-info text-background",
  LIGHT: "bg-light text-background",
  DARK: "bg-dark text-background",
};

export const InputSize = {
  DEFAULT: "h-10 sm:h-12",
  SMALL: "h-8 sm:h-10",
  LARGE: "h-12 sm:h-14",
};

export const InputPadding = {
  DEFAULT: "px-4 sm:px-5",
  SMALL: "px-2 sm:px-3",
  LARGE: "px-6 sm:px-7",
};

export const InputRounded = {
  DEFAULT: "rounded-md",
  PILL: "rounded-full",
};

export const InputType = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
  NUMBER: "number",
  SEARCH: "search",
  TEL: "tel",
} as const;
