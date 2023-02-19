import { TextProps } from './Text';

export const calculateRelocatedText = (
    annotationProps: TextProps,
    diffX: number,
    diffY: number
): TextProps => {
    const { TYPE, index, x, y, open } = annotationProps;
    return {
        TYPE,
        index,
        x: x + diffX,
        y: y + diffY,
        open
    };
};
