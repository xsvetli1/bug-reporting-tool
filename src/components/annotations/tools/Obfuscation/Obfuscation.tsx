import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { AnnotationProps } from '../AnnotationProps';

export interface ObfuscationProps extends AnnotationProps<'OBFUSCATION'> {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ObfuscationPropsWithHandlers extends ObfuscationProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const Obfuscation = ({
    xShift,
    yShift,
    x,
    y,
    width,
    height,
    moveHandlers
}: ObfuscationPropsWithHandlers) => (
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
