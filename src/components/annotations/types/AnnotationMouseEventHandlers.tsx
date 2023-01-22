import { ReactMouseEvent } from './ReactMouseEvent';
import { ReactTouchEvent } from './ReactTouchEvent';

export type AnnotationMouseEventHandlers = {
    onMouseDown: (event: ReactMouseEvent) => void;
    onMouseUp: (event: ReactMouseEvent) => void;
    onMouseMove: (event: ReactMouseEvent) => void;
    onTouchStart: (event: ReactTouchEvent) => void;
    onTouchMove: (event: ReactTouchEvent) => void;
};
