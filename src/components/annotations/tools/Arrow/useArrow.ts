import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps } from '../AnnotationProps';

export interface ArrowHookProps {
    annotations: AnnotationProps[];
    annotate: (annotation: AnnotationProps) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useArrow = (props: ArrowHookProps) => {
    const mouseEventHandlers: AnnotationMouseEventHandlers = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseDown: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseUp: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseMove: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchStart: () => {},

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onTouchMove: () => {}
    };

    return mouseEventHandlers;
};
