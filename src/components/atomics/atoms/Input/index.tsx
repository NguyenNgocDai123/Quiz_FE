import React from "react";
import { InputProps } from "./types";
import { InputPadding, InputRounded, InputSize, InputTheme, InputType } from "./styles";

const Input: React.FC<InputProps> = ({
    type,
    size,
    theme,
    padding,
    rounded,
    children,
    className,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <input
            type={InputType[type]}
            className={`${InputSize[size]} ${InputTheme[theme]} ${InputPadding[padding]} ${rounded ? InputRounded[rounded] : ""} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        >
            {children}
        </input>
    // <input
    );
}
export default Input;
// export default Input;
