import { useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps, AnnotationPropsObject } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';

export interface ObfuscationHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AnnotationProps, id: number) => void;
}

export const useObfuscation = (props: ObfuscationHookProps) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            setStartX(x);
            setStartY(y);

            annotateObfuscation(event, x, y);

            setSelecting(true);
        },

        onMouseUp: () => {
            setSelecting(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            annotateObfuscation(event);
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchStart: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchMove: () => {}
    };

    const annotateObfuscation = (
        event: ReactMouseEvent,
        currentStartX = startX,
        currentStartY = startY
    ) => {
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        }

        const [x, y] = [getX(event), getY(event)];
        const width = Math.abs(x - currentStartX);
        const height = Math.abs(y - currentStartY);

        const lowerX = Math.min(x, currentStartX);
        const lowerY = Math.min(y, currentStartY);

        props.annotate(
            { TYPE: 'OBFUSCATION', x: lowerX, y: lowerY, width: width, height: height },
            id
        );
    };

    return mouseEventHandlers;
};