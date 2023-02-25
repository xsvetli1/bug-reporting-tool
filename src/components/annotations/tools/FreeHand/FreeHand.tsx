import React from 'react';
import { AnnotationProps } from '../AnnotationProps';

export interface FreeHandProps extends AnnotationProps<'FREE_HAND'> {
    path: [number, number][];
}

const FreeHand = ({ xShift, yShift, path, moveHandlers }: FreeHandProps) => {
    return (
        <polyline
            className="annotation"
            fill="none"
            strokeWidth="8"
            points={path.map(([x, y]) => `${x},${y}`).join(' ')}
            style={{ transform: `matrix(1, 0, 0, 1, ${xShift}, ${yShift})` }}
            {...moveHandlers}
        />
    );
};

export default FreeHand;
