import React from 'react';

export interface ArrowProps {
    TYPE: 'ARROW';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Arrow = ({ x1, y1, x2, y2 }: ArrowProps) => {
    const arrowHead = 7 * 4;
    const vectorX = x2 - x1;
    const vectorY = y2 - y1;
    console.log('vectorX', vectorX);
    console.log('vectorY', vectorY);

    const signX = vectorX ? vectorX / Math.abs(vectorX) : 1;
    const signY = vectorY ? vectorY / Math.abs(vectorY) : 1;
    console.log('signX', signX);
    console.log('signY', signY);
    const diffY = vectorY ? Math.sqrt(arrowHead ** 2 / (vectorX ** 2 / vectorY ** 2 + 1)) : 0;
    const diffX = vectorY ? (diffY * Math.abs(vectorX)) / Math.abs(vectorY) : arrowHead;
    console.log('diffX', diffX);
    console.log('diffY', diffY);

    x2 = x1 + vectorX - signX * diffX;
    y2 = y1 + vectorY - signY * diffY;
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000"
            strokeWidth={4}
            markerEnd="url(#arrowhead)"
        />
    );
};

export default Arrow;
