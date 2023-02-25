import { useContext, useState } from 'react';
import { getX, getY } from '../../tools/helpers/CoordinatesHelper';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationContext } from '../AnnotationContext';

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
            setStartingCoordinates([getX(event), getY(event)]);
            if (annotations[id].type === 'TEXT') {
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

            annotations[annotationInHandId].shift.x += diffX;
            annotations[annotationInHandId].shift.y += diffY;

            setAnnotations({ ...annotations });

            const annotation = annotations[annotationInHandId];
            if (annotation.type === 'SELECT_AREA') {
                selectedAreas[annotationInHandId] = annotation;
                setSelectedAreas({ ...selectedAreas });
            }
        },
        onMouseUp: () => setAnnotationInHandId('')
    };

    return [annotationInHandId, obtainAnnotationGrabHandlers, annotationMoveHandlers];
};
