import { useState } from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AnnotationProps, AnnotationPropsObject } from '../tools/AnnotationProps';
import { calculateRelocatedArrow } from '../tools/Arrow';
import { getParentX, getParentY, getX, getY } from '../tools/CoordinatesHelper';
import { calculateRelocatedFreeHand } from '../tools/FreeHand';
import { calculateRelocatedObfuscation } from '../tools/Obfuscation';
import { calculateRelocatedSelectArea } from '../tools/SelectArea';
import { calculateRelocatedText } from '../tools/Text';
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
        return calculateRelocatedText(annotationProps, diffX, diffY);
    }
    return annotationProps;
};

export interface AnnotationRelocationHookProps {
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
    setSelectedCommentIds: UseStateSetter<string[]>;
}

export const useAnnotationRelocation = ({
    annotations,
    setAnnotations,
    selectedAreas,
    setSelectedAreas,
    setSelectedCommentIds
}: AnnotationRelocationHookProps): [
    string,
    (id: string) => AnnotationMouseEventHandlers,
    AnnotationMouseEventHandlers
] => {
    const [annotationInHandId, setAnnotationInHandId] = useState<string>('');
    const [startingCoordinates, setStartingCoordinates] = useState<[number, number]>([-1, -1]);

    const obtainAnnotationGrabHandlers = (id: string): AnnotationMouseEventHandlers => ({
        onMouseDown: (event: ReactMouseEvent) => {
            event.stopPropagation();

            setAnnotationInHandId(id);
            setStartingCoordinates([getParentX(event), getParentY(event)]);
            if (annotations[id].TYPE === 'TEXT') {
                setSelectedCommentIds((selectedCommentIds) => [...selectedCommentIds, id]);
            }
        },
        onMouseUp: () => setAnnotationInHandId('')
    });

    const annotationMoveHandlers: AnnotationMouseEventHandlers = {
        onMouseMove: (event: ReactMouseEvent) => {
            if (!annotationInHandId) {
                return;
            }

            const [startX, startY] = startingCoordinates;
            const [currentX, currentY] = [getX(event), getY(event)];
            setStartingCoordinates([currentX, currentY]);

            const diffX = currentX - startX;
            const diffY = currentY - startY;

            annotations[annotationInHandId] = calculateRelocatedAnnotation(
                annotations[annotationInHandId],
                diffX,
                diffY
            );

            setAnnotations({ ...annotations });

            const annotation = annotations[annotationInHandId];
            if (annotation.TYPE === 'SELECT_AREA') {
                selectedAreas[annotationInHandId] = annotation;
                setSelectedAreas({ ...selectedAreas });
            }
        },
        onMouseUp: () => setAnnotationInHandId('')
    };

    return [annotationInHandId, obtainAnnotationGrabHandlers, annotationMoveHandlers];
};
