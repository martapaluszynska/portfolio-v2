import React, { InputHTMLAttributes, useState } from 'react';
import styles from './FormField.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (event: any) => void;
    value?: string;
    helpText?: string;
    success?: boolean;
    error?: boolean;
    required?: boolean;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    label?: string;
}

const FormField = ({
    success,
    error,
    iconLeft,
    iconRight,
    helpText,
    label,
    value,
    required,
    onChange,
    ...other
}: IInputProps) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <div
            className={`
                field
                ${styles.field}
                ${focused || value ? styles.focused : ''}
            `}
        >
            {label && (
                <label className={`label ${styles.label}`}>
                    {`${label}${required ? ' *' : ''}`}
                </label>
            )}
            <div
                className={`
                    control
                    ${iconLeft ? 'has-icons-left' : ''}
                    ${iconRight ? 'has-icons-right' : ''}
                `}
            >
                <input
                    className={`
                        input
                        ${success ? 'is-success' : ''}
                        ${error ? 'is-error' : ''}
                        ${styles.input}
                    `}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={onChange}
                    value={value}
                    {...other}
                />
                {iconLeft && (
                    <span className="icon is-small is-left">
                        {iconLeft}
                    </span>
                )}
                {iconRight && (
                    <span className="icon is-small is-right">
                        {iconRight}
                    </span>
                )}

                {helpText && (
                    <p
                        className={`
                            help
                            ${styles.helpText}
                            ${error ? 'is-danger' : ''}
                            ${success ? 'is-success' : ''}
                        `}
                    >
                        {helpText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FormField;
