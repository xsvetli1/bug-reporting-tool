import React from 'react';

export interface ArrowProps {
    TYPE: 'ARROW';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Arrow = ({ x1, y1, x2, y2 }: ArrowProps) => {
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={4}
            markerEnd="url(#arrowhead)"
            className="annotation arrow-line"
        />
    );
};

export default Arrow;
