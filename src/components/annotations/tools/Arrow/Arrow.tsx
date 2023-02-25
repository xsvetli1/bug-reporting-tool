import React from 'react';
import { AnnotationProps } from '../AnnotationProps';

export interface ArrowProps extends AnnotationProps<'ARROW'> {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Arrow = ({ xShift, yShift, x1, y1, x2, y2, moveHandlers }: ArrowProps) => {
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={4}
            markerEnd="url(#arrowhead)"
            className="annotation arrow-line"
            style={{ transform: `matrix(1, 0, 0, 1, ${xShift}, ${yShift})` }}
            {...moveHandlers}
        />
    );
};

export default Arrow;
