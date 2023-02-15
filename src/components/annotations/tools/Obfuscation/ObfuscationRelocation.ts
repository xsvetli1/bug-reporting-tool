import { ObfuscationProps } from '.';

export const calculateRelocatedObfuscation = (
    annotationProps: ObfuscationProps,
    diffX: number,
    diffY: number
): ObfuscationProps => {
    const { TYPE, x, y, width, height } = annotationProps;
    return {
        TYPE,
        x: x + diffX,
        y: y + diffY,
        width,
        height
    };
};
