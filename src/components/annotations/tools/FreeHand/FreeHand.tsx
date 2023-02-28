import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';

export interface FreeHandProps extends AnnotationProps<'FREE_HAND'> {
    path: [number, number][];
}

const FreeHand = ({ shift, path, moveHandlers }: FreeHandProps) => {
    return (
        <polyline
            fill="none"
            strokeWidth="8"
            points={path.map(([x, y]) => `${x},${y}`).join(' ')}
            className="annotation"
            style={getRelocationStyle({ shift })}
            {...moveHandlers}
        />
    );
};

export default FreeHand;
