import { BORDER_WIDTH } from '../styles/Constants';
import { ReactMouseEvent } from '../types/ReactMouseEvent';

/**
 * File defining helper functions for mouse cursor coordinates.
 */

export const getX = (event: ReactMouseEvent) => {
    return event.clientX;
};

export const getY = (event: ReactMouseEvent) => {
    return event.clientY - BORDER_WIDTH;
};

export const getSVGWidth = () => {
    return window.innerWidth;
};

export const getSVGHeigth = () => {
    return window.innerHeight;
};
