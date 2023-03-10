import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';

export interface ObfuscationProps extends AnnotationProps<'OBFUSCATION'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

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
        <rect x={x} y={y} width={width} height={height} stroke="none" className="annotation" />
        {isHover && (
            <WrappedDeleteButton x={x + width - 8} y={y - 8} deleteCallback={deleteCallback} />
        )}
    </g>
);

export default Obfuscation;
