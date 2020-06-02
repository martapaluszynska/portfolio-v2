import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Dots } from './Dots';
import './Hero.scss';
import { WorkImage } from './images/WorkImage';
import { TextBouble } from './TextBouble/TextBouble';

interface IProps {
    name: string;
    tagline?: string;
    image: JSX.Element;
    style?: string;
}

export const Hero: React.FC<IProps> = ({ name, tagline, style = 'is-seconadry', image, children }) => {
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);

    const [state, setstate] = useState({
        x: 0,
        y: 0,
    });

    const [cursorSwapped, setCursorSwapped] = useState(false);

    const startCursorSwap = () => {
        setCursorSwapped(true);
    };
    const stopCursorSwap = () => {
        setCursorSwapped(false);
    };

    const moveSwapperCursor = useCallback((event: MouseEvent) => {
        event.stopPropagation();

        if (!imageWrapperRef.current) {
            return;
        }

        const e = state.x;

        setstate({
            x: event.pageX,
            y: event.pageY,
        });
    }, []);

    useEffect(() => {
        if (!cursorSwapped) {
            return;
        }

        const div = imageWrapperRef.current;
        div?.addEventListener('mousemove', moveSwapperCursor);
        return () => {
            div?.removeEventListener('mousemove', moveSwapperCursor);
        };

    }, [cursorSwapped]);

    return (
        <section className={`hero ${style} is-bold is-fullheight`}>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div
                            ref={imageWrapperRef}
                            className="column is-full text-center has-text-centered hero__image"
                            style={{cursor: 'none'}}
                            onMouseEnter={startCursorSwap}
                            onMouseLeave={stopCursorSwap}
                        >
                            {image}
                        </div>
                    </div>
                    {tagline && 
                        <div className="columns is-centered">
                            <div className="column is-half">
                                <h2 className="subtitle is-12">
                                    {tagline}
                                </h2>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <img
                src="../../hand.png"
                className="cursor"
                style={{
                    left: state.x,
                    opacity: `${cursorSwapped ? 1 : 0}`,
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: state.y,
                    transform: 'translate(-95%, -30%)',
                    transition: `opacity .15s ease-out`,
                }}
            />
            {children}
        </section>
    );
};
