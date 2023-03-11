import React from 'react';
import { AnnotationProps } from '../AnnotationProps';
import { getRelocationStyle } from '../../helpers/RelocationHelper';
import { WrappedDeleteButton } from '../DeleteButton';

export interface ArrowProps extends AnnotationProps<'ARROW'> {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const Arrow = ({ isHover, shift, x1, y1, x2, y2, moveHandlers, deleteCallback }: ArrowProps) => {
    return (
        <g className="annotation" style={getRelocationStyle({ shift })} {...moveHandlers}>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={4}
                markerEnd="url(#arrowhead)"
                className="arrow-line"
            />
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={20} strokeOpacity={0} />
            {isHover && (
                <WrappedDeleteButton x={x1 + 12} y={y1 - 12} deleteCallback={deleteCallback} />
            )}
        </g>
    );
};

export default Arrow;
