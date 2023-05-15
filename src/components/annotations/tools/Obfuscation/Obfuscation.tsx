import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';
import { hoverEffect } from '../../helpers/AnnotationHoverHelper';

export interface ObfuscationProps extends AnnotationProps<'OBFUSCATION'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Component returning the Obfuscation annotation type.
 */
const Obfuscation = ({
    isHover,
    shift,
    x,
    y,
    width,
    height,
    moveHandlers,
    deleteCallback
}: ObfuscationProps) => (
    <g {...moveHandlers} style={getRelocationStyle({ shift })}>
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="none"
            className={hoverEffect(isHover)}
        />
        {isHover && (
            <WrappedDeleteButton x={x + width - 8} y={y - 8} deleteCallback={deleteCallback} />
        )}
    </g>
);

export default Obfuscation;
