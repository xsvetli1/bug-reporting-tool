import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';
import { rectToPathData } from '../../helpers/RectangleHelper';
import { hoverAnnotationClass, useHoverEffect } from '../../helpers/AnnotationHoverHelper';

export interface SelectAreaProps extends AnnotationProps<'SELECT_AREA'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Component returning the SelectArea annotation type.
 */
const SelectArea = (props: SelectAreaProps) => {
    const { isHover, shift, x, y, width, moveHandlers, deleteCallback } = props;
    useHoverEffect(isHover);

    return (
        <g {...moveHandlers} style={getRelocationStyle({ shift })}>
            <path
                className={hoverAnnotationClass(isHover)}
                d={rectToPathData(props, false)}
                fill="none"
            />
            <path d={rectToPathData(props, false)} fill="none" strokeOpacity="0" strokeWidth={20} />
            {isHover && (
                <WrappedDeleteButton x={x + width - 8} y={y - 8} deleteCallback={deleteCallback} />
            )}
        </g>
    );
};
export default SelectArea;
