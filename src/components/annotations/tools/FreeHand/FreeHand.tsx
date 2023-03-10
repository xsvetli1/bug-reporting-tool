import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';

export interface FreeHandProps extends AnnotationProps<'FREE_HAND'> {
    path: [number, number][];
}

const FreeHand = ({ isHover, shift, path, moveHandlers, deleteCallback }: FreeHandProps) => {
    return (
        <g style={getRelocationStyle({ shift })} {...moveHandlers}>
            <polyline
                fill="none"
                strokeWidth="8"
                points={path.map(([x, y]) => `${x},${y}`).join(' ')}
                className="annotation"
            />
            {isHover && (
                <WrappedDeleteButton
                    x={path[path.length - 1][0] + 12}
                    y={path[path.length - 1][1] - 12}
                    deleteCallback={deleteCallback}
                />
            )}
        </g>
    );
};

export default FreeHand;
