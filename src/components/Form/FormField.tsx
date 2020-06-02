import React, { InputHTMLAttributes } from 'react';
import './input.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    helpText?: string
    success?: boolean;
    error?: boolean
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    label?: string;
}

export default ({
    success,
    error,
    iconLeft,
    iconRight,
    helpText,
    label,
    ...other
}: IInputProps) => {
    return (
        <div className="field">
            {label && <label className="label">{label}</label>}
            <div className={`
                    control 
                    ${iconLeft ? "has-icons-left" : ""} 
                    ${iconRight ? "has-icons-right" : ""} 
                `}>
                <input
                    className={`
                        input 
                        ${success ? "is-success": ""} 
                        ${error ? "is-error": ""} 
                    `}
                    {...other}
                />
                {iconLeft &&
                    <span className="icon is-small is-left">
                        {iconLeft}
                    </span>
                }
                {iconRight &&
                    <span className="icon is-small is-right">
                        {iconRight}
                    </span>
                }

                {helpText &&
                    <p className={`
                        help 
                        ${error ? "is-danger" : ""} 
                        ${success ? "is-success" : ""} 
                    `}
                    >
                        {helpText}
                    </p>
                }
            </div>
        </div>
    )
}
