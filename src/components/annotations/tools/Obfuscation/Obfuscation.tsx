import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export interface ObfuscationProps {
    TYPE: 'OBFUSCATION';
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ObfuscationPropsWithHandlers extends ObfuscationProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const Obfuscation = ({ x, y, width, height, moveHandlers }: ObfuscationPropsWithHandlers) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="none"
        className="annotation"
        {...moveHandlers}
    />
);

export default Obfuscation;
