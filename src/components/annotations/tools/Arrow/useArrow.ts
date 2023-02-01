import { useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';

export interface ArrowHookProps {
    annotations: AnnotationProps[];
    annotate: (annotation: AnnotationProps) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useArrow = (props: ArrowHookProps) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseDown: (event: ReactMouseEvent) => {
            setStartX(getX(event));
            setStartY(getY(event));
            setSelecting(true);
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseUp: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            const [x, y] = [getX(event), getY(event)];
            props.annotate({ TYPE: 'ARROW', x1: startX, y1: startY, x2: x, y2: y });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseMove: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchStart: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchMove: () => {}
    };

    return mouseEventHandlers;
};
