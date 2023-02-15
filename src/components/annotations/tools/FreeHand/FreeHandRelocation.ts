import { FreeHandProps } from '.';

export const calculateRelocatedFreeHand = (
    annotationProps: FreeHandProps,
    diffX: number,
    diffY: number
): FreeHandProps => {
    const { TYPE, path } = annotationProps;
    return {
        TYPE,
        path: path.map(([x, y]) => [x + diffX, y + diffY])
    };
};
