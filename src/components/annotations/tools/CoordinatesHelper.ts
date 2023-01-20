import { ReactMouseEvent } from "../AnnotationTool/AnnotationTool";

export const getX = (event: ReactMouseEvent) => {
    const element = event.currentTarget.getBoundingClientRect();
    return event.clientX - element.left - 3; // 3 is border-width
};

export const getY = (event: ReactMouseEvent) => {
    const element = event.currentTarget.getBoundingClientRect();
    return event.clientY - element.top - 3; // 3 is border-width
}
