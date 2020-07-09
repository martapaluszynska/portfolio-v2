import { useCallback, useEffect, useMemo, useState } from 'react';

interface Coordinate {
    x: number;
    y: number;
}

const getCoordinates = (event: MouseEvent, ref: any) => {
    if (!ref) {
        return;
    }
    const viewportOffsetTop = ref.getBoundingClientRect().top + window.scrollY;
    const viewportOffsetLeft = ref.getBoundingClientRect().left;
    return {
        x: event.pageX - viewportOffsetLeft,
        y: event.pageY - viewportOffsetTop,
    };
};

export const useMouseEvents = () => {
    const [element, setElement] = useState<any>(null);
    const [active, setActive] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
        undefined
    );

    // START
    const startAction = useCallback((event: any) => {
        const coordinates = getCoordinates(event, element);
        if (coordinates) {
            setActive(true);
            setMousePosition(coordinates);
        }
    }, []);

    useEffect(() => {
        if (!element) {
            return;
        }

        element.addEventListener('mouseenter', startAction);
        return () => {
            element.removeEventListener('mouseenter', startAction);
        };
    }, [element, startAction]);

    // MOVE
    const moveAction = useCallback(
        (event: any) => {
            // needts to be throttled
            if (active) {
                const newMousePosition = getCoordinates(event, element);
                if (mousePosition && newMousePosition) {
                    console.log(mousePosition);
                    // moveActionCallback(event);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [
            // moveActionCallback,
            mousePosition,
            active,
        ],
    );

    const moveActionInit = useMemo(() => {
        return (e: any) => {
            if (e.type === 'touchmove') {
                e.preventDefault();
            } else {
                requestAnimationFrame(() => moveAction(e));
            }
        };
    }, [mousePosition]);

    useEffect(() => {
        if (!element) {
            return;
        }
        element.addEventListener('pointermove', moveActionInit, {
            passive: true,
        });
        element.addEventListener('touchmove', moveActionInit);
        return () => {
            element.removeEventListener('pointermove', moveAction);
            element.removeEventListener('touchmove', moveAction);
        };
    }, [moveAction]);

    // END
    const endAction = useCallback((event: any) => {
        const coordinates = getCoordinates(event, element);
        if (coordinates) {
            setActive(false);
            setMousePosition(coordinates);
        }
    }, []);

    useEffect(() => {
        if (!element) {
            return;
        }
        element.addEventListener('mouseleave', endAction);
        return () => {
            element.removeEventListener('mouseleave', endAction);
        };
    }, [endAction]);

    return {
        active,
        mousePositionMove: mousePosition,
        setElement,
    };
};
