import { TextProps } from './Text';

export const calculateRelocatedText = (
    annotationProps: TextProps,
    diffX: number,
    diffY: number
): TextProps => {
    const { TYPE, id, index, x, y, open } = annotationProps;
    return {
        TYPE,
        id,
        index,
        x: x + diffX,
        y: y + diffY,
        open
    };
};
