import React from 'react';
import { TextBouble } from './../../TextBouble/TextBouble';
import styles from './SwitchImage.module.scss';

interface SwitchImageProps {
    top?: string;
    left?: string;
    value: boolean;
    className?: string;
    onChange: (value: boolean) => (event: any) => void;
}

const SwitchImage = ({ onChange, value, top, left, className }: SwitchImageProps) => {

    return (
        <div
            onClick={onChange(!value)}
            className={`${styles.lightSwitch} ${className}`}
            style={{
                top,
                left,
            }}
        >
            <TextBouble
                className={styles.indexTextBoulbe}
                text={'switch it!'}
                top="-80px"
                left="-180px"
                flipped={true}
                outlined={true}
            />
            <div
                className={`
                    ${styles.switch}
                    ${value ? styles.on : styles.off}
                `}
            />
        </div>
    );
};

export default SwitchImage;
