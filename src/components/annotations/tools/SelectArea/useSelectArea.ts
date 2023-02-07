import { useState } from 'react';
import { UseStateSetter } from '../../../../models/UseStateSetter';
import { ReactMouseEvent, ReactTouchEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { SelectedAreas } from '../../types/SelectedAreas';
import { AnnotationProps, AnnotationPropsObject } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';

export interface SelectAreaHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AnnotationProps, id: number) => void;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
}

export const useSelectArea = (props: SelectAreaHookProps) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            setStartX(getX(event));
            setStartY(getY(event));

            selectArea({
                width: 0,
                height: 0
            });

            setSelecting(true);
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onMouseUp: (_: ReactMouseEvent) => {
            setSelecting(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            const [x, y] = [getX(event), getY(event)];

            selectArea({
                width: x - startX,
                height: y - startY
            });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        onTouchStart: (_: ReactTouchEvent) => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        onTouchMove: (_: ReactTouchEvent) => {}
    };

    const selectArea = ({ width, height }: { width: number; height: number }) => {
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        }

        props.selectedAreas[id] = {
            TYPE: 'SELECT_AREA',
            x: startX,
            y: startY,
            width: width,
            height: height
        };
        props.setSelectedAreas({ ...props.selectedAreas }); // Needs to be shallow copy to make setState re-render

        props.annotate(props.selectedAreas[id], id);
    };

    return mouseEventHandlers;
};
