import { ReactMouseEvent } from '../types/ReactMouseEvent';

export const getX = (event: ReactMouseEvent) => {
    const element = event.currentTarget.getBoundingClientRect();
    return event.clientX - element.left - 3; // 3 is border-width
};

export const getY = (event: ReactMouseEvent) => {
    const element = event.currentTarget.getBoundingClientRect();
    return event.clientY - element.top - 3; // 3 is border-width
};

export const getParentX = (event: ReactMouseEvent) => {
    const element = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!element) {
        throw new Error('Parent element undefined!');
    }
    return event.clientX - element.left - 3; // 3 is border-width
};

export const getParentY = (event: ReactMouseEvent) => {
    const element = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!element) {
        throw new Error('Parent element undefined!');
    }
    return event.clientY - element.top - 3; // 3 is border-width
};
