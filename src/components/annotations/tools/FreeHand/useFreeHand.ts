import { useContext, useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { AnnotationContext } from '../../AnnotationTool/AnnotationContext';

export const useFreeHand = () => {
    const { annotationNextId, annotate } = useContext(AnnotationContext);

    const [path, setPath] = useState<[number, number][]>([]);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            annotateFreeHand(event);
            setSelecting(true);
        },

        onMouseUp: () => {
            setSelecting(false);
            setPath([]);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            annotateFreeHand(event);
        }
    };

    const annotateFreeHand = (event: ReactMouseEvent) => {
        let id = annotationNextId;
        if (selecting) {
            id--;
        }

        const [x, y] = [getX(event), getY(event)];
        const newPath: [number, number][] = [...path, [x, y]];
        setPath(newPath);

        annotate({ type: 'FREE_HAND', shift: { x: 0, y: 0 }, path: newPath }, id);
    };

    return mouseEventHandlers;
};
