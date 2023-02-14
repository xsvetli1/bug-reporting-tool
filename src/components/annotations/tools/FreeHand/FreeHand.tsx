import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export interface FreeHandProps {
    TYPE: 'FREE_HAND';
    path: [number, number][];
}

interface FreeHandPropsWithHandlers extends FreeHandProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const FreeHand = ({ path, moveHandlers }: FreeHandPropsWithHandlers) => {
    return (
        <polyline
            className="annotation"
            fill="none"
            strokeWidth="8"
            points={path.map(([x, y]) => `${x},${y}`).join(' ')}
            {...moveHandlers}
        />
    );
};

export default FreeHand;
