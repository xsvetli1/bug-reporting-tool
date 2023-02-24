import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export interface FreeHandProps {
    TYPE: 'FREE_HAND';
    xShift: number;
    yShift: number;
    path: [number, number][];
}

interface FreeHandPropsWithHandlers extends FreeHandProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const FreeHand = ({ xShift, yShift, path, moveHandlers }: FreeHandPropsWithHandlers) => {
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
