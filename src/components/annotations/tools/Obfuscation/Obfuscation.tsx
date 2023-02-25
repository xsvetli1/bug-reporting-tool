import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';

export interface ObfuscationProps extends AnnotationProps<'OBFUSCATION'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

const Obfuscation = ({ shift, x, y, width, height, moveHandlers }: ObfuscationProps) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="none"
        className="annotation"
        style={getRelocationStyle({ shift })}
        {...moveHandlers}
    />
);

export default Obfuscation;
