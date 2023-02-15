import { SelectAreaProps } from '.';

export const calculateRelocatedSelectArea = (
    annotationProps: SelectAreaProps,
    diffX: number,
    diffY: number
): SelectAreaProps => {
    const { TYPE, x, y, width, height } = annotationProps;
    return {
        TYPE,
        x: x + diffX,
        y: y + diffY,
        width,
        height
    };
};
