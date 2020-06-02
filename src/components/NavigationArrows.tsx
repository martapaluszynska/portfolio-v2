import React, { ReactNode } from 'react';
import './NavigationArrows.scss';

const Arrow = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => {

    return (
        <div className="arrow">
            {direction === 'left' ?
                (`<`)
                :
                ('>')
            }
        </div>
    );
};

export const NavigationArrows = ({ children }: React.Props<ReactNode>) => {
    return (
        <div className="navigation-arrows">
            <Arrow />
            <Arrow direction="right" />
        </div>
    );
};
