import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styles from './LifeImage.module.scss';

interface Coordinate {
    x: number;
    y: number;
}

export const LifeImage = () => {
    const pupilRef = useRef<SVGCircleElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [following, setFollowing] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const getCoordinates = (event: MouseEvent) => {
        // const svg: HTMLCanvasElement = svgRef.current;
        const viewportOffsetTop = svgRef?.current?.getBoundingClientRect().top + window.scrollY;
        const viewportOffsetLeft = svgRef?.current?.getBoundingClientRect().left;
        return { x: event.pageX - viewportOffsetLeft, y: event.pageY - viewportOffsetTop };
    };

    const followMouse = useCallback(
        (event: SVGSVGElementEventMap['mousemove']) => {
            const percentageX = (event.pageX - svgRef?.current?.getBoundingClientRect().left) / svgRef?.current?.clientWidth;
            const percentageY = (event.pageY - svgRef?.current?.getBoundingClientRect().top) / svgRef?.current?.clientHeight;

            const positionOffsetX = 0.3875 + (percentageX / ((0.4 - 0.3875) * 10000));
            const positionOffsetY = 0.7275 + (percentageY / ((0.8 - 0.7275) * 1000));

            pupilRef.current?.setAttribute('cx', `${positionOffsetX * 100}%`);
            pupilRef.current?.setAttribute('cy', `${positionOffsetY * 100}%`);
        },
        [mousePosition],
    );

    const follow = useCallback(
        (event: SVGSVGElementEventMap['mousemove']) => { // needts to be throttled
            if (following) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    followMouse(event);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [following, mousePosition, followMouse],
    );

    const onMouseMove = useMemo(() => {
        return (e: any) => {
            if (e.type === 'touchmove') {
                e.preventDefault();
            } else {
                requestAnimationFrame(() => follow(e));
            }
        };
    }, [mousePosition]);

    useEffect(() => {
        const svg = svgRef.current;
        svg?.addEventListener('pointermove', onMouseMove, {passive: true});
        svg?.addEventListener('touchmove', onMouseMove);
        return () => {
            svg?.removeEventListener('pointermove', onMouseMove);
            svg?.removeEventListener('touchmove', onMouseMove);
        };

    }, [follow]);

    const startFollow = useCallback(
        (event: any) => {
            const coordinates = getCoordinates(event);
            if (coordinates) {
                setFollowing(true);
                setMousePosition(coordinates);
            }
        },
        [],
    );

    useEffect(() => {
        const svg = svgRef.current;
        svg?.addEventListener('mouseenter', startFollow);
        return () => {
            svg?.removeEventListener('mouseenter', startFollow);
        };

    }, [startFollow]);

    const endFollow = useCallback(
        (event: any) => {
            const coordinates = getCoordinates(event);
            if (coordinates) {
                setFollowing(false);
                setMousePosition(coordinates);
            }
        },
        [],
    );

    useEffect(() => {
        const svg = svgRef.current;
        svg?.addEventListener('mouseleave', endFollow);
        return () => {
            svg?.removeEventListener('mouseleave', endFollow);
        };

    }, [endFollow]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.svg}`}
            viewBox="0 0 371.6 319.8"
            ref={svgRef}
            style={{
                marginTop: -68,
            }}
        >
            <defs>
                <linearGradient id="a" x2="1" y1=".5" y2=".5" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#9cb189" />
                    <stop offset="1" stopColor="#5e734e" />
                </linearGradient>
            </defs>
            <path fill="url(#a)" d="M463.7 74.6c-10.8 21.6-79.3 2.9-88.4 34.8-6.7 24-42.3 41-52.7 66.9-24.5 61.3 9.4 110.5 75 118.4 42.7 5.2 88.2-42.8 121-27.7 61.7 28.3 132.7 15.2 114.3-24.8-9-19.6 24.5-53.2 22.8-73S640.4 149 601.2 136c-14.7-4.8-26.8-7-22.3-45.6s-85.6-75-115.2-15.8z" transform="translate(-303.8 24.7)" />
            <path d="M272.6 209.5c26.6 8.4 43.3 20.5 43.3 34 0 25.4-59 45.9-132 45.9s-132-20.5-132-45.9c0-12.7 14.7-24.1 38.6-32.4" className={styles.b} />
            <g transform="translate(1 256.5)">
                <g>
                    <path fill="#fff" stroke="#04181d" strokeMiterlimit="10" strokeWidth="2" d="M50.2 12.2c0 8.8-11.2 17.5-25 17.5a32 32 0 01-13.8-3A22.6 22.6 0 012.2 19 12.4 12.4 0 010 12.2C0 3.4 11.2 0 25.1 0s25.1 3.4 25.1 12.2z" />
                    <ellipse cx="22.4" cy="7.4" className={styles.d} rx="22.4" ry="7.4" transform="translate(2.7 3)" />
                </g>
                <circle cx="2.7" cy="2.7" r="2.7" className={styles.b} transform="translate(45.8 25.3)" />
                <circle cx="1.6" cy="1.6" r="1.6" className={styles.b} transform="translate(52.5 22)" />
                <circle cx="1.3" cy="1.3" r="1.3" className={styles.b} transform="translate(54 28.1)" />
            </g>
            <g transform="translate(266.6 240.7)">
                <circle cx="10.9" cy="10.9" r="10.9" className={styles.d} />
                <circle cx="2.6" cy="2.6" r="2.6" fill="#b4c0d3" transform="translate(13.1 3.6)" />
            </g>
            <g transform="translate(78.2 228.6)">
                <circle cx="6.5" cy="6.5" r="6.5" className={styles.f} />
                <circle cx="1.6" cy="1.6" r="1.6" className={styles.g} transform="translate(3.4 3.2)" />
            </g>
            <path d="M163.2 194a13.5 13.5 0 00-.5-3.2l-.4-2.2-.4-1.2-.6-3-.5-1.8a18.3 18.3 0 00-.4-1.8 4.6 4.6 0 00-.6-1.6l-.6-2-.4-1-.5-1.6-.7-2-.7-1.7-.6-1.6-.7-1.6-1.2-2.4a8.7 8.7 0 00-1-1.7l-2-1.8-.7-.7-1.3-1.3-2.9-3-2.6-3.3a18.2 18.2 0 00-2.4-2.8l-.8-1-1-.8a21.8 21.8 0 00-2-1.8c-1.5-1-2.4-2.4-3.6-3.5l-.4-.3c.1-.3.1-.6.5-.3h.6v-.2a8.1 8.1 0 00-1-1.2c-.8-.6-1-1.5-1.6-2.2-.1-.2.2-.6.5-.5.3.1.4 0 .6-.2a.9.9 0 01.7 0 8.9 8.9 0 011 .5l2.6 1.4a25 25 0 002.2 1.2 15 15 0 012 1.2 9 9 0 001 .4l-.3 1.6 2.8 1a2.4 2.4 0 00.4 0l.6.1c.5.5 1 .4 1.5.5a7 7 0 011.2.7l1.3.7.7.4a5.5 5.5 0 001.2.6c.5.2.8.7 1.2 1l.9.5a3 3 0 001.1.8 1.6 1.6 0 01.9 1.6 12.5 12.5 0 000 1.2c0 .4-.2.8.3 1v.5l.1-.1.9 1.4a2.5 2.5 0 00.2.3l.8.9.6.8a2.7 2.7 0 01.6 2.2 2.7 2.7 0 01-.1.6l-.3.7-.1 1a13.3 13.3 0 01-1.3 1.7l-.7.2a5 5 0 010 1.2c0 .3.3.6.5 1l.2.3.8 1.8.7 2 .4.6.8 2 .6 1.4c.2.2.2.6.3.8a4.8 4.8 0 00.6.7v.1a6.4 6.4 0 001.3 2.5 4.5 4.5 0 01.7 1.6l.3.7.8 2.4.8 2 1 2.5a6.3 6.3 0 01.5 2 1.6 1.6 0 00.2.4h.2v-1l-.1-1.1-.2-12-.1-5.6-.3-4.7-.4-4-.2-2-.2-2-.5-4.2-.1-1.2-.4-4-.5-3.7-.1-.2a12.6 12.6 0 00-.4-2.4l-.3-1.5-.3-1.4-.6-2.9-.7-2.4-.5-1.9-.4-1.6-.6-1.8-.3-1.2-.4-1.7a8.2 8.2 0 00-.6-1.1v-.1a1.7 1.7 0 00-.3-.9 12 12 0 01-.6-1.5c-.3-.9-.8-1.6-1.2-2.4l-.5-1.1-1-2-1-2-2.5-3.5-1.6-2.2a8.4 8.4 0 01-.9-1 2.6 2.6 0 00-.6-.8 3.6 3.6 0 00-.5-.3 48.5 48.5 0 00-6.2-6.2l-2.4-2-1.6-1.3-1.4-1.1-3-2.4-2.5-2-2.3-1.6-1-.8-2.4-1.8-1.4-1.1-1.6-1.4-2-1.9a1.5 1.5 0 01-.6-1.2l-.3-.5c-.1-.2 0-.5.2-.6a2 2 0 011 0l.2.6 4.3-.2c.8 0 1.6-.3 2.4 0a15.5 15.5 0 002.8.8c.2 0 .3.3.4.4a1 1 0 010 .5c0 .5.2.6.6.8l3.2 1.3c1 .4 1.8.9 2.8 1.2.9.4 1.8.5 2.6.8l2.2.7a4 4 0 00.5.1c.6.1.8.4.6 1a4.5 4.5 0 00-.2 1.5 1.2 1.2 0 00.6.7 7 7 0 001.8 1c1 .2 1.7.7 2.6 1a3.9 3.9 0 011.1.5c.2.2.5.4.1.7l.1.3 2.3 2 2 2.1a13.7 13.7 0 001.4 1.4c.8.5 1.3 1.3 2 1.9l1 .9a2.8 2.8 0 00.8.2v.4h.5c0 .3 0 .5.3.4a2.4 2.4 0 00.4.4l2.1 1.6h.5a.8.8 0 00.4.8l1.2 1a.3.3 0 01.1.2l.4.8a2.2 2.2 0 01.8 0l.3.4a3.6 3.6 0 00-.1-2 23 23 0 00-.7-2.6c-.2-.4-.1-.9-.3-1.2-.4-.4-.3-1-.4-1.4a4 4 0 00-.5-1 13.7 13.7 0 01-1.1-2.9l-1.3-3-.7-1.9a1.9 1.9 0 00-.4-.5 6.4 6.4 0 01-1.1-2.1l-1-2.6a22.3 22.3 0 01-1.2-3.8 23.4 23.4 0 01-.5-2.8l-.5-2.9-.1-.8a8.5 8.5 0 00-.3-1l-1-3-.6-2.1-.8-2.3a22.3 22.3 0 00-.8-3.3 10 10 0 00-.7-2 24.2 24.2 0 01-1-2.7c-.2-.5-.1-1.1-.2-1.6a4.9 4.9 0 00-.4-1l-.5-1-.7-1.6-.6-1.8-.3-1-.4-1.8-.5-1.8-.4-1.9-.6-1.6a4 4 0 01-.5-1.9l-.3-.5-.5-1.8-.3-.7-.5-2c-.5-1.3-1.2-2.6-1.6-4a14.3 14.3 0 01-1-5 2.6 2.6 0 012.2-2.8c.3 0 .6 0 .8-.5a.7.7 0 011-.3 4.6 4.6 0 002.1.5 80.2 80.2 0 012.2 1.2.5.5 0 01.2.3c.2.6.9.8 1.3 1.2l2.5 2.3a8.5 8.5 0 011.3 1.3 6.9 6.9 0 001.2 1.1 16.5 16.5 0 011.5 2l1 1.2 2.5 3 .6 1 .7 1 .8 1.1.2.3.3.6 1.5 2.2 1.6 2a6.4 6.4 0 01.3.6l.8 1.2c.1.2.8 0 1-.4a1 1 0 000-.4 7.4 7.4 0 01.8-2.7l.3-1a3.8 3.8 0 01.2-.5l1.5-3.5a2 2 0 00.1-.7c.6 0 .4-.7.7-1a14.6 14.6 0 00.7-1.6 4.5 4.5 0 01.3-.7 8.9 8.9 0 001.4-2.5 7.4 7.4 0 01.8-1.5l.7-1.1.6-1.2c0-.2 0-.4.2-.5a8.2 8.2 0 01.7-1.8 1.8 1.8 0 00.2-.8l.1.1a11.1 11.1 0 00.8-1l1-2.2.8-1.3a12.7 12.7 0 00.6-1.5 9.5 9.5 0 01.9-1.6 8.8 8.8 0 00.6-1 1.7 1.7 0 000-.7 4.2 4.2 0 00.6-.6l1-1.7-.1-.3v-.3l.6-.7a1.9 1.9 0 00.3-.7c0-.4 0-.8.5-1 .3-.2.5-.7.6-1.1.2-.4.2-.7.6-.9.3-.2.5-.6.7-1l.8-1.5.5-.5.2-.1a3.5 3.5 0 01.2-1c.1-.5.3-.6.5-.5l1-1.4a2.6 2.6 0 00.8-1.6c.4-.1.9-.3.9-1a1.2 1.2 0 01.8-1 1.9 1.9 0 00.6-.5c.4-.4.6-.3.8.1l.2.4c.7.2.6.9 1 1.3a8.8 8.8 0 001.5 2.3s0 .2.2.2a1.4 1.4 0 00.5.3c.3 0 .5-.2.5-.5V5.7a3.7 3.7 0 01.5-1.7l.3-1a1 1 0 00.2-.6c.3 0 .4 0 .6-.3 0-.3.3-.1.4 0l.4.5c.4 0 .9-.2 1-.6a5.6 5.6 0 00.4-1.2.8.8 0 011.2-.5 1.8 1.8 0 00.6.2 1.5 1.5 0 011.1 1 .8.8 0 001 .5l1.5-.4a.6.6 0 00.3-.3 1.1 1.1 0 01.8-.8.3.3 0 00.2-.1.6.6 0 01.9-.3c.2.1.3.5.4.7V1h.7V1a1 1 0 00-.4 1.2h.7a8 8 0 00-.7.7 1.9 1.9 0 00-.3.6 10 10 0 00-.3 1.5 11.9 11.9 0 01-.5 1.9c0 .1 0 .3-.2.4a1.5 1.5 0 00-.3 1.4 1.3 1.3 0 01-.4 1.2.3.3 0 00-.2.1l-.1 1.5a13 13 0 01-.2 2.7c-.2.6-.2 1.3-.3 2a12.9 12.9 0 00-.2 1.8 2 2 0 010 .3l-.5 1.7a16.6 16.6 0 01-.5 1.7l-.9 1.9-.6 1-.7 2-1 3.3-.7 1.3-1 2.9a2.3 2.3 0 01-.3.4 9.5 9.5 0 00-.8 1.7 11 11 0 01-1.8 3 16.3 16.3 0 00-1 1.6l-.7 1-1.1 1.5a9.2 9.2 0 01-1 .8l-.6.6.1.2 1.1-.5a19.8 19.8 0 003.4-2.1l2.4-1.7 1.5-1 1.2-1.2a3.1 3.1 0 01.5-.4l.7-.4a.5.5 0 00.3-.3c0-.3.3-.4.6-.6a3.6 3.6 0 00.7-.6l.6-.6h.4L208 37a10 10 0 00-.8 1 3 3 0 00-.1 1 1.6 1.6 0 00-.2.3l-.4 1.7a10.9 10.9 0 01-.6 1.7 4.8 4.8 0 00-.5 2.5 25.4 25.4 0 01-.1 3.5l-.4.4a6.2 6.2 0 00-1 1.9 17.6 17.6 0 000 2.7V56a6.3 6.3 0 01-.8 2.3 1.4 1.4 0 01-.5.6c-.6.3-.6.9-.6 1.3a9.4 9.4 0 00-.2 2.8 2.4 2.4 0 01-.2.7v.3c.2.6-.3 1-.6 1.4a5.9 5.9 0 01-.8.9l-.5.2-2 2c-.2.2-.6.3-.8.6l-.8.7-1.6 1.5-.8 1-1 1-.8 1a1.1 1.1 0 01-.2.3 4.5 4.5 0 00-.9.7l-1.5 2.2a8.8 8.8 0 01-1 1.3c-.3.3-.8.3-1 .6a2.2 2.2 0 00-.5 1 26 26 0 00-.5 2.3c-.1 1-.6 1.8-.3 2.9a2.1 2.1 0 00.5-.3l1-1s.2-.1.2 0a.6.6 0 01.3.2 1.7 1.7 0 00.7 1.1l.5.8a11.5 11.5 0 002.4 2c1 .5 1.8 1.1 2.7 1.8l2.4 2a.8.8 0 00.4.1 1 1 0 000-.3l-1.5-1.7-1.6-1.8a13 13 0 01-.7-1l-1.8-2.6a4 4 0 01-.8-2 6.9 6.9 0 00-.4-1.5c-.3-.9.3-1.2.8-1.6l.7-.5c.3-.3.6-.2.7.2a9.6 9.6 0 00.4 1.3 7.4 7.4 0 00.7 1.2 9.2 9.2 0 00.8 1l.6.6h.2a.9.9 0 000-.7 6.6 6.6 0 01-1.5-3.7c0-.8 0-1 .8-1.3l3.6-1a19.6 19.6 0 002-.9l1-.3 2.5-.9 1.5-.4 2.2-.8a15.1 15.1 0 001.6-.7 8.8 8.8 0 012-.6 3 3 0 011-.1c.2 0 .3.3.5.5a4 4 0 01.2.7c0 .1.2.3.1.4-.2.7.3 1.3.4 2a4.7 4.7 0 00.2.7l.2.1-.5-3.7c.4 0 .5-.4.5-.7 0-.4.2-.4.5-.2a2.4 2.4 0 01.4.3 2 2 0 01.4.5 2.2 2.2 0 010 .7h.1a1.8 1.8 0 00.2-.4c.1-.4.3-.6.7-.2a3.7 3.7 0 002.6.9 20.2 20.2 0 012.5.1 4.2 4.2 0 011 .3.8.8 0 001-.3c.4.2.4.3 0 .6l-2 1.4a1 1 0 00-.4.5 25.7 25.7 0 003.3-.6c.3 0 .5.3.7.6a4.2 4.2 0 01.2 3.3 1.4 1.4 0 000 .5V83a3.4 3.4 0 01-.3 1 5.2 5.2 0 01-.6 1.4 3.8 3.8 0 00-.5 1.9 4 4 0 01-.4.7l-.8 1.8a2.1 2.1 0 01-1.4 1.2l-2.8.8-4 .8h-.5l-.7.2a2.2 2.2 0 01-.4 0l-1.7.3-.3.2v.2l1.3-.2h1.8c1.3 0 2.7-.2 4-.4h1.6c.5 0 1 .1 1.4-.1.6-.5 1.4 0 1.9-.5a1 1 0 01-1.2.5c-.3 0-.4 0-.6.4a4.3 4.3 0 01-2.8 2.4 3.2 3.2 0 00-.9.5l-1.4 1-1 .8-2.1 1.2a24.8 24.8 0 01-2.5 1.3l-3.6 1.3a3.8 3.8 0 00-.5.2l.1.2 1.8-.3 2.4-.7 2.3-.8a7.6 7.6 0 001.9-.8c.3-.2.8-.2 1.1-.5h.4l-.3.2-1.3.8.6.3-1.2 2a1.8 1.8 0 01-.8.4 14.7 14.7 0 00-2.7 1.9 16.9 16.9 0 01-1.5 1l-1.2.7-2.4 1.7-.8.7-1.6 1.1-1.1 1-1 .6-1.2 1-3 2.2a3.2 3.2 0 00-.3.4c-.3.3-.7.3-.9.5a1.9 1.9 0 01-1.4.5 6 6 0 01-.7 0l-.5.5-1.5 4.2.1.1a2 2 0 00.5-.1 3 3 0 001-.8c.1-.3.5-.4.8-.6l1.8-.8c.2 0 .3.2.4.5a6.5 6.5 0 001.3 2.3l1.5 1.8.4.5h.2a3.7 3.7 0 00-.2-.8 4.7 4.7 0 00-.5-.6v-.1a1.2 1.2 0 00-.2-.5l-.8-.8c.3-.4 0-.7-.1-1l-.8-2.4c-.1-.3.4-.8.7-.9l1.6-.5h.1l1.6-.4a25.5 25.5 0 012.6-.3 12.3 12.3 0 014.1.1 4.8 4.8 0 00.6 0l3.7.7h1.5a.8.8 0 01.4.3 18.5 18.5 0 001.7 1.6 8.2 8.2 0 011.3 1.7 6.1 6.1 0 01.3.7c.3.5.1.8-.4.9l-.6.1v.2l1 .2a1.3 1.3 0 01.4 0 2.5 2.5 0 01.8 2.4 1.4 1.4 0 01-.4.4 5.5 5.5 0 01-1.8 1 10.4 10.4 0 00-1.2.4c-1 .4-2 .1-3 .2h-.2a1.7 1.7 0 00-.3.3l.3.2h5.7a5.4 5.4 0 01.6 0l-.3 1.7a10.6 10.6 0 01-.3 1.8l-.7.6a3.4 3.4 0 01-.5.2l.4.5a1.3 1.3 0 01-.4.2h-2a5.5 5.5 0 00-2.3.4l-.2.4a10.4 10.4 0 001.3 0l.9-.3c0 .4-.4.5-.6.7l-1.4.9-1 .7-1.2 1-1.2.9-2 1.5c-.9.6-1.7 1.2-2.4 1.9l-1.4 1.6a8.1 8.1 0 01-.7.6l-.3.2a5 5 0 01-2.3 1.2 2.7 2.7 0 01-2.2-.1 3.5 3.5 0 00-.9-.1l-1.4-.4.1.5a2 2 0 00-.7.2 1.8 1.8 0 00-.5.8l-.8 2.3-1 3-.8 2.4a24.7 24.7 0 01-.8 2.6c-.4 1-.7 2.3-1 3.4l-.8 2.7-.6 2.8-.5 1.5-.1.7-.5 2-.5 2.2c0 .7-.3 1.4-.4 2.1l-.6 3.8a1 1 0 01-.3.7c-.1.2 0 .5 0 .8a10.6 10.6 0 00-.3 1.4 2.4 2.4 0 01-.2 1.1 1 1 0 00-.1.4 3.6 3.6 0 01-.2 1.3 8 8 0 00-.4 2l-.5 2.1-.3 2-.6 2.8-.4 2.5a8.8 8.8 0 01-.2.9zm-1.7-71v.2a1 1 0 01.3.9 1 1 0 000 .4l.8 1.8.4 1.2 1 3.1.7 2.7.8 3.2a4.4 4.4 0 00.4 1.4 4 4 0 01.3 1.4l.4 2.1a2.5 2.5 0 00.1.5c.4 1 .4 2.2.8 3.2a24 24 0 01.7 3l.6 2.8.4 2 .5 2.3.4 2.3.6 4.1a3.3 3.3 0 00.2.6 2.3 2.3 0 00.4-1.9v-2l-.3-7.8v-4.2l-.4-8-.3-4.6-.4-4.5-.3-2.2-.3-2.1-.3-2.1a1 1 0 00-.3-.6h-.6c-.4.2-.7.5-1.1.6l-1.4.5a1.7 1.7 0 01-2-.4c-.3-.5-.3-.5-1-.2l-1 .3zm13.8 13.6l.1-.7.1-1.7.4-5.2.4-4.8.2-2.5c0-3-.2-5.9-.3-8.9l-.3-5-.2-4.2-.1-1.8-.6.4a9.6 9.6 0 01-1.4.7l-2.1.5a.9.9 0 01-.8-.3c-.2-.1-.6-.2-.7-.1-.4.3-.9.2-1.3.2 0 .2-.1.3 0 .4 0 .5.3.9 0 1.3-.1 0 0 .1 0 .2 0 .4.2.7.3 1.1a11.8 11.8 0 01.6 1.4l.9 4.1.6 3.5c.1.7.4 1.3.4 2l.9 6 .4 2.4.6 4.6a30 30 0 00.7 3.5.9.9 0 000 .2l1 2.3.2.4zm7.7-27.3l-.2 1.5c0 1.4-.2 2.7-.3 4l-.2 3.6c0 1.6-.2 3.2-.3 4.7l-.4 6.3-.5 7.5-.2 7.4v2.8a.9.9 0 000 .3l.3-.2a1.4 1.4 0 00.2-.6 6.7 6.7 0 01.6-2.6l.9-2.2.5-1.2.8-3 .4-1.6a.5.5 0 000-.2l-.8-2a10 10 0 01-.4-2.2 7 7 0 01.8-3.8 5 5 0 01.7-1l2.4-2.5.5-.4.3-1.3a225.6 225.6 0 011.7-5.1l.9-2a4.2 4.2 0 01-.2-.8c0-.9 0-.9-.8-1.1l-1.6-.5a1.7 1.7 0 01-.5-.4 7.6 7.6 0 00-.8-.7l-2.5-1.6a14 14 0 01-1.3-1zm-.4 59.8l.2.1a1.2 1.2 0 00.3-.3l.8-3 1-3 .6-1.9 1.4-3.8 1-3.4 2-5.5c.4-1 .7-2.2 1.2-3.2l.8-2a5.4 5.4 0 00.2-1.7l-.1-.2c-.4-.7-1.1-.9-1.7-1.2l-2.3-1a4.2 4.2 0 01-.7-.5c-.3-.2-.4-.1-.5.1l-.2 1-.7 3.2a59.1 59.1 0 00-1.1 7.6l-.2 2.2-.5 2.4-.2 2.3-.3 2.5-.1 2.5-.4 2.4-.5 4.4zm-4-55.8h.1a1 1 0 00.2-.3l.2-2 .5-4a7.3 7.3 0 000-3.2 5 5 0 01-.2-.7 15 15 0 010-3.9 6.4 6.4 0 000-.7h-.3l-1.9 2.2a.7.7 0 00-.1.5l.5 3.3.4 3.6.5 4.3v.9zm5.2-35.4a2 2 0 000 2c.2.2.2.4 0 .6a.4.4 0 00-.2.3l-.4 1.8a13.2 13.2 0 01-.4-2v-.3l-.7-2.6a2.5 2.5 0 00-.3-.5l1.3 6.6.1-.2.6-2a14 14 0 01.4-1.5 4 4 0 01.5-.7.3.3 0 000-.3.4.4 0 00-.2 0 1.5 1.5 0 00-.4 0z" className={styles.d} />
            <path d="M162.8 133.4L120 160l-41.2-27 41.8-8.8z" className={styles.h} />
            <path d="M119.9 209l-44-11.8v-63.8l44 11.8zM119.9 209l44-11.8v-63.8l-44 11.8z" className={styles.h} />
            <path d="M75.4 133l44.6-9.4 44 9.3" className={styles.b} />
            <path d="M119.9 145.8l-5.4 25.4-44.3-14.4 5.7-22.6" className={styles.g} />
            <path d="M119.9 145.8l-5.4 25.4-44.3-14.4 5.7-22.6" className={styles.b} />
            <g>
                <path d="M120.2 146l5.4 25.2 44.3-14.3-5.7-22.3" className={styles.g} />
                <path d="M120.2 146l5.4 25.2 8.1-2.6 36.2-11.7-5.7-22.3" className={styles.b} />
            </g>
            <g>
                <path d="M250.8 213l-64.9-25.3 5.7-22.7 5.8-23.8 65 25.2z" className={styles.h} />
                <path d="M250.8 213l69.1 7.9 11.5-46.6-69.1-8z" className={styles.h} />
                <path d="M198.4 141.5l68.7 9.8 64.3 23" className={styles.b} />
                <path d="M262 166.6l-12.8 17-64.9-27.4 12.9-14.7M263.6 166.6l3.5 21 70.2 6-4.6-19" className={styles.h} />
            </g>
            <g>

                <path fill="#5d0923" d="M110 214.3s-4 7.8-4 11-2.3 12.6-2.3 12.6l-3 7.6L89 255.8h8.7s15-1.8 16-2.2 3.5 1.3 7.2 3a34.2 34.2 0 0015 2.4 37.4 37.4 0 0010-2.5l8-2 3.5-1 6.9 2.3s15.5 7 29.8 7 34.6 1 50.9-8.2 19.1-11.8 20.7-19.4c2.1-10 2.3-25.1-15.1-39s-40.4-27-68.3-23.5c-22.8 3-47.4 19.3-47.4 19.3l-16 10.7-3.5-.3c-.8-.2-4.5-.3-4.5-.3l-2.2 1.7.4 6 2 3.8z" />
                <path d="M108.7 203.8s-2.4 1.4 0 6.2 0 6.6 0 6.6-3.5 8-3 12.6-3.2 11.7-3.2 11.7l-6.1 8.1-9 7.5h7.4s12.8-1.5 17-2.4 2.4.9 12 2.4 16.9 2 20.9 0 9.4-2 12.5-5a11.7 11.7 0 003.3-9.3c-.2-2.2-.2-5.7-2.8-7.5s2.9-3.8 2.9-3.8.1 5.6 2.8 8.7 7.3 10.5 13.2 10.8 15.7-1.1 17.4-3.6" className={styles.f} />
                <path d="M135.3 253.8l3.4-3.5 2-1" className={styles.f} />
                <path d="M145.4 232l-.5 3.7.5 2.6" className={styles.f} style={{ display: !following ? '' : 'none' }} />
                <g
                    transform="translate(137.5 228)"
                    style={{
                        display: following ? '' : 'none',
                    }}
                >
                    <path fill="#FFF" d="M8.7 1.7a4 4 0 00-3.3.8L3.6 0 2.1 1l2 2.7.4-.3-.8 1.3L1.4 3 .3 4.4l2.6 2 .5-.8v.6l-.1.2L0 6.1 0 8l3 .3a5 5 0 003.5 4.6H7a6 6 0 005.3-5c.5-3-1-5.6-3.5-6zm1.6 5.8A4.2 4.2 0 017 11c-.6-.2-2.6-1.3-1.8-4.4.2-1.2.6-2 1.3-2.6a2.3 2.3 0 012-.5c1.5.3 2.3 1.9 2 4z" />
                </g>
                <circle
                    ref={pupilRef}
                    style={{
                        display: following ? '' : 'none',
                    }}
                    cx="38.5%"
                    cy="72.5%"
                    r="1.75"
                    fill="#fff"
                />
            </g>
            <g transform="translate(273 106)">
                <path d="M98 6s-22-16.7-35 5.7-20.3 27-34.4 24.6S5 50 5 50" className={styles.b} />
                <circle cx="4.9" cy="4.9" r="4.9" className={styles.d} transform="translate(0 45)" />
            </g>
        </svg>
    );
};
