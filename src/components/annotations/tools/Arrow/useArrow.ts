import { useContext, useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { ArrowProps } from './Arrow';
import { AnnotationContext } from '../../../../contexts/AnnotationContext';

/**
 * Hook for create mouse event handlers for Arrow annotation type.
 */
export const useArrow = () => {
    const { currentAnnotationId, annotate, creating, setCreating } = useContext(AnnotationContext);

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            setStartX(x);
            setStartY(y);

            annotateArrow({ type: 'ARROW', shift: { x: 0, y: 0 }, x1: x, y1: y, x2: x, y2: y });

            setCreating(true);
        },

        onMouseUp: () => {
            setCreating(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!creating) {
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

    const annotateArrow = (annotation: ArrowProps) => annotate(annotation, currentAnnotationId);

    return mouseEventHandlers;
};
