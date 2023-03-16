import { useContext } from 'react';
import { TextProps } from '.';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { AnnotationContext } from '../../../../contexts/AnnotationContext';

export const useText = () => {
    const { currentAnnotationId, annotate, creating, setCreating } = useContext(AnnotationContext);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            annotateText({
                type: 'TEXT',
                shift: { x: 0, y: 0 },
                id: '',
                index: -1,
                x,
                y,
                open: true
            });

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
            annotateText({
                type: 'TEXT',
                shift: { x: 0, y: 0 },
                id: '',
                index: -1,
                x,
                y,
                open: true
            });
        }
    };

    const annotateText = (annotation: TextProps) => annotate(annotation, currentAnnotationId);

    return mouseEventHandlers;
};
