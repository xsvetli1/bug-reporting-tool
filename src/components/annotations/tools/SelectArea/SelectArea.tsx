import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export interface SelectAreaProps {
    TYPE: 'SELECT_AREA';
    x: number;
    y: number;
    width: number;
    height: number;
}

interface SelectAreaPropsWithHandlers extends SelectAreaProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const SelectArea = ({ x, y, width, height, moveHandlers }: SelectAreaPropsWithHandlers) => (
    <g {...moveHandlers}>
        <rect x={x} y={y} width={width} height={height} fillOpacity="0" className="annotation" />
    </g>
);
export default SelectArea;
