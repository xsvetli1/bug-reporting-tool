import { useState } from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AnnotationProps, AnnotationPropsObject } from '../tools/AnnotationProps';
import { calculateRelocatedArrow } from '../tools/Arrow';
import { getParentX, getParentY, getX, getY } from '../tools/CoordinatesHelper';
import { calculateRelocatedFreeHand } from '../tools/FreeHand';
import { calculateRelocatedObfuscation } from '../tools/Obfuscation';
import { calculateRelocatedSelectArea } from '../tools/SelectArea';
import { ReactMouseEvent, SelectedAreas } from '../types';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

const calculateRelocatedAnnotation = (
    annotationProps: AnnotationProps,
    diffX: number,
    diffY: number
): AnnotationProps => {
    const { TYPE } = annotationProps;
    if (TYPE === 'SELECT_AREA') {
        return calculateRelocatedSelectArea(annotationProps, diffX, diffY);
    } else if (TYPE === 'OBFUSCATION') {
        return calculateRelocatedObfuscation(annotationProps, diffX, diffY);
    } else if (TYPE === 'ARROW') {
        return calculateRelocatedArrow(annotationProps, diffX, diffY);
    } else if (TYPE === 'FREE_HAND') {
        return calculateRelocatedFreeHand(annotationProps, diffX, diffY);
    } else if (TYPE === 'TEXT') {
        return annotationProps;
    }
    return annotationProps;
};

export interface AnnotationRelocationHookProps {
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
}

export const useAnnotationRelocation = ({
    annotations,
    setAnnotations,
    selectedAreas,
    setSelectedAreas
}: AnnotationRelocationHookProps): [
    string | null,
    (id: string) => AnnotationMouseEventHandlers,
    AnnotationMouseEventHandlers
] => {
    const [annotationInHand, setAnnotationInHand] = useState<string | null>(null);
    const [startingCoordinates, setStartingCoordinates] = useState<[number, number]>([-1, -1]);

    const annotationGrabHandlers = (id: string): AnnotationMouseEventHandlers => ({
        onMouseDown: (event: ReactMouseEvent) => {
            event.stopPropagation();

            setAnnotationInHand(id);
            setStartingCoordinates([getParentX(event), getParentY(event)]);
        },
        onMouseUp: () => setAnnotationInHand(null)
    });

    const annotationMoveHandlers: AnnotationMouseEventHandlers = {
        onMouseMove: (event: ReactMouseEvent) => {
            if (!annotationInHand) {
                return;
            }

            const [startX, startY] = startingCoordinates;
            const [currentX, currentY] = [getX(event), getY(event)];
            setStartingCoordinates([currentX, currentY]);

            const diffX = currentX - startX;
            const diffY = currentY - startY;

            annotations[annotationInHand] = calculateRelocatedAnnotation(
                annotations[annotationInHand],
                diffX,
                diffY
            );

            setAnnotations({ ...annotations });

            const annotation = annotations[annotationInHand];
            if (annotation.TYPE === 'SELECT_AREA') {
                selectedAreas[annotationInHand] = annotation;
                setSelectedAreas({ ...selectedAreas });
            }
        },
        onMouseUp: () => setAnnotationInHand(null)
    };

    return [annotationInHand, annotationGrabHandlers, annotationMoveHandlers];
};
