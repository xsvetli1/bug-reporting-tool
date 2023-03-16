import { useContext, useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { AnnotationContext } from '../../../../contexts/AnnotationContext';

export const useObfuscation = () => {
    const { currentAnnotationId, annotate, creating, setCreating } = useContext(AnnotationContext);

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            setStartX(x);
            setStartY(y);

            annotateObfuscation(event, x, y);

            setCreating(true);
        },

        onMouseUp: () => {
            setCreating(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!creating) {
                return;
            }

            annotateObfuscation(event);
        }
    };

    const annotateObfuscation = (
        event: ReactMouseEvent,
        currentStartX = startX,
        currentStartY = startY
    ) => {
        const [x, y] = [getX(event), getY(event)];
        const width = Math.abs(x - currentStartX);
        const height = Math.abs(y - currentStartY);

        const lowerX = Math.min(x, currentStartX);
        const lowerY = Math.min(y, currentStartY);

        annotate(
            {
                type: 'OBFUSCATION',
                shift: { x: 0, y: 0 },
                x: lowerX,
                y: lowerY,
                width: width,
                height: height
            },
            currentAnnotationId
        );
    };

    return mouseEventHandlers;
};
