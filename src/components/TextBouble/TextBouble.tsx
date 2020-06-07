import React from 'react';
import styles from './TextBouble.module.scss';

interface Props {
    text: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    link?: string;
    flipped?: boolean;
    outlined?: boolean;
    className?: string;
}

export const TextBouble = ({ text, top, left, bottom, right, link, outlined, flipped, className }: Props) => {

    return (
        <div
            style={{
                top,
                left,
                bottom,
                right,
            }}
            className={`
                ${styles.textBouble}
                ${flipped ? styles.flipped : ''}
                ${outlined ? styles.outlined : ''}
                ${className}
            `}
        >
            {link ? (
                <a className={styles.textBouble__text} href={link}>{text}</a>
            ) : (
                    <span className={styles.textBouble__text}>{text}</span>
                )}

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.6 96.6">
                <path d="M51.4 3.1a45.3 45.3 0 11-34.2 78.1L2.5 84.3l5.6-15.2A45.3 45.3 0 0151.4 3z" />
            </svg>
        </div>
    );

};
