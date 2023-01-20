import React from 'react';

export interface SelectAreaProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

const SelectArea = (props: SelectAreaProps) => {
    return <rect {...props} fillOpacity="0" />;
};

export default SelectArea;
