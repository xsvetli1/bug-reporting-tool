import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { RelocationProps } from './RelocationProps';

/**
 * General interface for annotation properties extending RelocationProps
 * and defining other common properties of all annotation types.
 */
export interface AnnotationProps<TYPE> extends RelocationProps {
    type: TYPE;
    isHover?: boolean;
    moveHandlers?: AnnotationMouseEventHandlers;
    deleteCallback?: () => void;
}
