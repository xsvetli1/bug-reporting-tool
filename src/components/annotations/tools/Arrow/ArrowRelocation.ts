import { ArrowProps } from '.';

export const calculateRelocatedArrow = (
    annotationProps: ArrowProps,
    diffX: number,
    diffY: number
): ArrowProps => {
    const { TYPE, x1, y1, x2, y2 } = annotationProps;
    return {
        TYPE,
        x1: x1 + diffX,
        y1: y1 + diffY,
        x2: x2 + diffX,
        y2: y2 + diffY
    };
};
