import { useContext, useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { AnnotationContext } from '../../AnnotationTool/AnnotationContext';

export const useObfuscation = () => {
    const { annotationNextId, annotate } = useContext(AnnotationContext);

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
        }
    };

    const annotateObfuscation = (
        event: ReactMouseEvent,
        currentStartX = startX,
        currentStartY = startY
    ) => {
        let id = annotationNextId;
        if (selecting) {
            id--;
        }

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
            id
        );
    };

    return mouseEventHandlers;
};
