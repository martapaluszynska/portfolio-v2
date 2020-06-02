import React from 'react';
import styles from './ThreeD.module.scss';

export const ThreeD = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="89" height="78.4">
            <path className={styles.a} d="M1 13.4h62.5v63.5H1z" />
            <path className={styles.a} d="M88 65.2L63.4 77V13.2L88 1.6zM88 1.5H25.8M1 13.4l24.7-12" />
        </svg>
    );
};
