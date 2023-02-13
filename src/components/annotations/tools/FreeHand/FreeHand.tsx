import React from 'react';

export interface FreeHandProps {
    TYPE: 'FREE_HAND';
    path: [number, number][];
}

const FreeHand = ({ path }: FreeHandProps) => {
    return (
        <polyline
            className="annotation"
            fill="none"
            strokeWidth="8"
            points={path.map(([x, y]) => `${x},${y}`).join(' ')}
        />
    );
};

export default FreeHand;
