import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';

export interface SelectAreaProps extends AnnotationProps<'SELECT_AREA'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

const SelectArea = ({
    isHover,
    shift,
    x,
    y,
    width,
    height,
    moveHandlers,
    deleteCallback
}: SelectAreaProps) => (
    <g {...moveHandlers} style={getRelocationStyle({ shift })}>
        <rect x={x} y={y} width={width} height={height} fillOpacity="0" className="annotation" />
        {isHover && (
            <WrappedDeleteButton x={x + width - 8} y={y - 8} deleteCallback={deleteCallback} />
        )}
    </g>
);
export default SelectArea;
