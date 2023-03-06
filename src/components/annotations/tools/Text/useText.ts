import { useContext, useState } from 'react';
import { TextProps } from '.';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { AnnotationContext } from '../../AnnotationTool/AnnotationContext';

export const useText = () => {
    const { annotations, annotate, selectedCommentIds } = useContext(AnnotationContext);

    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            if (selectedCommentIds.length) {
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

    const annotateText = (annotation: TextProps) => {
        let id = Object.keys(annotations).length;
        if (selecting) {
            id--;
        }

        annotate(annotation, id);
    };

    return mouseEventHandlers;
};
