export const ButtonTheme = {
  DEFAULT: "bg-foreground text-background",
  PRIMARY: "bg-primary text-background",
  SECONDARY: "bg-secondary text-background",
  SUCCESS: "bg-success text-background",
  DANGER: "bg-danger text-background",
  WARNING: "bg-warning text-background",
  INFO: "bg-info text-background",
  LIGHT: "bg-light text-background",
  DARK: "bg-dark text-background",
};

export const HoverButtonTheme = {
  DEFAULT: "hover:bg-foreground hover:text-background",
  PRIMARY: "hover:bg-primary hover:text-background",
  SECONDARY: "hover:bg-secondary hover:text-background",
  SUCCESS: "hover:bg-success hover:text-background",
  DANGER: "hover:bg-danger hover:text-background",
  WARNING: "hover:bg-warning hover:text-background",
  INFO: "hover:bg-info hover:text-background",
  LIGHT: "hover:bg-light hover:text-background",
  DARK: "hover:bg-dark hover:text-background",
};

export const ButtonRounded = {
  DEFAULT: "rounded-full",
  PILL: "rounded-full",
};

export const ButtonSize = {
  DEFAULT: "h-10 sm:h-12",
  SMALL: "h-8 sm:h-10",
  LARGE: "h-12 sm:h-14",
};

export const ButtonPadding = {
  DEFAULT: "px-4 sm:px-5",
  SMALL: "px-2 sm:px-3",
  LARGE: "px-6 sm:px-7",
};

export const ButtonType = {
  DEFAULT: "button",
  SUBMIT: "submit",
  RESET: "reset",
} as const;
