import { useContext, useState } from 'react';
import { ToolContext } from '../../../../contexts/ToolContext';
import { getX, getY } from '../../helpers/CoordinatesHelper';
import { ReactMouseEvent } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationContext } from '../../../../contexts/AnnotationContext';

export const useAnnotationRelocation = (): [
    string,
    (id: string) => AnnotationMouseEventHandlers,
    AnnotationMouseEventHandlers
] => {
    const { annotations, setAnnotations } = useContext(ToolContext);
    const { selectedAreas, setSelectedAreas, setSelectedCommentIds, creating } =
        useContext(AnnotationContext);

    const [annotationInHandId, setAnnotationInHandId] = useState<string>('');
    const [previousCoordinates, setPreviousCoordinates] = useState<[number, number]>([-1, -1]);
    const [startingCoordinates, setStartingCoordinates] = useState<[number, number]>([-1, -1]);

    const obtainAnnotationGrabHandlers = (id: string): AnnotationMouseEventHandlers => ({
        onMouseDown: (event: ReactMouseEvent) => {
            event.stopPropagation();
            setAnnotationInHandId(id);
            setPreviousCoordinates([getX(event), getY(event)]);
            setStartingCoordinates([getX(event), getY(event)]);
        },
        onMouseUp: (event: ReactMouseEvent) => {
            const [currentX, currentY] = [getX(event), getY(event)];
            const [startX, startY] =
                startingCoordinates.toString() == [-1, -1].toString()
                    ? [currentX, currentY]
                    : startingCoordinates;
            const annotationMoved =
                Math.sqrt((startX - currentX) ** 2 + (startY - currentY) ** 2) > 5;

            if (annotations[id].type === 'TEXT' && !annotationMoved) {
                setSelectedCommentIds((selectedCommentIds) => {
                    if (selectedCommentIds.includes(id)) {
                        return selectedCommentIds.filter((found) => found != id);
                    }

                    return [...selectedCommentIds, id];
                });
            }
            setAnnotationInHandId('');
            setStartingCoordinates([-1, -1]);
        },
        onMouseEnter: () => {
            if (creating || annotationInHandId.length) {
                return;
            }
            annotations[id].isHover = true;
            setAnnotations({ ...annotations });
        },
        onMouseLeave: () => {
            if (creating || annotationInHandId.length) {
                return;
            }
            annotations[id].isHover = false;
            setAnnotations({ ...annotations });
        }
    });

    const annotationMoveHandlers: AnnotationMouseEventHandlers = {
        onMouseMove: (event: ReactMouseEvent) => {
            if (!annotationInHandId) {
                return;
            }

            const [startX, startY] = previousCoordinates;
            const [currentX, currentY] = [getX(event), getY(event)];
            setPreviousCoordinates([currentX, currentY]);

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
