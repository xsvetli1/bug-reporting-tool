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
    return typeof window !== 'undefined' ? window.innerWidth : 0;
};

export const getSVGHeigth = () => {
    return typeof window !== 'undefined' ? window.innerHeight : 0;
};
