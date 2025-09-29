import { InputPadding, InputRounded, InputSize, InputTheme, InputType } from "./styles";

export type InputProps = {
    type: keyof typeof InputType;
    size: keyof typeof InputSize;
    theme: keyof typeof InputTheme;
    padding: keyof typeof InputPadding;
    rounded?: keyof typeof InputRounded;
    children?: React.ReactNode;
    className?: string;
    placeholder: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};