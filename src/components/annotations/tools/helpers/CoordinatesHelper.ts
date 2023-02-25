import { BORDER_WIDTH } from '../../styles/Constants';
import { ReactMouseEvent } from '../../types/ReactMouseEvent';

export const getX = (event: ReactMouseEvent) => {
    return event.clientX - BORDER_WIDTH;
};

export const getY = (event: ReactMouseEvent) => {
    return event.clientY - 2 * BORDER_WIDTH;
};

export const getSVGWidth = () => {
    return window.innerWidth - 2 * BORDER_WIDTH;
};

export const getSVGHeigth = () => {
    return window.innerHeight - 2 * BORDER_WIDTH;
};
