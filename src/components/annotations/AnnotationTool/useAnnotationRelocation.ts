import { useContext, useState } from 'react';
import { AnnotationProps } from '../tools/AnnotationProps';
import { calculateRelocatedArrow } from '../tools/Arrow';
import { getParentX, getParentY, getX, getY } from '../tools/CoordinatesHelper';
import { calculateRelocatedFreeHand } from '../tools/FreeHand';
import { calculateRelocatedObfuscation } from '../tools/Obfuscation';
import { calculateRelocatedSelectArea } from '../tools/SelectArea';
import { calculateRelocatedText } from '../tools/Text';
import { ReactMouseEvent } from '../types';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { AnnotationContext } from './AnnotationContext';

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

export const useAnnotationRelocation = (): [
    string,
    (id: string) => AnnotationMouseEventHandlers,
    AnnotationMouseEventHandlers
] => {
    const { annotations, setAnnotations, selectedAreas, setSelectedAreas, setSelectedCommentIds } =
        useContext(AnnotationContext);

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
