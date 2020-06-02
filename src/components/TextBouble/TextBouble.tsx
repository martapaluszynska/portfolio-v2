import React from 'react';
import styles from './TextBouble.module.scss';

interface Props {
    text: string;
    top: string;
    left: string;
    link?: string;
    flipped?: boolean;
    outlined?: boolean;
}

export const TextBouble = ({ text, top, left, link, outlined, flipped }: Props) => {

    return (
        <div
            style={{
                top,
                left,
            }}
            className={`
                ${styles.textBouble}
                ${flipped ? styles.flipped : ''}
                ${outlined ? styles.outlined : ''}
            `}
        >
            <a className={styles.textBouble__text} href={link}>{text}</a>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.6 96.6">
                <path d="M51.4 3.1a45.3 45.3 0 11-34.2 78.1L2.5 84.3l5.6-15.2A45.3 45.3 0 0151.4 3z" />
            </svg>
        </div>
    );

};
