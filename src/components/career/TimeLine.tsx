import React from 'react';
import { SectionRow } from './../../models/site';
import './Timeline.scss';

type RichText = string;

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
        <div className="timeline">
            <div className="timeline__list">
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
                    <div key={index} className={`columns timeline__row ${(index + 1) % alternatingNth === 0 ? 'row-reverse' : ''}`}>
                        <div className="column is-half timeline__image">
                            {image}
                        </div>
                        <div className="column is-half timeline__item">
                            <h3 className="title is-4">{title}</h3>
                            <p>{text}</p>
                            <p>{date}</p>
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
                <div className="column is-half timeline__image timeline__image--main">{children}</div>
                <div className="column is-half">
                    {rows?.length && rows.map(
                        ({ title, text, date, link, image }, index: number) => (
                            <div key={index} className="columns timeline__row">
                                <div className="column timeline__item">
                                    <h3 className="title is-4">{title}</h3>
                                    <p>{text}</p>
                                    <p>{date}</p>
                                    {link && (
                                        <a href={link.link} className="button is-info" rel="noopener norefferer" target="_blank">{link.name}</a>
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
