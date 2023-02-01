import React from 'react';

export interface SelectAreaProps {
    TYPE: 'SELECT_AREA';
    x: number;
    y: number;
    width: number;
    height: number;
}

const SelectArea = ({ x, y, width, height }: SelectAreaProps) => (
    <rect x={x} y={y} width={width} height={height} fillOpacity="0" />
);

export default SelectArea;
