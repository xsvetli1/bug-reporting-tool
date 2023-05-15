import { SelectAreaProps } from '../tools/SelectArea';

export const rectToPathData = (
    { shift, x, y, width, height }: SelectAreaProps,
    shouldShift = true
) =>
    shouldShift
        ? `M ${x + shift.x} ${y + shift.y} h ${width} v ${height} h ${-width} Z`
        : `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;
