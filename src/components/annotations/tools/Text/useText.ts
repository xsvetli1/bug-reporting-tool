import { useState } from 'react';
import { TextProps } from '.';
import { UseStateSetter } from '../../../../models/UseStateSetter';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AllAnnotationProps, AnnotationPropsObject } from '../AllAnnotationProps';
import { getX, getY } from '../../helpers/CoordinatesHelper';

export interface TextHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AllAnnotationProps, id: number) => void;
    selectedCommentIds: string[];
    setSelectedCommentIds: UseStateSetter<string[]>;
}

export const useText = (props: TextHookProps) => {
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            if (props.selectedCommentIds.length) {
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
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        } else {
            props.setSelectedCommentIds([...props.selectedCommentIds, id.toString()]);
        }

        props.annotate(annotation, id);
    };

    return mouseEventHandlers;
};
