import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { RelocationProps } from './RelocationProps';

export interface AnnotationProps<TYPE> extends RelocationProps {
    type: TYPE;
    moveHandlers?: AnnotationMouseEventHandlers;
}
