import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';

export interface SelectAreaProps extends AnnotationProps<'SELECT_AREA'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

const SelectArea = ({ shift, x, y, width, height, moveHandlers }: SelectAreaProps) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fillOpacity="0"
        className="annotation"
        style={getRelocationStyle({ shift })}
        {...moveHandlers}
    />
);
export default SelectArea;
