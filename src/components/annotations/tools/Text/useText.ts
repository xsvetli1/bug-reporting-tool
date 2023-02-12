import { useState } from 'react';
import { TextProps } from '.';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps, AnnotationPropsObject } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';

export interface TextHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AnnotationProps, id: number) => void;
}

export const useText = (props: TextHookProps) => {
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            annotateText({ TYPE: 'TEXT', id: -1, x, y });

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
            annotateText({ TYPE: 'TEXT', id: -1, x, y });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchStart: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchMove: () => {}
    };

    const annotateText = (annotation: TextProps) => {
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        }

        props.annotate(annotation, id);
    };

    return mouseEventHandlers;
};
