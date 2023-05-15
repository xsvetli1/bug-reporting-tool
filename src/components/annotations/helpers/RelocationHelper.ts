import { RelocationProps } from '../tools/RelocationProps';

/**
 * @returns relocation matrix.
 */
export const getRelocationStyle = ({ shift }: RelocationProps) => ({
    transform: `matrix(1, 0, 0, 1, ${shift.x}, ${shift.y})`
});
