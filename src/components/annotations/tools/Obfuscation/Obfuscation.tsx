import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export interface ObfuscationProps {
    TYPE: 'OBFUSCATION';
    xShift: number;
    yShift: number;
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
