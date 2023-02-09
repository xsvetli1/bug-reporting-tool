import React from 'react';

export interface ObfuscationProps {
    TYPE: 'OBFUSCATION';
    x: number;
    y: number;
    width: number;
    height: number;
}

const Obfuscation = ({ x, y, width, height }: ObfuscationProps) => (
    <rect x={x} y={y} width={width} height={height} stroke="none" />
);

export default Obfuscation;
