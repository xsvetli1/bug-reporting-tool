import React from 'react';
import { AnnotationProps } from '../AnnotationProps';

export interface ObfuscationProps extends AnnotationProps<'OBFUSCATION'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

const Obfuscation = ({ xShift, yShift, x, y, width, height, moveHandlers }: ObfuscationProps) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="none"
        className="annotation"
        style={{ transform: `matrix(1, 0, 0, 1, ${xShift}, ${yShift})` }}
        {...moveHandlers}
    />
);

export default Obfuscation;
