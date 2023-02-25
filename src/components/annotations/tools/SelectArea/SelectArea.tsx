import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps } from '../AnnotationProps';

export interface SelectAreaProps extends AnnotationProps<'SELECT_AREA'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface SelectAreaPropsWithHandlers extends SelectAreaProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const SelectArea = ({
    xShift,
    yShift,
    x,
    y,
    width,
    height,
    moveHandlers
}: SelectAreaPropsWithHandlers) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fillOpacity="0"
        className="annotation"
        style={{ transform: `matrix(1, 0, 0, 1, ${xShift}, ${yShift})` }}
        {...moveHandlers}
    />
);
export default SelectArea;
