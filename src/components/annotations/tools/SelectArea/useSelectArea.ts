import { useState } from 'react';
import { UseStateSetter } from '../../../../models/UseStateSetter';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { SelectedAreas } from '../../types/SelectedAreas';
import { AllAnnotationProps, AnnotationPropsObject } from '../AnnotationProps';
import { getX, getY } from '../CoordinatesHelper';

export interface SelectAreaHookProps {
    annotations: AnnotationPropsObject;
    annotate: (annotation: AllAnnotationProps, id: number) => void;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
}

export const useSelectArea = (props: SelectAreaHookProps) => {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            const [x, y] = [getX(event), getY(event)];
            setStartX(x);
            setStartY(y);

            selectArea(event, x, y);

            setSelecting(true);
        },

        onMouseUp: () => {
            setSelecting(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            selectArea(event);
        }
    };

    const selectArea = (event: ReactMouseEvent, currentStartX = startX, currentStartY = startY) => {
        let id = Object.keys(props.annotations).length;
        if (selecting) {
            id--;
        }

        const [x, y] = [getX(event), getY(event)];
        const width = Math.abs(x - currentStartX);
        const height = Math.abs(y - currentStartY);

        const lowerX = Math.min(x, currentStartX);
        const lowerY = Math.min(y, currentStartY);

        props.selectedAreas[id] = {
            TYPE: 'SELECT_AREA',
            xShift: 0,
            yShift: 0,
            x: lowerX,
            y: lowerY,
            width: width,
            height: height
        };

        props.setSelectedAreas({ ...props.selectedAreas }); // Needs to be shallow copy to make setState re-render
        props.annotate(props.selectedAreas[id], id);
    };

    return mouseEventHandlers;
};
