import React, { useEffect, useState } from 'react';
import styles from './SwitchImage.module.scss';
import { TextBouble } from './../../TextBouble/TextBouble';

interface SwitchImageProps {
    top: string;
    left: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const SwitchImage = ({ onChange, value, top, left }: SwitchImageProps) => {

    return (
        <div
            onClick={() => onChange(!value)}
            className={styles.lightSwitch}
            style={{
                top,
                left
            }}
        >
            <TextBouble
                text={'switch it!'}
                top="-80px" left="-180px"
                flipped
                outlined
            />
            <div className={`
                ${styles.switch}
                ${value ? styles.on : styles.off}
                `} />
        </div>
    );
};

export default SwitchImage;
