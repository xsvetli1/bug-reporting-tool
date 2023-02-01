import React from 'react';

export interface ArrowProps {
    TYPE: 'ARROW';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Arrow = ({ x1, y1, x2, y2 }: ArrowProps) => {
    // TODO: Fix short arrow aiming opposite direction
    const strokeWidth = 4;
    const arrowHead = 7 * strokeWidth;
    const vectorX = x2 - x1;
    const vectorY = y2 - y1;

    const signX = vectorX ? vectorX / Math.abs(vectorX) : 1;
    const signY = vectorY ? vectorY / Math.abs(vectorY) : 1;

    const diffY = vectorY ? Math.sqrt(arrowHead ** 2 / (vectorX ** 2 / vectorY ** 2 + 1)) : 0;
    const diffX = vectorY ? (diffY * Math.abs(vectorX)) / Math.abs(vectorY) : arrowHead;

    x2 = x1 + vectorX - signX * diffX;
    y2 = y1 + vectorY - signY * diffY;
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000"
            strokeWidth={strokeWidth}
            markerEnd="url(#arrowhead)"
        />
    );
};

export default Arrow;
