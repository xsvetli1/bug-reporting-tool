import { useContext, useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { AnnotationContext } from '../../../../contexts/AnnotationContext';

/**
 * Hook for create mouse event handlers for FreeHand annotation type.
 */
export const useFreeHand = () => {
    const { currentAnnotationId, annotate, creating, setCreating } = useContext(AnnotationContext);

    const [path, setPath] = useState<[number, number][]>([]);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            annotateFreeHand(event);
            setCreating(true);
        },

        onMouseUp: () => {
            setCreating(false);
            setPath([]);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!creating) {
                return;
            }

            annotateFreeHand(event);
        }
    };

    const annotateFreeHand = (event: ReactMouseEvent) => {
        const [x, y] = [getX(event), getY(event)];
        const newPath: [number, number][] = [...path, [x, y]];
        setPath(newPath);

        annotate({ type: 'FREE_HAND', shift: { x: 0, y: 0 }, path: newPath }, currentAnnotationId);
    };

    return mouseEventHandlers;
};
