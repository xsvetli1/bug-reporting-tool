import { useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AllAnnotationProps, AnnotationPropsObject } from '../AllAnnotationProps';
import { getX, getY } from '../helpers/CoordinatesHelper';
import { ArrowProps } from './Arrow';

export interface ArrowHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AllAnnotationProps, id: number) => void;
}

export const useArrow = (props: ArrowHookProps) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            setStartX(x);
            setStartY(y);

            annotateArrow({ type: 'ARROW', shift: { x: 0, y: 0 }, x1: x, y1: y, x2: x, y2: y });

            setSelecting(true);
        },

        onMouseUp: () => {
            setSelecting(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            const [x, y] = [getX(event), getY(event)];
            annotateArrow({
                type: 'ARROW',
                shift: { x: 0, y: 0 },
                x1: startX,
                y1: startY,
                x2: x,
                y2: y
            });
        }
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
