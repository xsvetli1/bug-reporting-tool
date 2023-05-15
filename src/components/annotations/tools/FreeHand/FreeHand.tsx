import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';
import { hoverEffect } from '../../helpers/AnnotationHoverHelper';

export interface FreeHandProps extends AnnotationProps<'FREE_HAND'> {
    path: [number, number][];
}

/**
 * Component returning the FreeHand annotation type.
 */
const FreeHand = ({ isHover, shift, path, moveHandlers, deleteCallback }: FreeHandProps) => {
    const points = path.map(([x, y]) => `${x},${y}`).join(' ');
    return (
        <g className={hoverEffect(isHover)} style={getRelocationStyle({ shift })} {...moveHandlers}>
            <polyline fill="none" strokeWidth="8" points={points} />
            <polyline fill="none" strokeWidth="20" strokeOpacity={0} points={points} />
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
