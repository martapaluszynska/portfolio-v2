import React from 'react';
import certificate from '../../../static/MP.Certificate.eduweb.pl.pdf';
import { SectionRow } from './../../models/site';
// import './Timeline.scss';
import styles from './Timeline.module.scss';

enum POSITIONS {
    left = 'left',
    right = 'right',
}

type POSITIONS_KEYS = keyof typeof POSITIONS;

interface IProps {
    rows: SectionRow[];
    datePosition?: POSITIONS_KEYS;
    alternatingNth?: number;
    mainImage?: JSX.Element;
}

export const TimeLine: React.FC<IProps> = ({ rows = [], datePosition = POSITIONS.left, alternatingNth, mainImage }) => {
    return (
        <div className={`${styles.timeline}`}>
            <div className={`${styles.timeline__list}`}>
                {mainImage ?
                    <TwoColumns rows={rows}>{mainImage}</TwoColumns>
                    :
                    <OneColumn rows={rows} alternatingNth={alternatingNth} />
                }
            </div>
        </div>
    );
};

interface ColumnComponent {
    rows: SectionRow[];
    alternatingNth?: number;
}

const OneColumn = ({ rows, alternatingNth = 0 }: ColumnComponent) => {
    return (
        <>
            {rows?.length && rows.map(
                ({ title, text, date, link, image }, index: number) => (
                    <div key={index} className={`columns ${styles.timeline__row} ${(index + 1) % alternatingNth === 0 ? styles.rowReverse : ''}`}>
                        <div className={`column is-half ${styles.timeline__image}`}>
                            {image}
                        </div>
                        <div className={`column is-half margin-auto ${styles.timeline__item}`}>
                            <h3 className="title is-6">{title}</h3>
                            <p className={`${styles.date}`}>{date}</p>
                            <p className={`${styles.text}`}>{text}</p>
                            {link && (
                                <a href={link.link} className="button is-primary" rel="noopener norefferer" target="_blank">{link.name}</a>
                            )}
                        </div>
                    </div>
                ),
            )}
        </>
    );
};

const TwoColumns: React.FC<ColumnComponent> = ({ rows, children }) => {
    return (
        <>
            <div className="columns">
                <div className={`column is-half ${styles.timeline__image} ${styles.timeline__imageMain}`}>{children}</div>
                <div className="column is-half margin-auto">
                    {rows?.length && rows.map(
                        ({ title, text, date, link, image }, index: number) => (
                            <div key={index} className={`columns ${styles.timeline__row}`}>
                                <div className={`column ${styles.timeline__item}`}>
                                    <h3 className="title is-6">{title}</h3>
                                    <p className={`${styles.text}`}>{text}</p>
                                    <p>{date}</p>
                                    {link && (
                                        <>
                                            {link.link === 'certificate' ? (
                                                <a href={certificate} className="button" rel="noopener norefferer" target="_blank">{link.name}</a>
                                            ) : (
                                                <a href={link.link} className="button" rel="noopener norefferer" target="_blank">{link.name}</a>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </>
    );
};
