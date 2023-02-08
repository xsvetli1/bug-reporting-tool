import { useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps, AnnotationPropsObject } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';
import { ArrowProps } from './Arrow';

export interface ArrowHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AnnotationProps, id: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useArrow = (props: ArrowHookProps) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseDown: (event: ReactMouseEvent) => {
            const x = getX(event);
            const y = getY(event);
            setStartX(x);
            setStartY(y);

            annotateArrow({ TYPE: 'ARROW', x1: x, y1: y, x2: x, y2: y });

            setSelecting(true);
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseUp: () => {
            setSelecting(false);
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            const [x, y] = [getX(event), getY(event)];
            annotateArrow({ TYPE: 'ARROW', x1: startX, y1: startY, x2: x, y2: y });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchStart: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchMove: () => {}
    };

    const annotateArrow = (annotation: ArrowProps) => {
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        }

        props.annotate(annotation, id);
    };

    return mouseEventHandlers;
};
