import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './WorkImage.module.scss';

interface Coordinate {
    x: number;
    y: number;
}

export const WorkImage = () => {

    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    const drawAreaRef = useRef<SVGPathElement>({} as SVGPathElement);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    const [isPainting, setIsPainting] = useState(false);

    const getCoordinates = (event: MouseEvent) => {
        const canvas: HTMLCanvasElement = canvasRef.current;
        const viewportOffsetTop = event?.target.getBoundingClientRect().top + window.scrollY;
        const viewportOffsetLeft = event?.target.getBoundingClientRect().left;
        return { x: event.pageX - viewportOffsetLeft, y: event.pageY - viewportOffsetTop };
    };

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const workArea = drawAreaRef.current.getBoundingClientRect();

        canvas.width = workArea.width;
        canvas.height = workArea.height;
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: any = canvasRef.current;

        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const drawLine = useCallback(
        (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
            const canvas: HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            if (context) {
                context.strokeStyle = '#5d0923';
                context.lineJoin = 'round';
                context.lineWidth = 5;

                context.beginPath();
                context.moveTo(originalMousePosition.x, originalMousePosition.y);
                context.lineTo(newMousePosition.x, newMousePosition.y);
                context.closePath();
                context.stroke();
            }
        }, []);

    const paint = useCallback(
        (event: MouseEvent) => {

            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition, drawLine],
    );

    useEffect(() => {
        const canvas: any = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    useEffect(() => {
        const canvas: any = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        // canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            // canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    const clearCanvas = () => {
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className={styles.workImageWrapper}>
            <canvas ref={canvasRef} id={styles.drawCanvas} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                    maxHeight: '70vh',
                    marginTop: -68,
                    marginLeft: `-5%`,
                    marginRight: `5%`,
                }}
                viewBox="0 0 897.4 516.1"
            >
                <defs>
                    <linearGradient id="a" x1=".2" x2="1.3" y1="-12.6" y2="-12" gradientUnits="objectBoundingBox">
                        <stop offset=".3" stopColor="#5e734e" />
                        <stop offset="1" stopColor="#9cb189" />
                    </linearGradient>
                    <linearGradient id="b" x1=".3" x2="1.4" y1="-9.7" y2="-9.2" xlinkHref="#a" />
                </defs>
                <g transform="translate(-207.6 -19.8)">
                    <ellipse cx="143.1" cy="144.2" fill="url(#a)" rx="143.1" ry="144.2" transform="rotate(-64.1 620 -412.3)" />
                    <ellipse cx="173.4" cy="174.8" fill="url(#b)" rx="173.4" ry="174.8" transform="rotate(-64.1 456 55)" />
                    <path fill="none" stroke="#04181d" strokeMiterlimit="10" strokeWidth="4" d="M951.2 357.4l-540 .6L360 486h646z" />
                    <path d="M910.3 407.4c22.6 0 40.8-6.8 40.8-35.1v-67.4c0-28.2-18.2-38-40.8-38-22.6 0-40.9 9.8-40.9 38v67.4c0 28.3 18.3 35 40.9 35z" className={styles.d} />
                    <ellipse cx="23.6" cy="9.1" className={styles.e} rx="23.6" ry="9.1" transform="translate(886 277.3)" />
                    <path d="M830.6 224a31.1 31.1 0 013.3-4 32 32 0 0114.8-7.8 1.6 1.6 0 001-1l2.4-8.2-14.4-1.6a6.4 6.4 0 012-.4l10.8-.3c1.8 0 3.6.5 5.5-.8 1.4-1 3.6-1.3 5.5-1.5 1-.1 2 .5 3.2 1l-4.4-7.8.4-.4 2.3 1.6-3-8.7.5-.2 4.7 11.7c.5 1.2 1.1 2 2.6 1.5a8 8 0 012.7-.6c1.3 0 2.9-1.6 4.3.4.2-1.5 0-3 .2-4.5a1149 1149 0 014-23.5 3 3 0 00-1.6-3.4 47.8 47.8 0 01-4.6-3c-1.4-1-2.7-1.5-4 0a6.5 6.5 0 01-1.5.6l1.9-2.8c-3.1-1.6-6-3.6-9.6-3.3a11.8 11.8 0 01-3.2 0c-2.3-.4-4.6-1-6.9-1.6l.2-.6a28.4 28.4 0 014.5 1.1 8.2 8.2 0 007-.2c3.1-1.4 6.3-2.4 9.8-1.8l2.5.4a17 17 0 01-2-2.4c-.9-1.6-2-1.8-3.6-1.5-2.4.4-4.9.3-6.9-1.7 2.6 1.3 5 .7 7.7-.7a19.3 19.3 0 00-3.3-2.3c-1.9-.8-4-1.3-6-2a2.4 2.4 0 00-1 0c-4.9.9-9.6 2-14.4 2.8-2.3.3-4.6-.2-6.9-.4v-.5a42.2 42.2 0 006.1 0 45.9 45.9 0 005.9-1.8l1.7-.3c1-.3 2.5-.3 3.3-1a61.2 61.2 0 004.6-5.8l-14-15.6c-2-2.3-4-4.7-6.2-7a96.6 96.6 0 00-8.7-8.2 50.2 50.2 0 00-8.2-4.7A31.5 31.5 0 01810.5 91a4.7 4.7 0 011.5 1 44 44 0 0012.5 8.4 87 87 0 0121.5 14.6c3.6 3 7.8 4 12.3 5a36.8 36.8 0 00-2.1-3.3c-5.8-7.3-11.4-14.7-17.5-21.6-5.5-6.1-11.7-11.7-17.4-17.6a354 354 0 01-10.1-10.8c-1.3-1.3-2.2-2.9-3.3-4.3l.4-.4a7.5 7.5 0 011.1 1c3.7 4.5 8.8 6.9 14 9a86.6 86.6 0 0123.2 15.4 157.2 157.2 0 0112 12.2 135 135 0 0115 19.7c1.3 2.2 1.4 2.2 3.8 1.1l-1-3c-1.5-4.5-2.7-9.1-4.5-13.5-3-6.9-6.3-13.6-9.4-20.4a25 25 0 01-2.5-9.9 12.7 12.7 0 00-1.1-4.7L852 54a32.2 32.2 0 01-3.5-13 2.6 2.6 0 00-1-1.7 38.4 38.4 0 00-11-6.5c2.1-1.2 4-2.4 6.2-2a18.3 18.3 0 017 3c4.9 3.7 9.5 7.8 14 12 4.3 4 8.4 8.2 12.4 12.3 5 5.2 10.3 10.4 15 15.9a90.5 90.5 0 0113.6 22.3l3 6.4-2-9c-1.2-7-2.1-14-3.5-21a462 462 0 00-5.6-25.7 158.5 158.5 0 00-5.5-16.3 7.2 7.2 0 00-2.8-3.7 97 97 0 00-9.8-4.2l-5.7-2a11 11 0 019.9.3 42.7 42.7 0 019.3 6.7c3.7 3.4 7.3 7 10.7 10.7 4.8 5.6 7 12.5 9.3 19.3l2.5 8 .2-.1.5-11.6c3.2 13 3 26.4 3.5 39.8l3.8-2 3.7-2-4.4 6.6a26 26 0 00-3.1 6.4c-.6 2.3-.4 4.8-.5 7.2a4.8 4.8 0 001-1.8 68.3 68.3 0 0111.1-21.1A130 130 0 01943.8 72a53.7 53.7 0 0121.6-12.5 44 44 0 0115-2.1c1 0 2 .3 3.5.5-11.7 4.8-23.5 7.8-34.2 13.5a40.5 40.5 0 0115-3.6c5.3-.4 10.5-1 15.5 1.1-2.5.3-5 .3-7.6.8-4.4.7-8.8 1.8-13.2 2.6a43.9 43.9 0 00-28.3 18.3 88.4 88.4 0 00-10.4 19c-1.1 3-2.4 6-2.6 9-.6 8.8-.7 17.6-1.2 26.4-.2 3.6-.8 7.2-1.2 10.8a24 24 0 000 2.5l5.4-6.2c-1.4 2-2.8 4-4.4 5.9a6.2 6.2 0 00-1.5 4.5c.3 4.3.5 8.5 1 12.7 1.7-5.5 3.2-11 5-16.3.7-2.5 2-4.8 3-7.2a9 9 0 00.4-2.1l-.5-.1-3 2.6c1-2.4 3-3.5 4.6-2.7a13 13 0 001.3-3.4c.2-4.2.1-8.3.4-12.4.3-4 .8-8 2.8-11.6 2.6-4.8 5.2-9.5 8-14.2a35.4 35.4 0 0112.5-13.4c3.2-2 6.6-1 9.1 3.5-1.6-.7-3.3-1.4-5-1.9-3.8-1-5.2-.3-6.3 3.5-1.5 5.1-2.6 10.4-3.8 15.7a11.3 11.3 0 00-.3 1.6 12.3 12.3 0 000 1.4c2.8-4 5.7-8.2 8.7-12.2a43.8 43.8 0 0117-13.6c2-1 4.4-1.7 6.5-3 9-5.6 18.1-11.1 29.1-12.1a7 7 0 015.6 1.7c-5.7 4.3-12.3 6.9-18.6 9.8l8.3 4a.8.8 0 01-.8.2l-11-2.3a3.3 3.3 0 00-1.8.2c-7.1 3-14.8 5-20.6 10.6-3.4 3.2-7.1 6.2-10.4 9.6-3.4 3.4-6.3 7.3-9.6 10.9-3 3.3-3.8 7.4-5 11.5l6.5-1.2a1.8 1.8 0 00.9-.8A78.5 78.5 0 01969 113a3.8 3.8 0 001.2-1.5l4.5-9.9.5.3-4.7 10.1a48 48 0 0119.6-6.5 26.3 26.3 0 0114.5 3 11.9 11.9 0 011.6 1.2l-.4.4a11.4 11.4 0 00-2.1-1.3c-1.2-.5-2.6-1.2-3.7-1-8.8 2-17 5.2-23.3 12.1-4 4.5-8.4 8.7-12.5 13.2-2.4 2.7-4.6 5.6-7 8.6a18.4 18.4 0 002.5-.5c3.6-1.2 7.3-2.3 10-5.2 1-1 2.2-1.8 3.2-2.7 2.5-2.3 5.5-4 6.8-7.6a9 9 0 014.8-4.9l-5 6.4c6.5-2.8 12.3-6.4 19.1-8.2a101.2 101.2 0 01-13.4 7.7c-3.6 1.6-7.5 2.6-9.8 6.4l-.5.4-7 6.6.2.3 8.4-5.2c2.7-1.8 5.3-3.8 8-5.7l7.7-5.7.3.4a126.7 126.7 0 01-26.3 24 14.6 14.6 0 004-1.3c5-2.6 9.8-5.4 14.8-7.9a19 19 0 0111.4-1.8c2.2.3 4.4.6 6.7.7a11.3 11.3 0 002.3-.3 16.5 16.5 0 01-3.9 2.1c-4 1.7-8 3.2-11.9 5-6.4 3.2-12.5 7-19 9.8a97.3 97.3 0 00-23.6 14.2 7.8 7.8 0 00-2.5 2.7c-1.3 3.2-2.2 6.5-3.2 9.6a32.3 32.3 0 014.8 1.8 1.6 1.6 0 002.6-.6l3.4-4.4a36.5 36.5 0 003.2-3.9c1.1-1.8 1.8-3.9 2.8-5.8 2.2-3.9 4.3-7.8 8.1-10l-4 9.8a8.4 8.4 0 002.1-1.3 95.6 95.6 0 018.3-5.7 347 347 0 0117.7-9 73.8 73.8 0 018-2.8l.2.5a15 15 0 01-1.4.9l-14 6.5a76 76 0 00-19 12c-1 .8-2.3 1.6-2.7 2.8-1 2.9-1.7 6-2.6 9.2 3-1.3 5.7-2.4 8.3-3.7 4-2.1 7.8-4.4 11.6-6.7a36 36 0 0121.9-4.1 77.3 77.3 0 018.7 1.5v.5l-4.4.7c-3.3.3-6.7.4-10 1.1a95.2 95.2 0 00-37.3 16.5 3.9 3.9 0 00-1 1.2c-1.6 3-2 5.9.5 8.6.3.4.4 1 .7 1.3a1.7 1.7 0 001 .6c1.5.2 3 .5 4.3-.8a6.4 6.4 0 011.5-.8l.2.3-1.6 1.9 3.6 2.2c-2.7.4-5-1.9-7.1.6l7.1 2-.1.4-5.7-.9-.1.6c2.3 2.1 6.1 1 8.4 3.5l-7-1.7 1.1 2a14.8 14.8 0 00-1.5-.7c-1.4-.4-3-1.3-4.3-1a58 58 0 00-8 2.7 1.9 1.9 0 00-1.1.8l-2.3 6.6a27.7 27.7 0 0113.1-2.3c1.4 0 2.8.4 4 0 2.4-.8 4.8-2 7.2-3h.3l-4 3.9c6.6 3.2 6.6 3.2 7.1 4.5-2.1-1-4.6-2.1-7.1-3a4.2 4.2 0 00-3 .1c-7 3.4-13.9 7-20.9 10.5a3 3 0 00-1.4 1.1l-2.5 6.1h5a34.4 34.4 0 01-4.7 1.3c-1.1.2-2 2.3-1.8 4 3.8-2 7.7-4 11.5-6.2a15 15 0 003.7-2.4 22.3 22.3 0 019.8-6 12 12 0 0110 1.1l.5.7-1.5 1.1c9 0 17.4 1.2 25.1 5.2 7.8 4 14.3 9.4 18 17.5l-3.5-4.5c-3.4-4-7.8-6.3-12.5-8.4a71.7 71.7 0 00-34-5.2 7.3 7.3 0 00-2.1 1 2.4 2.4 0 001.4.3l16 .4a30.3 30.3 0 0114.8 3.8 45.4 45.4 0 013.8 2.7l-.3.3-9.7-3-.3.6a31.5 31.5 0 0117 17.4 26.1 26.1 0 01-5.3-3.1c-5.4-4-10.8-8.3-17.2-10.5-5-1.7-9.6-4.3-15.3-1.7-7.7 3.6-15.8 6.4-23.6 9.8a8.2 8.2 0 00-3.4 3.4 91 91 0 00-7.6 18.8c-1.4 4.4-2.9 8.8-3.1 13.6h-2.1l1.3-17.5.8-9.5.7-6.3-.6-.2c-.8 2.4-2.1 4.8-2.5 7.2a110.2 110.2 0 00-1 13.7c0 4.2.4 8.4.6 12.6h-1.7l-.5-20.2-.6-.1a26.5 26.5 0 00-1 5l.3 15.3h-20.4l-1.4-16.5-.7-9.8-.4-3.7c-1.5 2-1 4.3-1 6.5l.7 23.5h-3.8l-2-10.1h-.4a11.8 11.8 0 001 6.6c.6 1 .5 2.3.7 3.5H892l-2.6-10.8a8.6 8.6 0 00-1.1-3l2.3 13.8h-2.1c-1-3.7-2-7.3-2.7-11-1.2-5.8-2.9-11.2-7.8-15-1-.8-1.8-1.8-3 .2.5-2.3-1-2.7-2.2-3.3-4.5-1.9-9-1.8-13.2.8l-8.1 5.1a10 10 0 016.3-7c3-1.1 6.2-1.4 9.5-2.1a31.8 31.8 0 00-2.8-2c-1.2-.8-2-3-3.8-2.2-1.5.6-2.6 2-3.9 3.1a5.4 5.4 0 00-.6.8l-2.8 3.6c-.2-5 2.4-7.5 6.9-8.8l-1.4-1.1-7-6.6c-4.5-4.4-8.8-9-14.9-11.2a7.8 7.8 0 01-1-.7c3.3.1 8 2.3 10.7 5a123.7 123.7 0 0014 12.4 6.7 6.7 0 004.9 1.5 10.3 10.3 0 017.2 2l1.5.9c-.5-2.7 1.2-3 2.8-3-2.2-5.6-4.7-11-6.4-16.6-1.8-5.7-2.8-11.6-4.2-17.7-2.3 0-5 .1-7.7.4-2.7.3-5.4.8-8 1.4a1.5 1.5 0 00-1 1 30.8 30.8 0 00.5 4.8c.6 2.8.6 4.2 0 5.2l-1.6-10.7a45.8 45.8 0 00-12.3 4.9c-2 1.1-3.9 2.5-5.8 3.8zm56.3-18.3c-.4-2.4-.7-4.8-1.2-7.1a8.2 8.2 0 00-1.4-2.9l-5-6.4-1.9 11.2c-.3 2-.2 4-.4 6.1a3.3 3.3 0 001.2 3l9.2 8.3c1.5-4.6.2-8.4-.5-12.2zm14.1-86.2c1.8-2.5 1.2-4.5-.2-7-3.5-6.6-6.5-13.4-9.8-20-3.2-6.3-7-13.6-14.3-21.9l8 17c2.7 5.7 5.4 11.4 8 17.3 2.4 5.8 4.6 11.8 7 17.8a15.7 15.7 0 011.3-3.2zm36 123.1c-1.4 1.9-1.8 4.4-2.3 6.7l-3 14-.9 7.5a21 21 0 00-.1 4.2l3.6-10.5c1.2-3 2.7-6 4-9a51.5 51.5 0 001.7-6c1.1-4 3.5-7.4 5.8-10.8l.7-1a1.8 1.8 0 00.1-.4 12 12 0 00-9.7 5.3zm-52.6-59.8a7.1 7.1 0 001 1.5l4.3 7.4a60.6 60.6 0 00.5-17.3 2.7 2.7 0 00-1.2-1.6c-1.1-.9-2.4-1.6-3.8-2.5a18.8 18.8 0 00-.8 12.5zm-20 23.2l-8.4-2.4a1.9 1.9 0 00-2.5 1l-3.7 7.2 17.5-1.3c0-2.4-.7-3.7-3-4.5zm9.3-139.2c-5.6-6.8-11.2-13.5-17-20.2a25.6 25.6 0 00-3.8-3.3c-.3-.2-.8-.1-1.2-.2 0 .5-.2 1 0 1.4l5.8 7.4c5.8 6.8 12.1 13 17 20.7.4-2 .4-4.2-.8-5.8zM937 206.3a10.8 10.8 0 004.1-7.2 61.4 61.4 0 00.5-6.7c-2.2 2-5.9 2.8-6 7 0 1.4-1.5 2.6-2 4-1.1 3-2 6.3-3.1 9.4h.3c2-2.2 3.9-4.7 6.2-6.5zm-49.3 48.1a8.4 8.4 0 001.3 8.3 14.9 14.9 0 012.6 6.8l1.4 6.5h.5c-.2-2-.4-4.1-.4-6.2 0-.6.6-1.3.6-2l-1.2-9.5a16.5 16.5 0 01-.5-3.2c.2-2.2-1.2-3.1-3-4.1l-1.3 3.4zm-1.9-9.9a33.5 33.5 0 011.3-4.4c1.4-3.2.6-6-1-8.8l-6.2-10.4-.6.2zm39.3-4.3a12 12 0 00-.5 4.7c.1 3 .4 6 .7 9l.2 4.7c1.7-2 3-13.5 2.4-21-1 1-2.4 1.6-2.8 2.6zm26.6-24a37.5 37.5 0 00-4.5 2c-2.1 1-2.6 1.8-3.2 4.7l17.1-7.8c-3.4-1.3-6.4 0-9.4 1zM865 133.8l1.3-.5c-2-3.5-4-7-6.2-10.3-.5-.8-2-1-3-1.3a22.8 22.8 0 00-3.2-.4zM896 257.5h-.6a28.7 28.7 0 00-.7 3.5c-.4 4.8.7 9.4 1.4 14l1.5 9.2h.4l-2-26.7zm.8-128.1c-2.8-7.4-5.6-14.7-8.6-22 .9 4.7 1 9.6 3.6 14 1.9 3 3.3 6.2 4.8 9.4h.3a5.3 5.3 0 00-.1-1.4zm2 108.4a80.4 80.4 0 00-.9-8 8.5 8.5 0 00-2.2 7.5l1.1 7.9c2.2-2.3 2-5 2-7.4zm49.4-104.3c-2.9-.4-4.8 1-6.8 2.4-.3.2-.2 1.2-.3 1.9l-1 4.8.4.3zm-83.5 10.2l-5-5.6-4 4.5zm81.4 56.7a2.9 2.9 0 00.3-4.4l-1-.7c-2.6 1.7-3 4.6-4 7.4l4.7-2.3zM892.4 213l3.7-.2c.2-2.8-.2-5.5-3.3-7.9l-.4 8.1zm3.8 9a1.8 1.8 0 00.9-2.5 9.4 9.4 0 00-4.6-4.9c.9 3 .4 6 2 8.6a17.6 17.6 0 011.7-1.2zm36.5 14.4l-1.8.2-1.6 15.2c3.2-4.3 2-10 3.4-15.4zm-33.3-66c.3 1.3 1.6 2.3 2.4 3.4 1.7-1 1.6-2.3.8-3.6l-3.3-5.7-.4.2a29.5 29.5 0 00.5 5.8zM889 210.2l1.2-5.9c.6-2.6-1.4-3.6-3.2-5l2 11zm71.4 26.8a4.5 4.5 0 00-3.8.7c-2 1.5-4 3-5.8 4.7l11.7-5-2.1-.4zM922 168.8l.4.2 4-7.4c.9-1.5 2-2.8 1.6-4.7 0-.4-.2-.7-.3-1l-.4-.2-5.3 13.1zm15 67l-3 .3-1.2 8.7.7.1 3.6-9.2zm-31.2 41.6h.6l-2.2-23.7h-.6l2.2 23.7zm-45.2-76.7c-2.4-1.4-2.4-1.3-4.5.6l8.3 2.6.2-.3-4-2.9zm29.8 9.6c-1.2 3.5-.4 8.7 2 10.4l-2-10.4zm46.6 7.3c4.4-.6 5.8-1.7 5.8-5-1.9 1.9-4.6 2.3-5.8 5zm-41.4-33.7l2-4.2-3.5-2.8 1.5 7zm42.4 45.9c-1.4 1.3-3.8 1.5-3.7 4 3.1.5 3.7 0 3.7-4zm-54.2-13l3.5 5c.3-3.7-.2-4.3-3.5-5zm24.4-82.7v-5.5h-.2l-1.9 5.5zm-15.4 148.8c.3-3.8-1.3-7.2-2.6-10.6zm-4-63l.4 5.6c1.7-1 1.3-4.2-.5-5.7zm-3.4 45.7l-.7.2 2 9.5.5-.1zm38.8-10.3h-.5v7.9h.5zm-54.3-115l.2-.2c-1-1.7-1.9-3.5-3-5.2 0-.2-.9 0-1.6-.1zm39.5 111.5c-1.3 2.8-.6 5.5 0 8.2zm22.7 1.7l1.5-6.6c-1.8 2.3-1.8 4.4-1.5 6.6zm-33.9-83.7l-.4-4.5c-1.3 2.2-1.3 3 .4 4.5zM882 148l-2.7-3.4c0 2.2.5 3.4 2.7 3.4zm72 54.8c-1.2-1.5-1.7-1.4-3 .7zm-57.6-42.2h-.9l.2 3h.7zm-4.7 62l.5 3.4c1.4-1.4 1.3-2-.5-3.4z" className={styles.e} />
                    <path ref={drawAreaRef} id="drawArea" fill="#f4f4f4" d="M489.4 55.4h387.2v387.2H489.4z" />
                    <path d="M489.5 59h387M489.5 79h387M489.5 99h387M489.5 119h387M489.5 139h387M489.5 159h387M489.5 179h387M489.5 199h387M489.5 219h387M489.5 239h387M489.5 259h387M489.5 279h387M489.5 299h387M489.5 319h387M489.5 339h387M489.5 359h387M489.5 379h387M489.5 399h387M489.5 419h387M489.5 439h387M873 55.5v387M853 55.5v387M833 55.5v387M813 55.5v387M793 55.5v387M773 55.5v387M753 55.5v387M733 55.5v387M713 55.5v387M693 55.5v387M673 55.5v387M653 55.5v387M633 55.5v387M613 55.5v387M593 55.5v387M573 55.5v387M553 55.5v387M533 55.5v387M513 55.5v387M493 55.5v387" className={styles.g} />
                    <path d="M473.8 427.7c0 22-17.7 36-39.6 36s-40-14-40-36a39.7 39.7 0 0179.6 0z" className={styles.d} />
                    <ellipse cx="22.5" cy="8.7" className={styles.e} rx="22.5" ry="8.7" transform="translate(410.9 395.2)" />
                    <path d="M541.6 261.8a28.2 28.2 0 01-3.5 7.5c-1.7 3-3 6.3-4.7 9.3a38.6 38.6 0 01-9.7 12.2 2.3 2.3 0 01-3 .2 4.5 4.5 0 00-1.9-.2 2.2 2.2 0 00-.9.2c-2.5 1-5 .7-7.5 0-2.8-.9-5.7-1.6-8.5-2.3a2.5 2.5 0 00-1.4 0c-1.1.4-2.2 1-3.4 1.3a20.6 20.6 0 01-5 .8 8.6 8.6 0 00-5.5 2c-.9.6-1.9 1.1-2.8 1.8a9.6 9.6 0 00-2.2 2.2 19 19 0 01-7.5 6.2 3.3 3.3 0 01-3.8-.5l-4.7-4.3a15.4 15.4 0 01-1.2-1.5l-.2.1a2.6 2.6 0 00.1.6 38.4 38.4 0 014 9.6 1.4 1.4 0 001.2 1 22.6 22.6 0 006.7.5c2 0 3.8-.5 5.7-.5l15.2.5a67.7 67.7 0 0114.2 2.1l13.4 3.8a63.8 63.8 0 007 1.3 5.3 5.3 0 003.3-.8l1.7.6c-.6 0-.6.5-.4 1.1a2 2 0 01-2.1 2.6c-1.7-.1-3.4-.6-5-1l-12.3-2.5-5.2-1.4a2.6 2.6 0 00-1.8.1 13.1 13.1 0 01-2.2.5c.4 2 5.3 8.3 11.8 15.5l-3.3-.2-2.4-.3a8.4 8.4 0 01-4.4-1.4 5.7 5.7 0 00-4-1.2c-1.5.1-2.6-.8-3.8-1.5a41.4 41.4 0 00-5.7-2.6 51 51 0 01-8.9-4 5 5 0 00-1.5-.7l-7.7-1.3a14.6 14.6 0 01-3-1.2 1 1 0 00-1.6.3 16.5 16.5 0 01-3.2 2.6c-1.4 1-3 1.7-4.6 2.6a5 5 0 01-3.4.6 24.8 24.8 0 00-8 .3c-2.2.5-3.5 2-5 3.5a33.5 33.5 0 00-9.5 14.5 50 50 0 00-1.6 8.9c-.4 3-.5 6.1-.6 9.2v.7l.2.2a17 17 0 001.9-2.5 7.5 7.5 0 012-2.2 12.2 12.2 0 011.4-.9l-2.2-1.3a7.2 7.2 0 014.3-1.4 1.9 1.9 0 001.6-1.2 16 16 0 012.5-3.1 1.6 1.6 0 011.3-.3 7.2 7.2 0 005.2-1.1 38.3 38.3 0 003.4-2 4 4 0 015 0c1.8 1.3 4 1.7 6.2 2.5 2.1.8 4.2.4 6.3 0 1.7-.1 3.3-.4 5-.6a4.2 4.2 0 013.2.5c1.8 1.3 3.6.8 5.4.6l4.1-.5a2.4 2.4 0 012.4 1 5.5 5.5 0 00.5.5 3 3 0 011 3.2c3.9 1 6 4.1 8.6 6.7 1.1 1.2 1.8 2.8 2.8 4.4-1.6 0-.3 1.3-1.2 1.6l-2.4-2.2-2.3-1.3c-.5-.2-.8-.7-1.3-1a1.7 1.7 0 00-1.2-.3c-.3 0-.4.7-.4 1.1 0 .8-.3.8-.8.5l-5-2.6a12.5 12.5 0 00-2-.7l-3-.9a1.8 1.8 0 00-.8 0l-4.3 1.3-7.3 2.4a2.3 2.3 0 01-1.3-.2c-1-.3-1.7-.8-2.6-1.2l-3.7-1.6-5.3-2.4a11.5 11.5 0 00-1.5-.6c-1.4-.4-2 .6-2.9 1.4l-2.2 2.3a4.8 4.8 0 01-3.3 1.5 10.5 10.5 0 01-6.5-1.7l-2.3-1.4a18.4 18.4 0 00-7.6 12.4l-.7 4.8c0 .6 2 28.8.6 29l.5 7.2-8.4-.7-1.5-12.8v-4.9c0-.2-1.5-21.3-1.8-22.1-.8-1.8.1-3.6-.2-5.3a4.5 4.5 0 010-.6h-.4c-2.6 2-5.8 2.9-8.8 4-2.8 1.2-5.8 1-8.7.7a13 13 0 01-6.6-2 23.6 23.6 0 01-3-3.3l-.3-.4c-2-1.4-2.3-3.5-1.9-5.6.3-1.5.9-3 1.2-4.4a1 1 0 011.3-.7 58 58 0 016.2 1.6 42.7 42.7 0 008.2 1.8l5.7 1c.5 0 1-.1 1.6 0l4.6.7 1.5.1-.5-3.2a27 27 0 00-6-11.3 48.8 48.8 0 00-9-8 2.9 2.9 0 00-2.3-.7 7.5 7.5 0 01-7-2.3 15.5 15.5 0 00-2.7-2.3c-1.8-1.1-3.1-.9-4.5.8a6 6 0 00-1 1.4c-.7 1.9-2.2 2.7-3.9 3.5a24.3 24.3 0 01-13 1.7 5.8 5.8 0 01-3.6-2 1.2 1.2 0 00-1.4-.4c-4.5 1.2-8.9 2.5-13.4 3.5a41.2 41.2 0 01-6.2.8 3.8 3.8 0 01-4-2.2l-1-1c-1.4-1.4-.8-2.6-.1-3.9a5 5 0 014.4-2.7l8.4-.6a92 92 0 0014.9-1.9 52.2 52.2 0 0116.6-.9c1.8.2 3.4-.4 5-.9l5.7-1.2a6.5 6.5 0 011.7 0c.8-.9 1.1-1 2.4-.4 2.4 1 4.7 2.3 6.9 3.6a9.7 9.7 0 012 2c1 1.3 2 2.5 3.2 3.7a2.2 2.2 0 001.2.5l3.2.1a2.3 2.3 0 012 1.7 2.4 2.4 0 01-1.5 2.5c-.6-1.2-1-1.3-1.7-.5a1.4 1.4 0 00-.2 1.3 7.3 7.3 0 001.7 1.8 6.9 6.9 0 012.7 3.1 1.6 1.6 0 00.8.8 14 14 0 000-1.8c-.4-3.4-.8-6.8-1.4-10.2a27.5 27.5 0 00-3.3-8.4c-2.4-4.2-5.8-7.7-9.1-11.2a1.2 1.2 0 00-1-.3l-4.7 1.8c-.2 0-.4.4-.5.6a9.2 9.2 0 00-.5 1h-.3l-.7-4.4c-.1-1.3 0-1.3-1.2-1.4l-.8 4.1a2.6 2.6 0 01-2.1 2.2c-1.7.5-3.2 0-4.8-.4-3.7-.8-7-2.4-9.1-5.7a23.4 23.4 0 01-2-5 .8.8 0 00-.8-.6l-4.7-1a1.7 1.7 0 00-1 .2l-10.8 5.3a8.4 8.4 0 00-3.5 2.7 5.3 5.3 0 01-2 1.4c-.8.5-1.8.8-2.6 1.2a3 3 0 01-3.8-.5l-4.7-4.5-.4-.4a3.5 3.5 0 00-4.8-.3l-.2.2c-3 1.7-4.5 1.8-7.6-.9a32.3 32.3 0 01-3.7-4.3 13.7 13.7 0 00-5-4.2 14.7 14.7 0 00-4.3-1 7.3 7.3 0 01-3-1.5l-6.6-4.8a1.9 1.9 0 00-.8-.4c-1-.1-1.2-1-1.4-1.8l-.3-1.6v-.8l.4-.9a5.9 5.9 0 00.7.7c1.3 1 2.7 2.1 4.5 2 5.3-.4 10.5-1 15.8-1.5a132.6 132.6 0 0124.5.5c4.8.5 9.7 1.3 14.4 2.2a77.4 77.4 0 0116.4 4.7c4.8 2.1 9.5 4.6 14.3 6.9a47.1 47.1 0 018.9 5.2 6.9 6.9 0 005.7 1.6 4.4 4.4 0 01.8 0c.5 1-.2 1.3-1.1 1.6 1.2 2.4 3.4 3.9 5.1 5.7a1 1 0 000-.6l-2-5.1a86.2 86.2 0 00-6.7-12.4 2 2 0 00-1.9-1 5.5 5.5 0 01-5.4-3.2 9.2 9.2 0 00-1.8-2.4 62.2 62.2 0 01-8.7-10.7c-1.5-2.2-2.5-4.7-4.6-6.6l-1.9-2.2a3 3 0 00-.8-.7l-7-3.5a53.4 53.4 0 00-6.8-3 58.4 58.4 0 00-7.4-1.5c-2.7-.4-5.4-.7-8-1.3-3-.7-6-1.7-9-2.7a16.2 16.2 0 00-5.8-1.3 3.8 3.8 0 01-3.9-2.7 40.1 40.1 0 00-1.7-5.1c-1.1-2.4-2.6-4.6-3.9-6.9a8 8 0 01-1.2-2.8 5.2 5.2 0 00-1-2.8 1.6 1.6 0 01-.3-1.6 9.5 9.5 0 000-2.4l-.7-.2c-.4-2.9 2-3.3 3.6-4.2l2.4 2.6.2-.2-.2-2.4a36.6 36.6 0 014.9.8l7.5 2.7A33 33 0 01362 237l5.2 4.8 5.2 5 2.3 2.1 3 2.8c.9.8 1.8 1.4 2.5 2.2 2 2 3.8 4.2 5.6 6.3a9.3 9.3 0 002 1.9c1.7 1 3.4 1.8 5.2 2.7a42 42 0 005.3 2.6c3 1 6.3 1.8 9.4 2.7l3.5 1c2.5.6 3.5 1.9 3.5 4.9a21.6 21.6 0 001.3 7.6 12.5 12.5 0 001.6 3.8 16 16 0 013 8 2.1 2.1 0 00.5 1.2q2.7 2.5 5.6 4.9l2.8 2 1.2-3a6.1 6.1 0 00.3-2.1 3.9 3.9 0 011.2-3.4 8.9 8.9 0 001.1-1.4c2.2-3 4.2-6 6.5-8.9a18.1 18.1 0 002.8-4.7l2.7-7.6a15 15 0 01.6-2l2.2-3.8 4-7.5c3.8-7.6 7.4-15.2 11.7-22.4 3-4.8 5.7-9.6 8.6-14.4 1-1.7 1.8-2 3.6-1.1a14 14 0 002.2 1 11 11 0 017.1 6.3 20.4 20.4 0 011.7 7.8l.2 5.7.6 5.9.2 4.6a41.8 41.8 0 01-.1 4.6 6.2 6.2 0 01-.9 3 7.5 7.5 0 00-1.1 2.7 26.5 26.5 0 01-1.5 4.2c-.3.5-1.1.8-1.7 1.2a2.2 2.2 0 00-.5.4 15.4 15.4 0 01-10.4 6.9 2.3 2.3 0 00-2.1 2.6c0 1.6.3 3.2.4 5l3.4-1.4 7.6-3.4c2.5-1.2 5-2.5 7.6-3.5 4.5-1.9 9-3.5 13.6-5.3a95 95 0 0122.1-6.3 9.7 9.7 0 002.9-.7 13 13 0 003.6-2.6 19.3 19.3 0 013.4-2.8 5.3 5.3 0 012.7-.9c.6 0 1 1 1.6 1.5a3.5 3.5 0 00.4.3l-.5.3c2.6 1.8 2.6 1.8 3 3.3zm-94.9 58.6a31.6 31.6 0 007.7-3l10.2-5a2.1 2.1 0 001.1-2.2 1.9 1.9 0 00-1.3-1c-2.7-.2-5.1-1.8-8-.9-.2.1-.6 0-1-.1-1.4-.1-2.8-.1-3.8 1.3l-1.5 2a8.6 8.6 0 01-5.7 3.9 1.6 1.6 0 00-.8.7 50 50 0 00-5.3 12.6l-.3 1.4.2.1a5.4 5.4 0 00.8-.8 30.1 30.1 0 015.6-5.8 9.4 9.4 0 011.7-1.3c1.2-.6 1.3-.9.4-2z" className={styles.e} />
                    <path fill="#7b9069" stroke="#0e3239" strokeMiterlimit="10" strokeWidth="4" d="M937 463.3h0c-14.7 0-27-5.6-28.7-20.2l-8.3-73.6h74L966 443c-1.7 14.7-14 20.3-28.8 20.3z" />
                    <path fill="#193639" stroke="#0e3239" strokeMiterlimit="10" strokeWidth="4" d="M975.3 362.1c-1.3-3.8-17.5-6.8-37.8-6.8s-37.2 3-38.6 6.8v8c0 4 17 7.3 38.3 7.3 19.8 0 36.1-2.9 38.1-6.6z" />
                    <path fill="#fff" stroke="#0e3239" strokeMiterlimit="10" strokeWidth="4" d="M972.8 353.3h-71.3v9.4h0s0 0 0 0c0 3.8 16 6.8 35.7 6.8s35.6-3 35.6-6.8c0 0 0 0 0 0h0z" />
                    <ellipse cx="35.6" cy="6.8" fill="#182a2f" stroke="#0e3239" strokeMiterlimit="10" strokeWidth="4" rx="35.6" ry="6.8" transform="translate(901.7 346.2)" />
                    <path fill="#fff" d="M959.8 352.8c0 1.1-4.1 2-4.1 2v-4s4 .9 4 2z" />

                    <g transform="translate(-8575 -1335)">
                        <circle cx="41" cy="41" r="41" fill="#5d0e2c" transform="translate(9405 1728)"/>
                        <g className="b" fill="none" stroke="#fff">
                            <path d="M9427 1752h39v38a7 7 0 01-7 7h-25a7 7 0 01-7-7v-38z" className="e" />
                            <path d="M9429 1753h35a1 1 0 011 1v36a6 6 0 01-6 6h-25a6 6 0 01-6-6v-36a1 1 0 011-1z" className="e" />
                        </g>
                        <g className="b" transform="translate(9422 1746)" fill="#5d0923" stroke="#fff">
                            <rect width="49" height="8" className="e" rx="4" />
                            <rect width="47" height="6" x="1" y="1" className="e" rx="3" />
                        </g>
                        <path d="M9438.9 1740.78h15.2v6.42h-15.2z" fill="none" stroke="#fff" />
                        <path stroke="#fff" d="M9447.04 1761.68v24.4M9439.34 1761.68v24.4M9454.75 1761.68v24.4" className="b" />
                        <circle cx="41" cy="41" r="41" fill="transparent" transform="translate(9405 1728)" onClick={clearCanvas} />
                    </g>
                </g>
            </svg>
        </div>
    );
};
