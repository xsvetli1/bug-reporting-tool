import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

export interface AnnotationProps<TYPE> {
    type: TYPE;
    xShift: number;
    yShift: number;
    moveHandlers?: AnnotationMouseEventHandlers;
}
