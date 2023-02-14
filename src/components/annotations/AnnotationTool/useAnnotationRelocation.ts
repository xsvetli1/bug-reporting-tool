import { useState } from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AnnotationPropsObject } from '../tools/AnnotationProps';
import { getParentX, getParentY, getX, getY } from '../tools/CoordinatesHelper';
import { ReactMouseEvent, SelectedAreas } from '../types';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

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

            const annotationProps = annotations[annotationInHand];
            const annotationType = annotationProps.TYPE;
            const [startX, startY] = startingCoordinates;
            const [currentX, currentY] = [getX(event), getY(event)];
            setStartingCoordinates([currentX, currentY]);

            const diffX = currentX - startX;
            const diffY = currentY - startY;

            switch (annotationType) {
                case 'SELECT_AREA': {
                    const { x, y, width, height } = annotationProps;
                    annotations[annotationInHand] = {
                        TYPE: annotationType,
                        x: x + diffX,
                        y: y + diffY,
                        width,
                        height
                    };
                    selectedAreas[annotationInHand] = {
                        TYPE: annotationType,
                        x: x + diffX,
                        y: y + diffY,
                        width,
                        height
                    };
                    setSelectedAreas({ ...selectedAreas });
                    break;
                }
                case 'OBFUSCATION': {
                    const { x, y, width, height } = annotationProps;
                    annotations[annotationInHand] = {
                        TYPE: annotationType,
                        x: x + diffX,
                        y: y + diffY,
                        width,
                        height
                    };
                    break;
                }
                case 'ARROW': {
                    const { x1, y1, x2, y2 } = annotationProps;
                    annotations[annotationInHand] = {
                        TYPE: annotationType,
                        x1: x1 + diffX,
                        y1: y1 + diffY,
                        x2: x2 + diffX,
                        y2: y2 + diffY
                    };
                    break;
                }
                case 'FREE_HAND': {
                    const { path } = annotationProps;
                    annotations[annotationInHand] = {
                        TYPE: annotationType,
                        path: path.map(([x, y]) => [x + diffX, y + diffY])
                    };
                    break;
                }
                case 'TEXT':
                    return;
            }
            setAnnotations({ ...annotations });
        },
        onMouseUp: () => setAnnotationInHand(null)
    };

    return [annotationInHand, annotationGrabHandlers, annotationMoveHandlers];
};
