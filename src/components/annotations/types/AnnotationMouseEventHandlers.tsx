/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactMouseEvent } from './ReactMouseEvent';
import { ReactTouchEvent } from './ReactTouchEvent';

/**
 * Type with all mouse and touch event listeners being optional.
 */
export type AnnotationMouseEventHandlers = {
    onMouseDown?: (event: ReactMouseEvent) => void;
    onMouseUp?: (event: ReactMouseEvent) => void;
    onMouseMove?: (event: ReactMouseEvent) => void;
    onMouseEnter?: (event: ReactMouseEvent) => void;
    onMouseLeave?: (event: ReactMouseEvent) => void;
    onTouchStart?: (event: ReactTouchEvent) => void;
    onTouchMove?: (event: ReactTouchEvent) => void;
};
