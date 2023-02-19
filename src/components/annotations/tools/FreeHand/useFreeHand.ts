import { useState } from 'react';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps, AnnotationPropsObject } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';

export interface FreeHandHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AnnotationProps, id: number) => void;
}

export const useFreeHand = (props: FreeHandHookProps) => {
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
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        }

        const [x, y] = [getX(event), getY(event)];
        const newPath: [number, number][] = [...path, [x, y]];
        setPath(newPath);

        props.annotate({ TYPE: 'FREE_HAND', path: newPath }, id);
    };

    return mouseEventHandlers;
};
