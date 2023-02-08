import React from 'react';

export interface FreeHandProps {
    TYPE: 'FREE_HAND';
    path: [number, number][];
}

const FreeHand = ({ path }: FreeHandProps) => {
    return <polyline fill="none" points={path.map(([x, y]) => `${x},${y}`).join(' ')} />;
};

export default FreeHand;
